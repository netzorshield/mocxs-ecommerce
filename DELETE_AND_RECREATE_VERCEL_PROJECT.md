# Delete and Recreate Vercel Project - Step by Step Guide

## 🎯 Why This Is a Good Solution

**Starting fresh will:**
- ✅ Fix any repository connection issues
- ✅ Ensure Root Directory is set correctly from the start
- ✅ Clear any cached/stale settings
- ✅ Give you a clean deployment

---

## 📋 Step-by-Step Instructions

### Step 1: Delete Current Project

**In Vercel Dashboard:**
1. **Go to:** Your project (MOCXS or current project name)
2. **Click:** "Settings" tab
3. **Scroll down** to the bottom of the page
4. **Find:** "Danger Zone" section
5. **Click:** "Delete Project" button
6. **Type the project name** to confirm deletion
7. **Click:** "Delete" to confirm

**⚠️ Warning:** This will delete:
- Deployment history
- Environment variables (you'll need to re-add them)
- Domain settings (you'll need to reconnect)
- Build settings

**✅ But it's OK because:**
- Your code is safe in GitHub
- You can recreate everything
- This gives you a fresh start

---

### Step 2: Create New Project

**In Vercel Dashboard:**
1. **Click:** "Add New..." button (top right)
2. **Click:** "Project"
3. **You'll see:** "Import Git Repository" screen

---

### Step 3: Connect Git Repository

**On the "Import Git Repository" screen:**
1. **Select:** GitHub (or your Git provider)
2. **If not connected:** Click "Connect" and authorize
3. **Search for:** `mocxs-ecommerce` or `netzorshield/mocxs-ecommerce`
4. **Click on your repository** to select it

---

### Step 4: Configure Project Settings

**After selecting repository, you'll see configuration options:**

#### Project Name
- **Set to:** `mocxs-ecommerce` (or your preferred name)

#### Framework Preset
- **Should auto-detect:** Next.js
- **If not:** Select "Next.js" manually

#### Root Directory
- **IMPORTANT:** Click "Edit" or type in the field
- **Set to:** `frontend` (exactly, no slashes!)
- **This is critical!** Make sure it's exactly `frontend`

#### Build and Output Settings
- **Build Command:** Leave as `npm run build` (or auto)
- **Output Directory:** Leave as `.next` (or auto)
- **Install Command:** Leave as `npm install` (or auto)

---

### Step 5: Add Environment Variables

**Before deploying, add environment variables:**

1. **Click:** "Environment Variables" section
2. **Add these variables:**

```
NEXT_PUBLIC_API_URL=https://mocxs-ecommerce-production.up.railway.app/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
```

**For each variable:**
- **Name:** Enter the variable name
- **Value:** Enter the value
- **Environment:** Select "Production" (and "Preview" if needed)
- **Click:** "Add"

**Important variables to add:**
- `NEXT_PUBLIC_API_URL` - Your Railway backend URL
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Your Razorpay key (if using)

---

### Step 6: Deploy

**After configuring:**
1. **Review all settings:**
   - ✅ Root Directory: `frontend`
   - ✅ Framework: Next.js
   - ✅ Environment Variables: Added
2. **Click:** "Deploy" button
3. **Wait for deployment** to complete (1-3 minutes)

---

### Step 7: Verify Deployment

**After deployment completes:**
1. **Check status:** Should be "Ready" ✅
2. **Click on deployment** to see details
3. **Check build logs** for any errors
4. **Visit your site:** Should be live!

---

### Step 8: Reconnect Custom Domain (If You Had One)

**If you had a custom domain (like www.mocxs.com):**
1. **Settings → Domains**
2. **Add domain:** Enter your domain
3. **Follow DNS setup instructions**
4. **Wait for DNS propagation** (can take a few minutes)

---

## ✅ Checklist

**Before deleting:**
- [ ] Note down your environment variables (write them down!)
- [ ] Note down your custom domain (if any)
- [ ] Make sure code is pushed to GitHub ✅

**When creating new project:**
- [ ] Root Directory is set to `frontend` ✅
- [ ] Framework is Next.js ✅
- [ ] Environment variables are added ✅
- [ ] Project name is correct ✅

**After deployment:**
- [ ] Deployment status is "Ready" ✅
- [ ] Site is accessible ✅
- [ ] Favicon files are accessible ✅
- [ ] Custom domain is connected (if applicable) ✅

---

## 🎯 Key Settings to Remember

**When creating the new project, make sure:**

1. **Root Directory:** `frontend` (exactly, no slashes!)
2. **Framework:** Next.js
3. **Build Command:** `npm run build` (or auto)
4. **Output Directory:** `.next` (or auto)

**These are the most important settings!**

---

## 📋 Environment Variables to Add

**Copy these before deleting the old project:**

```
NEXT_PUBLIC_API_URL=https://mocxs-ecommerce-production.up.railway.app/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_... (your test key)
```

**To find your current environment variables:**
1. **Old project → Settings → Environment Variables**
2. **Copy all values** before deleting

---

## 🚨 Important Notes

**Before deleting:**
- ⚠️ **Save your environment variables!** Write them down or copy them
- ⚠️ **Note your custom domain** (if you have one)
- ✅ **Your code is safe** - it's in GitHub

**When creating new project:**
- ✅ **Root Directory MUST be `frontend`** (not empty, not `/frontend`)
- ✅ **Make sure to add environment variables** before first deploy
- ✅ **Check that framework is Next.js**

---

## 🎯 Summary

**Steps:**
1. **Delete** old project (Settings → Danger Zone → Delete)
2. **Create** new project (Add New → Project)
3. **Connect** Git repository
4. **Set Root Directory:** `frontend` ✅
5. **Add** environment variables
6. **Deploy** and verify

**This will give you a fresh start and should fix all connection issues!** 🚀

---

## 💡 Pro Tips

**To make sure Root Directory is correct:**
- Type it manually: `frontend`
- Don't use autocomplete or suggestions
- Verify it shows exactly `frontend` (no slashes, no paths)

**To verify files are accessible after deployment:**
- Visit: `https://your-site.vercel.app/images/trends/favicon.ico`
- Should return 200 (not 404) ✅

**If deployment fails:**
- Check build logs for errors
- Verify Root Directory is `frontend`
- Verify environment variables are set
- Check that files are in GitHub

---

## ✅ Expected Result

**After recreating project:**
- ✅ Vercel finds `frontend/` directory
- ✅ Build succeeds
- ✅ Files from `frontend/public/images/trends/` are accessible
- ✅ Favicon appears in browser tab
- ✅ No more "Root Directory does not exist" errors

**This is a clean solution that should fix everything!** 🎉

