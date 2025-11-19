# 🚀 Deploy to Production - Complete Checklist

## ✅ Pre-Deployment Checklist

Before deploying, make sure:
- [ ] All code changes are committed
- [ ] Razorpay test keys are ready
- [ ] Railway account is active
- [ ] Vercel account is active
- [ ] MongoDB Atlas connection is working

---

## Step 1: Commit and Push Code Changes

### 1.1 Review Changes

Your current changes include:
- ✅ Razorpay integration fixes
- ✅ Image loading fixes
- ✅ Login improvements
- ✅ Favicon configuration
- ✅ Order status guide

### 1.2 Commit Changes

```bash
cd b:\MOCXS
git add .
git commit -m "Add Razorpay integration, fix image loading, improve login, add favicon support"
git push origin main
```

This will trigger:
- ✅ Vercel auto-deployment (frontend)
- ✅ Railway auto-deployment (backend)

---

## Step 2: Update Railway Backend Environment Variables

### 2.1 Go to Railway Dashboard

1. **Open:** https://railway.app/
2. **Login** to your account
3. **Select** your backend project

### 2.2 Add/Update Environment Variables

Go to **Variables** tab and ensure these are set:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=your-mongodb-atlas-connection-string

# Authentication
JWT_SECRET=your-jwt-secret-key

# Frontend URL (Your Vercel URL)
FRONTEND_URL=https://your-frontend.vercel.app

# Razorpay Test Keys
RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
RAZORPAY_KEY_SECRET=rG5pIGRSmue6DRXF0kKiIJDR
```

### 2.3 Verify Deployment

1. **Check Deployments** tab
2. Should see "Deploying..." or "Deployed"
3. Wait for deployment to complete
4. **Get Backend URL:**
   - Go to **Settings** → **Networking**
   - Copy your Railway URL (e.g., `your-backend.railway.app`)

---

## Step 3: Update Vercel Frontend Environment Variables

### 3.1 Go to Vercel Dashboard

1. **Open:** https://vercel.com/
2. **Login** to your account
3. **Select** your frontend project

### 3.2 Add/Update Environment Variables

Go to **Settings** → **Environment Variables** and ensure:

```env
# Backend API URL (Your Railway URL)
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api

# Razorpay Test Key ID
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
```

### 3.3 Redeploy Frontend

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or wait for auto-deployment after git push

---

## Step 4: Verify Deployment

### 4.1 Check Backend

1. **Open:** `https://your-backend.railway.app/api/health`
2. **Should see:** `{"status":"OK","message":"MOCXS API is running"}`

### 4.2 Check Frontend

1. **Open** your Vercel URL
2. **Website should load** normally
3. **Check browser console** (F12) - no errors

### 4.3 Test Key Features

- [ ] Homepage loads
- [ ] Can browse products
- [ ] Can login/register
- [ ] Can add to cart
- [ ] Can checkout
- [ ] Razorpay popup appears
- [ ] Favicon appears in browser tab

---

## Step 5: Test Payment Flow

### 5.1 Test with Test Card

1. **Login** to your website
2. **Add items** to cart
3. **Go to checkout**
4. **Select "Online Payment"**
5. **Click "Place Order"**
6. **Razorpay popup should appear**

### 5.2 Use Test Card

**Indian Test Card:**
- **Card:** `5267 3181 8797 5449`
- **Expiry:** Any future date (e.g., `12/25`)
- **CVV:** Any 3 digits (e.g., `123`)

### 5.3 Verify Order

- [ ] Payment completes
- [ ] Order is created
- [ ] Order shows in "My Orders"
- [ ] Order status is "Processing"

---

## 🔧 Troubleshooting

### Backend Not Deploying

**Check:**
1. Railway logs for errors
2. Environment variables are set
3. MongoDB connection string is correct

**Fix:**
- Check Railway **Deployments** tab for error messages
- Verify all environment variables
- Redeploy manually if needed

### Frontend Not Deploying

**Check:**
1. Vercel build logs
2. Environment variables are set
3. No build errors

**Fix:**
- Check Vercel **Deployments** tab
- View build logs for errors
- Redeploy manually

### Razorpay Not Working

**Check:**
1. Environment variables in both Railway and Vercel
2. Keys are correct (no typos)
3. Browser console for errors

**Fix:**
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Railway
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` in Vercel
- Redeploy both frontend and backend

### Images Not Loading

**Check:**
1. Image paths are correct
2. Backend is serving images
3. CORS is configured

**Fix:**
- Images will show placeholder if missing (this is expected)
- Upload new images through admin panel
- Images will be stored on Railway (temporary)

---

## 📝 Environment Variables Summary

### Railway (Backend) - All Required:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
FRONTEND_URL=https://your-frontend.vercel.app
RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
RAZORPAY_KEY_SECRET=rG5pIGRSmue6DRXF0kKiIJDR
NODE_ENV=production
PORT=5000
```

### Vercel (Frontend) - All Required:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] Can login/register
- [ ] Products display correctly
- [ ] Cart works
- [ ] Checkout works
- [ ] Razorpay popup appears
- [ ] Test payment completes
- [ ] Order is created
- [ ] Favicon appears in browser tab
- [ ] No console errors

---

## 🎉 Success!

Once all checks pass, your ecommerce site is live in production! 🚀

**Your Production URLs:**
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.railway.app`
- API: `https://your-backend.railway.app/api`

---

## 🔄 When Ready for Live Payments

When you want to switch to production Razorpay keys:

1. **Get production keys** from Razorpay (switch to Live Mode)
2. **Update Railway:** Replace test keys with production keys
3. **Update Vercel:** Replace test key with production key
4. **Redeploy** both services
5. **Test** with real payment (small amount first)

---

**Ready to deploy? Follow the steps above!** 🚀

