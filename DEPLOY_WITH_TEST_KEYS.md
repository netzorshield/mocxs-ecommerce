# 🚀 Deploy to Production with Razorpay Test Keys

## ✅ Using Test Keys for Deployment

This is a smart approach! Test the deployment with test keys first, then switch to production keys when ready.

**Your Current Test Keys:**
- Key ID: `rzp_test_RhSTCjwSCM0Owd`
- Key Secret: (configured in backend/.env)

---

## 📋 Quick Deployment Steps

### Step 1: Update Railway Backend Environment Variables

1. **Go to Railway Dashboard:**
   - https://railway.app/
   - Select your backend project

2. **Go to Variables Tab:**
   - Click on **"Variables"** in the left sidebar

3. **Add/Update Razorpay Test Keys:**
   ```
   RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
   RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET_HERE
   ```
   
   ⚠️ **Get your Key Secret from:** `backend/.env` file
   - Open `backend/.env`
   - Copy the value of `RAZORPAY_KEY_SECRET`

4. **Also ensure these are set:**
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=5000
   ```

5. **Save** - Railway will automatically redeploy

### Step 2: Update Vercel Frontend Environment Variables

1. **Go to Vercel Dashboard:**
   - https://vercel.com/
   - Select your frontend project

2. **Go to Settings → Environment Variables:**
   - Click **"Settings"** → **"Environment Variables"**

3. **Add/Update:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
   ```

4. **Redeploy Frontend:**
   - Go to **"Deployments"** tab
   - Click **"Redeploy"** on the latest deployment
   - Or push a new commit to trigger auto-deployment

### Step 3: Verify Deployment

1. **Check Backend:**
   - Open: `https://your-backend.railway.app/api/health`
   - Should see: `{"status":"OK","message":"MOCXS API is running"}`

2. **Check Frontend:**
   - Open your Vercel URL
   - Website should load normally

3. **Test Payment:**
   - Login to your website
   - Add items to cart
   - Go to checkout
   - Select "Online Payment"
   - Click "Place Order"
   - Razorpay popup should appear ✅

### Step 4: Test Payment with Test Card

**Use Indian Test Card:**
- **Card Number**: `5267 3181 8797 5449`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

Payment should complete successfully! ✅

---

## 🔍 How to Get Your Test Key Secret

If you need to find your test key secret:

1. **Open:** `backend/.env` file
2. **Look for:** `RAZORPAY_KEY_SECRET=...`
3. **Copy the value** (everything after the `=`)

Or check Razorpay dashboard:
1. Go to: https://dashboard.razorpay.com/
2. Make sure you're in **Test Mode** (not Live Mode)
3. Go to **Settings** → **API Keys**
4. Copy the **Key Secret**

---

## 📝 Environment Variables Checklist

### Railway (Backend) - Required:

```env
✅ MONGODB_URI=...
✅ JWT_SECRET=...
✅ FRONTEND_URL=https://your-frontend.vercel.app
✅ RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
✅ RAZORPAY_KEY_SECRET=your-test-secret
✅ NODE_ENV=production
✅ PORT=5000
```

### Vercel (Frontend) - Required:

```env
✅ NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
✅ NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
```

---

## 🧪 Testing Checklist

After deployment, test:

- [ ] Backend health check works
- [ ] Frontend loads without errors
- [ ] Can login/register
- [ ] Can add items to cart
- [ ] Can go to checkout
- [ ] Razorpay popup appears
- [ ] Test payment completes
- [ ] Order is created after payment
- [ ] Order shows in "My Orders"
- [ ] No console errors

---

## 🔄 When Ready for Production

Once everything works with test keys:

1. **Get Production Keys:**
   - Switch Razorpay to Live Mode
   - Get production keys (start with `rzp_live_`)

2. **Update Environment Variables:**
   - Railway: Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
   - Vercel: Update `NEXT_PUBLIC_RAZORPAY_KEY_ID`

3. **Redeploy:**
   - Railway auto-redeploys when you save variables
   - Vercel: Redeploy manually

4. **Test with Real Payment:**
   - Use a real payment method
   - Test with small amount first

---

## 🐛 Troubleshooting

### "Payment gateway not configured"
- Check Railway variables are saved
- Verify backend redeployed after adding variables
- Check Railway logs for errors

### Razorpay popup doesn't appear
- Check Vercel environment variables
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check browser console for errors
- Redeploy frontend

### Payment fails
- Make sure you're using Indian test card: `5267 3181 8797 5449`
- Check Railway logs for payment errors
- Verify Razorpay keys are correct

---

## ✅ Ready to Deploy?

1. Get your test key secret from `backend/.env`
2. Update Railway variables
3. Update Vercel variables
4. Test the payment flow

**That's it!** Your site will be live with Razorpay test mode! 🎉

