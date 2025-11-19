# Test Razorpay Payment Integration

## ✅ Setup Complete!

Your Razorpay credentials are already configured:
- ✅ Key ID: `rzp_test_RhSTCjwSCM0Owd`
- ✅ Key Secret: Configured

## 🚀 Next Steps: Test the Payment

### Step 1: Start Your Servers

**Option A: Use the launcher (Easiest)**
```powershell
cd b:\MOCXS
.\START_MOCXS.bat
```

**Option B: Start manually**

**Terminal 1 - Backend:**
```powershell
cd b:\MOCXS\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd b:\MOCXS\frontend
npm run dev
```

### Step 2: Verify Backend is Running

1. Open browser: http://localhost:5000/api/health
2. Should see: `{"status":"OK","message":"MOCXS API is running"}`

### Step 3: Test Payment Flow

1. **Open your website**: http://localhost:3000
2. **Login** to your account (or create one)
3. **Add items to cart**
4. **Go to checkout** page
5. **Fill in shipping address**:
   - Name, Phone, Address, City, State, Pincode
6. **Select payment method**: "Online Payment (UPI/Card/Net Banking)"
7. **Click "Place Order"**
8. **Razorpay popup should appear** ✅

### Step 4: Complete Test Payment

**⚠️ IMPORTANT: Razorpay Test Mode only accepts INDIAN cards!**

Use these **Razorpay Indian Test Card Details**:

**✅ Successful Payment (Indian Visa Card):**
- **Card Number**: `5267 3181 8797 5449`
- **Expiry Date**: `12/25` (any future date)
- **CVV**: `123` (any 3 digits)
- **Name**: Any name (e.g., "Test User")

**✅ Alternative Successful Payment (Indian Mastercard):**
- **Card Number**: `5104 0600 0000 0008`
- **Expiry Date**: `12/25`
- **CVV**: `123`

**❌ Failed Payment (to test error handling):**
- **Card Number**: `4000 0000 0000 0002`
- **Expiry Date**: `12/25`
- **CVV**: `123`

**💡 Note:** The card `4111 1111 1111 1111` is an international card and won't work in Razorpay test mode. Always use Indian card numbers!

### Step 5: Verify Payment Success

After successful payment:
- ✅ You should see "Order placed successfully!" message
- ✅ Redirected to `/account/orders` page
- ✅ Order should appear in your orders list
- ✅ Cart should be cleared
- ✅ Product stock should be reduced

## 🔍 Check Backend Logs

When you place an order, check your backend terminal. You should see:
- ✅ "Razorpay order created successfully"
- ✅ No errors related to Razorpay

## 🐛 Troubleshooting

### Payment popup doesn't appear

**Check:**
1. Browser console for errors (F12 → Console)
2. Backend is running on port 5000
3. Frontend is running on port 3000
4. You're logged in

**Fix:**
- Refresh the checkout page
- Check browser console for JavaScript errors
- Verify Razorpay script is loading (check Network tab)

### "Payment gateway not configured" error

**Check:**
1. Backend `.env` file has Razorpay keys
2. Backend server was restarted after adding keys
3. No typos in Key ID or Key Secret

**Fix:**
```powershell
cd b:\MOCXS\backend
# Verify .env file
Get-Content .env | Select-String "RAZORPAY"
# Restart server
npm run dev
```

### Payment succeeds but order not created

**Check:**
1. Backend logs for errors
2. MongoDB connection is working
3. Payment verification endpoint is working

**Fix:**
- Check backend terminal for error messages
- Verify MongoDB is connected
- Check `/api/orders/verify-payment` endpoint

## ✅ Success Checklist

- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Can access checkout page
- [ ] Razorpay popup appears when clicking "Place Order"
- [ ] Test payment completes successfully
- [ ] Order created in database
- [ ] Redirected to orders page
- [ ] No errors in browser console
- [ ] No errors in backend logs

## 🎉 You're All Set!

Once you've tested successfully, your Razorpay integration is complete and ready to use!

---

**Need help?** Check `RAZORPAY_SETUP.md` for detailed information.

