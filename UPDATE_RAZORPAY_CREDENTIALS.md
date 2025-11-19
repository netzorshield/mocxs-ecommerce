# Quick Guide: Add Razorpay Test Credentials

## 📝 What You Need

From Razorpay, you should have received:
1. **Key ID** (starts with `rzp_test_...`)
2. **Key Secret** (a long secret string)

## 🚀 Quick Setup (2 Steps)

### Step 1: Open the .env file

Navigate to: `backend/.env`

### Step 2: Update these two lines

Find these lines:
```env
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

Replace with your actual test credentials:
```env
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET
```

**Example:**
```env
RAZORPAY_KEY_ID=rzp_test_1234567890ABCDEF
RAZORPAY_KEY_SECRET=abcdef1234567890abcdef1234567890
```

### Step 3: Restart Backend Server

After saving the file:
1. Stop your backend server (Ctrl+C in the terminal where it's running)
2. Start it again:
   ```bash
   cd backend
   npm run dev
   ```

## ✅ Verify It's Working

When the server starts, you should see:
- ✅ "Server running on port 5000"
- ✅ No Razorpay errors
- ✅ MongoDB connected successfully

## 🧪 Test Payment

1. Go to your website checkout page
2. Select "Online Payment"
3. Click "Place Order"
4. Razorpay popup should appear
5. Use test card: `4111 1111 1111 1111` (any expiry, any CVV)

---

**That's it!** Your Razorpay integration is ready to use.

