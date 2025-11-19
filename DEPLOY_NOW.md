# 🚀 Quick Production Deployment - Step by Step

## ⚡ Quick Steps (5 Minutes)

### Step 1: Get Razorpay Production Keys (2 min)

1. Go to: https://dashboard.razorpay.com/
2. **Switch to Live Mode** (top right toggle)
3. Go to **Settings** → **API Keys**
4. Copy:
   - **Key ID**: `rzp_live_...`
   - **Key Secret**: `...`

### Step 2: Update Railway Backend (1 min)

1. Go to: https://railway.app/
2. Select your backend project
3. Go to **Variables** tab
4. Add/Update:
   ```
   RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_HERE
   RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
   ```
5. Save - Railway auto-redeploys

### Step 3: Update Vercel Frontend (1 min)

1. Go to: https://vercel.com/
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_HERE
   ```
5. Go to **Deployments** → Click **Redeploy**

### Step 4: Test (1 min)

1. Go to your website
2. Add item to cart
3. Go to checkout
4. Click "Place Order"
5. Razorpay popup should appear ✅

---

## 📝 Detailed Guide

See `PRODUCTION_DEPLOYMENT_RAZORPAY.md` for complete instructions.

---

## ✅ Ready to Deploy?

Your code changes are ready. Just:
1. Get Razorpay production keys
2. Update environment variables
3. Test!

