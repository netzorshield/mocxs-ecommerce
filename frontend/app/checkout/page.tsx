'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { getAuthToken, getCurrentUser } from '@/lib/auth';
import toast from 'react-hot-toast';
import Script from 'next/script';
import { getLocalStorage, removeLocalStorage } from '@/lib/storage';
import { validatePhone } from '@/lib/utils';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay',
  });

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      toast.error('Please login to checkout');
      router.push('/login?redirect=/checkout');
      return;
    }

    loadCart();
    loadUser();
  }, [router]);

  const loadCart = () => {
    const cartData = getLocalStorage('cart', []);
    if (cartData.length === 0) {
      toast.error('Your cart is empty');
      router.push('/cart');
      return;
    }
    setCart(cartData);
  };

  const loadUser = async () => {
    const userData = await getCurrentUser();
    if (userData) {
      setUser(userData);
      if (userData.addresses && userData.addresses.length > 0) {
        const defaultAddress = userData.addresses.find((addr: any) => addr.isDefault) || userData.addresses[0];
        setFormData({
          name: defaultAddress.name || userData.name || '',
          phone: defaultAddress.phone || userData.phone || '',
          addressLine1: defaultAddress.addressLine1 || '',
          addressLine2: defaultAddress.addressLine2 || '',
          city: defaultAddress.city || '',
          state: defaultAddress.state || '',
          pincode: defaultAddress.pincode || '',
          paymentMethod: 'razorpay',
        });
      } else {
        setFormData({
          ...formData,
          name: userData.name || '',
          phone: userData.phone || '',
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      const items = cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.price,
      }));

      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal > 999 ? 0 : 50;
      const total = subtotal + shipping;

      const orderData = {
        items,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
      };

      if (formData.paymentMethod === 'razorpay') {
        const response = await api.post('/orders', orderData);
        const { razorpayOrderId, key } = response.data;

        const options = {
          key,
          amount: total * 100,
          currency: 'INR',
          name: 'MOCXS',
          description: 'Order Payment',
          order_id: razorpayOrderId,
          handler: async function (response: any) {
            try {
              const verifyResponse = await api.post('/orders/verify-payment', {
                orderId: razorpayOrderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              });

              removeLocalStorage('cart');
              toast.success('Order placed successfully!');
              setTimeout(() => {
                router.push('/account/orders');
              }, 1000);
            } catch (error: any) {
              console.error('Payment verification error:', error);
              toast.error(error.response?.data?.message || 'Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: formData.name,
            email: user?.email || '',
            contact: formData.phone,
          },
          theme: {
            color: '#1e3a8a',
          },
          modal: {
            ondismiss: function() {
              toast.error('Payment cancelled');
            }
          }
        };

        if (typeof window !== 'undefined' && window.Razorpay) {
          const razorpay = new window.Razorpay(options);
          razorpay.on('payment.failed', function(response: any) {
            toast.error('Payment failed. Please try again.');
            console.error('Payment failed:', response.error);
          });
          razorpay.open();
        } else {
          toast.error('Payment gateway not loaded. Please refresh the page.');
        }
      } else {
        // Cash on Delivery
        await api.post('/orders', orderData);
        removeLocalStorage('cart');
        toast.success('Order placed successfully!');
        router.push('/account/orders');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Shipping Address */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg ${
                        formData.phone && !validatePhone(formData.phone) 
                          ? 'border-red-500 focus:ring-red-500' 
                          : ''
                      }`}
                      placeholder="10-digit mobile number"
                    />
                    {formData.phone && !validatePhone(formData.phone) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter a valid 10-digit phone number (starting with 6-9)
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      required
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Payment Method</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="razorpay"
                          checked={formData.paymentMethod === 'razorpay'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="mr-2"
                        />
                        <span>Online Payment (UPI/Card/Net Banking)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="mr-2"
                        />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-deepBlue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

