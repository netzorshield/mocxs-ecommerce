const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Razorpay = require('razorpay');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay (only if keys are provided)
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  } catch (error) {
    console.warn('Razorpay initialization failed:', error.message);
    console.warn('Payment gateway will not be available. Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file');
  }
} else {
  console.warn('Razorpay keys not configured. Payment gateway will not be available.');
  console.warn('To enable payments, add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to backend/.env file');
}

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, discountCode } = req.body;

    // Validate stock availability and calculate totals
    let subtotal = 0;
    const productUpdates = []; // Store products that need stock updates
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      
      // Validate stock availability
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        });
      }
      
      // Check if product is out of stock
      if (product.stock === 0) {
        return res.status(400).json({ 
          message: `${product.name} is currently out of stock` 
        });
      }
      
      subtotal += product.price * item.quantity;
      productUpdates.push({ product, quantity: item.quantity });
    }

    const shipping = subtotal > 999 ? 0 : 50; // Free shipping above ₹999
    const discount = 0; // Implement discount code logic here
    const total = subtotal + shipping - discount;

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      discountCode
    });

    await order.save();

    // Reduce stock for COD orders immediately (for Razorpay, stock is reduced after payment verification)
    if (paymentMethod === 'cod') {
      for (const { product, quantity } of productUpdates) {
        product.stock -= quantity;
        await product.save();
      }
    }

    // Create Razorpay order if online payment
    if (paymentMethod === 'razorpay') {
      if (!razorpay) {
        return res.status(500).json({ 
          message: 'Payment gateway not configured. Please contact administrator.',
          error: 'Razorpay keys not set in environment variables'
        });
      }
      
      try {
        const razorpayOrder = await razorpay.orders.create({
          amount: Math.round(total * 100), // Amount in paise, ensure integer
          currency: 'INR',
          receipt: `order_${order._id.toString()}`,
          notes: {
            orderId: order._id.toString(),
            userId: req.user._id.toString()
          }
        });

        res.json({
          order,
          razorpayOrderId: razorpayOrder.id,
          key: process.env.RAZORPAY_KEY_ID
        });
      } catch (razorpayError) {
        console.error('Razorpay order creation error:', razorpayError);
        // Delete the order if Razorpay fails
        await Order.findByIdAndDelete(order._id);
        res.status(500).json({ 
          message: 'Payment gateway error. Please try again.',
          error: process.env.NODE_ENV === 'development' ? razorpayError.message : undefined
        });
      }
    } else {
      res.status(201).json(order);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/verify-payment
// @desc    Verify Razorpay payment
// @access  Private
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ 
        message: 'Payment gateway not configured',
        error: 'Razorpay keys not set'
      });
    }

    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature === signature) {
      if (!razorpay) {
        return res.status(500).json({ 
          message: 'Payment gateway not configured',
          error: 'Razorpay keys not set'
        });
      }
      
      // Get Razorpay order details to extract our order ID from notes
      let order = null;
      
      try {
        const razorpayOrder = await razorpay.orders.fetch(orderId);
        
        if (razorpayOrder.notes && razorpayOrder.notes.orderId) {
          order = await Order.findById(razorpayOrder.notes.orderId);
        }
        
        // Fallback: try to find by receipt pattern
        if (!order && razorpayOrder.receipt) {
          const orderIdFromReceipt = razorpayOrder.receipt.replace('order_', '');
          order = await Order.findById(orderIdFromReceipt);
        }
      } catch (fetchError) {
        console.error('Error fetching Razorpay order:', fetchError);
      }
      
      // Final fallback: find most recent pending order
      if (!order) {
        order = await Order.findOne({ 
          paymentStatus: 'pending',
          paymentMethod: 'razorpay'
        }).sort({ createdAt: -1 });
      }
      
      if (order) {
        try {
          // Verify stock availability again before reducing stock
          // (stock might have changed between order creation and payment)
          const orderItems = await Promise.all(
            order.items.map(async (item) => {
              const product = await Product.findById(item.product);
              if (!product) {
                throw new Error(`Product ${item.product} not found`);
              }
              if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
              }
              return { product, quantity: item.quantity };
            })
          );

          // Reduce stock for all items in the order
          for (const { product, quantity } of orderItems) {
            product.stock -= quantity;
            await product.save();
          }

          order.paymentStatus = 'paid';
          order.paymentId = paymentId;
          order.orderStatus = 'processing';
          await order.save();

          res.json({ message: 'Payment verified', order });
        } catch (stockError) {
          // If stock validation fails, mark payment as failed and refund
          order.paymentStatus = 'failed';
          order.orderStatus = 'cancelled';
          await order.save();
          
          console.error('Stock validation failed during payment verification:', stockError.message);
          res.status(400).json({ 
            message: stockError.message || 'Insufficient stock. Payment has been cancelled and will be refunded.',
            order 
          });
        }
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

