# ⚡ Quick Deploy with Test Keys - 3 Steps

## Your Test Keys:
- **Key ID**: `rzp_test_RhSTCjwSCM0Owd`
- **Key Secret**: `rG5pIGRSmue6DRXF0kKiIJDR`

---

## 🚀 Step 1: Update Railway (Backend) - 2 minutes

1. **Go to:** https://railway.app/
2. **Select your backend project**
3. **Click "Variables" tab**
4. **Add/Update these:**
   ```
   RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
   RAZORPAY_KEY_SECRET=rG5pIGRSmue6DRXF0kKiIJDR
   ```
5. **Click "Save"** - Railway auto-redeploys ✅

---

## 🚀 Step 2: Update Vercel (Frontend) - 2 minutes

1. **Go to:** https://vercel.com/
2. **Select your frontend project**
3. **Go to:** Settings → Environment Variables
4. **Add/Update:**
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RhSTCjwSCM0Owd
   ```
5. **Go to:** Deployments tab
6. **Click "Redeploy"** on latest deployment ✅

---

## 🚀 Step 3: Test - 1 minute

1. **Open your website**
2. **Add item to cart**
3. **Go to checkout**
4. **Click "Place Order"**
5. **Razorpay popup appears** ✅
6. **Use test card:** `5267 3181 8797 5449` (any expiry, any CVV)

---

## ✅ Done!

Your site is now live with Razorpay test mode!

**When ready for production:**
- Switch to production keys (rzp_live_...)
- Update the same environment variables
- Redeploy

---

**Need help?** Check `DEPLOY_WITH_TEST_KEYS.md` for detailed guide.

