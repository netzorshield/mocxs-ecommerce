# Razorpay Payment Gateway Setup Guide

## ✅ Integration Status

Razorpay is already integrated into your MOCXS application! You just need to add your test credentials.

## 🔑 Adding Razorpay Test Credentials

### Step 1: Get Your Test Keys from Razorpay

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Log in to your account
3. Go to **Settings** → **API Keys**
4. Make sure you're in **Test Mode** (toggle at top right)
5. You'll see:
   - **Key ID**: Starts with `rzp_test_...`
   - **Key Secret**: A long secret string

### Step 2: Update Backend Environment File

Open `backend/.env` and update these two lines:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
```

**Example:**
```env
RAZORPAY_KEY_ID=rzp_test_1234567890ABCDEF
RAZORPAY_KEY_SECRET=abcdef1234567890abcdef1234567890
```

### Step 3: Restart Your Backend Server

After updating the `.env` file:

1. Stop your backend server (Ctrl+C)
2. Restart it:
   ```bash
   cd backend
   npm run dev
   ```

You should see a message confirming Razorpay is initialized (no errors).

## 🧪 Testing the Integration

### Test Payment Flow:

1. **Add items to cart** on your website
2. **Go to checkout** page
3. **Select "Online Payment (UPI/Card/Net Banking)"**
4. **Fill in shipping address**
5. **Click "Place Order"**
6. **Razorpay payment popup** should appear
7. **Use INDIAN test card details** (Razorpay only accepts Indian cards):
   - **Card Number**: `5267 3181 8797 5449` (Indian Visa)
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVV**: Any 3 digits (e.g., `123`)
   - **Name**: Any name
   
   **⚠️ Don't use `4111 1111 1111 1111` - it's an international card and will be rejected!**

### Test Payment Success:
- Payment should complete successfully
- Order should be created in your database
- You should be redirected to orders page

### Test Payment Failure:
- You can test failure scenarios in Razorpay test mode
- Check the order status in admin panel

## 📋 Razorpay Test Card Details

**⚠️ IMPORTANT: Razorpay Test Mode only accepts INDIAN cards!**

Razorpay provides these **Indian test cards** for testing:

### ✅ Successful Payment (Indian Visa):
- **Card**: `5267 3181 8797 5449`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

### ✅ Alternative Successful Payment (Indian Mastercard):
- **Card**: `5104 0600 0000 0008`
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### ❌ Failed Payment:
- **Card**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### ❌ Insufficient Funds:
- **Card**: `4000 0000 0000 9995`
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### 🚫 Cards That DON'T Work:
- `4111 1111 1111 1111` - This is an international card, Razorpay test mode rejects it
- Any non-Indian card numbers will show "International cards are not supported" error

## 🔍 Verification Checklist

- [ ] Razorpay test keys added to `backend/.env`
- [ ] Backend server restarted
- [ ] No Razorpay errors in server console
- [ ] Payment popup appears on checkout
- [ ] Test payment completes successfully
- [ ] Order created in database after payment

## 🚨 Troubleshooting

### Error: "Payment gateway not configured"
- **Solution**: Check that `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set in `backend/.env`
- Make sure there are no extra spaces around the `=` sign
- Restart the backend server after updating `.env`

### Error: "Payment gateway not loaded"
- **Solution**: Check browser console for errors
- Make sure Razorpay script is loading: `<Script src="https://checkout.razorpay.com/v1/checkout.js" />`
- Try refreshing the page

### Payment popup doesn't appear
- **Solution**: Check browser console for JavaScript errors
- Verify you're logged in
- Make sure cart has items

## 📝 Current Configuration

Your Razorpay integration includes:

✅ **Backend** (`backend/routes/orders.js`):
- Order creation with Razorpay
- Payment verification
- Stock management after payment

✅ **Frontend** (`frontend/app/checkout/page.tsx`):
- Razorpay checkout script
- Payment handler
- Success/failure callbacks

## 🔄 Switching to Production

When ready for production:

1. Get **Live Mode** keys from Razorpay dashboard
2. Update `backend/.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
   ```
3. Restart backend server
4. Test with real payment methods

---

**Need Help?** Check `FIX_RAZORPAY_ERROR.md` for common issues.

