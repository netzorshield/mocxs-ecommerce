# Production Deployment with Razorpay - Complete Guide

## 🎯 Overview

This guide will help you redeploy your MOCXS ecommerce project to production with Razorpay payment gateway configured.

**Current Setup:**
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas
- Payment: Razorpay (needs production keys)

---

## 📋 Pre-Deployment Checklist

- [ ] Razorpay account created
- [ ] Production keys obtained from Razorpay
- [ ] GitHub repository up to date
- [ ] Railway account active
- [ ] Vercel account active
- [ ] MongoDB Atlas connection string ready

---

## Step 1: Get Razorpay Production Keys

### 1.1 Login to Razorpay Dashboard

1. Go to [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)
2. Login with your Razorpay account

### 1.2 Switch to Live Mode

1. In the top right corner, toggle from **"Test Mode"** to **"Live Mode"**
2. You'll see a warning - click **"Activate Live Mode"** if prompted

### 1.3 Get Production Keys

1. Go to **Settings** → **API Keys**
2. You'll see:
   - **Key ID**: Starts with `rzp_live_...`
   - **Key Secret**: A long secret string
3. **Copy both keys** and save them securely

⚠️ **Important:** 
- Production keys process REAL payments
- Keep them secure
- Never commit them to Git

---

## Step 2: Update Backend Environment Variables (Railway)

### 2.1 Access Railway Dashboard

1. Go to [https://railway.app/](https://railway.app/)
2. Login to your account
3. Select your backend project

### 2.2 Update Environment Variables

1. Go to **Variables** tab
2. Update or add these variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Database (Your existing connection string)
MONGODB_URI=your-mongodb-atlas-connection-string

# JWT Secret (Your existing secret - keep it the same)
JWT_SECRET=your-existing-jwt-secret

# Frontend URL (Your Vercel frontend URL)
FRONTEND_URL=https://your-frontend.vercel.app

# Razorpay Production Keys (NEW - Add these)
RAZORPAY_KEY_ID=rzp_live_YOUR_PRODUCTION_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_PRODUCTION_KEY_SECRET
```

### 2.3 Save and Redeploy

1. Click **"Save"** or **"Update"** for each variable
2. Railway will automatically redeploy when you save variables
3. Wait for deployment to complete (check the **Deployments** tab)

---

## Step 3: Update Frontend Environment Variables (Vercel)

### 3.1 Access Vercel Dashboard

1. Go to [https://vercel.com/](https://vercel.com/)
2. Login to your account
3. Select your frontend project

### 3.2 Update Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Update or add these variables:

```env
# Backend API URL (Your Railway backend URL)
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api

# Razorpay Production Key ID (Public key - same as backend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_PRODUCTION_KEY_ID
```

### 3.3 Redeploy Frontend

1. After updating variables, go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger auto-deployment

---

## Step 4: Verify Deployment

### 4.1 Check Backend Health

1. Open: `https://your-backend.railway.app/api/health`
2. Should see: `{"status":"OK","message":"MOCXS API is running"}`

### 4.2 Check Frontend

1. Open your Vercel frontend URL
2. Website should load normally
3. Check browser console for errors (F12 → Console)

### 4.3 Test Razorpay Integration

1. **Login** to your website
2. **Add items** to cart
3. **Go to checkout**
4. **Select "Online Payment"**
5. **Click "Place Order"**
6. **Razorpay popup should appear**

⚠️ **Note:** In production, use REAL payment methods (not test cards)

---

## Step 5: Test Payment Flow

### 5.1 Test with Small Amount

1. Create a test order with minimum amount
2. Use a real payment method (your own card)
3. Complete the payment
4. Verify order is created in database

### 5.2 Verify Order Creation

1. Check your orders page
2. Order should show "Processing" status
3. Payment status should show "Paid"
4. Check admin panel to see the order

---

## 🔧 Troubleshooting

### Issue: Razorpay popup doesn't appear

**Check:**
1. Browser console for errors (F12 → Console)
2. `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set in Vercel
3. Backend `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set in Railway
4. Both keys are production keys (start with `rzp_live_`)

**Fix:**
- Verify environment variables are saved
- Redeploy both frontend and backend
- Clear browser cache

### Issue: "Payment gateway not configured"

**Check:**
1. Railway environment variables are saved
2. Backend was redeployed after adding variables
3. Keys are correct (no typos)

**Fix:**
- Double-check Railway variables
- Redeploy backend
- Check backend logs in Railway

### Issue: Payment succeeds but order not created

**Check:**
1. Backend logs in Railway
2. MongoDB connection is working
3. Payment verification endpoint is working

**Fix:**
- Check Railway logs for errors
- Verify MongoDB Atlas connection
- Test payment verification endpoint

---

## 📝 Environment Variables Summary

### Railway (Backend) - Required Variables:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
NODE_ENV=production
PORT=5000
```

### Vercel (Frontend) - Required Variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] Razorpay popup appears on checkout
- [ ] Test payment completes successfully
- [ ] Order is created after payment
- [ ] No console errors
- [ ] All environment variables are set

---

## 🚀 Quick Deployment Commands

### If you need to push code changes:

```bash
# Make sure all changes are committed
git add .
git commit -m "Add Razorpay production configuration"
git push origin main
```

This will trigger:
- ✅ Vercel auto-deployment (frontend)
- ✅ Railway auto-deployment (backend)

---

## 🔒 Security Reminders

1. **Never commit** `.env` files to Git
2. **Use production keys** only in production
3. **Keep keys secure** - don't share them
4. **Use HTTPS** - both Vercel and Railway provide SSL
5. **Monitor payments** in Razorpay dashboard

---

## 📞 Need Help?

If you encounter issues:

1. Check Railway logs: Railway Dashboard → Your Project → Deployments → View Logs
2. Check Vercel logs: Vercel Dashboard → Your Project → Deployments → View Logs
3. Check browser console: F12 → Console tab
4. Verify all environment variables are set correctly

---

## 🎉 Success!

Once everything is deployed and tested, your ecommerce site is live with Razorpay payment integration!

**Your production URLs:**
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.railway.app`
- API: `https://your-backend.railway.app/api`

---

**Ready to deploy? Follow the steps above!** 🚀

