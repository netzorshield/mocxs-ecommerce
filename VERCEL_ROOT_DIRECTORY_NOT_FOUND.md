# Vercel: "Root Directory 'frontend' does not exist" - Fix Guide

## 🔍 Problem

**Error Message:**
```
The specified Root Directory "frontend" does not exist. 
Please update your Project Settings.
```

**But we know:**
- ✅ `frontend/` directory exists locally
- ✅ `frontend/` is committed to Git
- ✅ Files are in the repository

**Why Vercel can't find it:**
- Vercel might be looking at a different branch
- Vercel might not have pulled latest changes
- Repository connection might need refresh

---

## ✅ Solution Steps

### Step 1: Check Vercel Repository Connection

**In Vercel Dashboard:**
1. **Go to:** Settings → General
2. **Find:** "Git Repository" section
3. **Check:**
   - Is it connected to the correct repository?
   - Is it connected to the correct branch? (should be `main` or `master`)
   - Click "Disconnect" and reconnect if needed

### Step 2: Check Branch Setting

**In Vercel Dashboard:**
1. **Go to:** Settings → General
2. **Find:** "Production Branch" or "Git Branch"
3. **Should be:** `main` (or `master` if that's your default)
4. **If wrong:** Change it to `main`

### Step 3: Trigger a New Deployment

**Option A: Push a New Commit**
```bash
# Make a small change to trigger deployment
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin main
```

**Option B: Manual Redeploy**
1. **Vercel Dashboard → Deployments**
2. **Click "..." on latest deployment**
3. **Click "Redeploy"**
4. **Check "Clear cache and build artifacts"**
5. **Click "Redeploy"**

### Step 4: Verify Root Directory (After Deployment)

**After deployment starts:**
1. **Go to:** Deployments → Latest
2. **Click on the deployment** to see build logs
3. **Check if it shows:**
   - ✅ "Building in directory: frontend"
   - ✅ "Found frontend/package.json"
   - ❌ If it shows errors about missing directory, continue to Step 5

### Step 5: Alternative - Use Empty Root Directory

**If Vercel still can't find `frontend`:**

**Option A: Move files to root (NOT RECOMMENDED - breaks structure)**

**Option B: Use Vercel CLI to deploy**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

**Option C: Check if Vercel is looking at wrong path**

1. **In Vercel Dashboard → Settings → General**
2. **Check:** "Root Directory" field
3. **Try:** Leave it EMPTY first
4. **Then:** Set it to `frontend` again
5. **Save and redeploy**

---

## 🔍 Troubleshooting

### Check 1: Is frontend in the right branch?

```bash
# Check current branch
git branch --show-current

# Check if frontend exists in main branch
git ls-tree -d origin/main --name-only | grep frontend
```

### Check 2: Is frontend committed?

```bash
# Check if frontend files are in Git
git ls-files frontend/ | head -10
```

### Check 3: Check Vercel Build Logs

**In Vercel Dashboard:**
1. **Deployments → Latest → Build Logs**
2. **Look for:**
   - "Cloning repository..."
   - "Installing dependencies..."
   - "Building..."
3. **Check if it mentions `frontend/` directory**

---

## 🎯 Most Likely Fix

**The most common cause is:**
- Vercel is connected to wrong branch
- OR Root Directory was set before files were pushed

**Try this:**
1. **Set Root Directory to EMPTY** (save)
2. **Redeploy** (to refresh connection)
3. **Set Root Directory back to `frontend`** (save)
4. **Redeploy again**

This forces Vercel to re-scan the repository structure.

---

## ✅ Expected Result

**After fix:**
- ✅ Vercel finds `frontend/` directory
- ✅ Build starts successfully
- ✅ Static files (favicon, etc.) are deployed
- ✅ No "Root Directory does not exist" error

---

## 📋 Quick Checklist

- [ ] Check Vercel is connected to correct repository
- [ ] Check Vercel is using correct branch (`main`)
- [ ] Verify `frontend/` exists in that branch on GitHub
- [ ] Try setting Root Directory to empty, then back to `frontend`
- [ ] Trigger new deployment
- [ ] Check build logs for errors

---

## 🚨 If Still Not Working

**Last resort options:**

1. **Disconnect and reconnect repository in Vercel**
2. **Create a new Vercel project** and connect fresh
3. **Use Vercel CLI** to deploy manually
4. **Check GitHub repository** - verify `frontend/` folder is visible on GitHub web interface

**Check GitHub:**
- Go to: https://github.com/netzorshield/mocxs-ecommerce
- Click on `frontend/` folder
- If you can see it, Vercel should be able to see it too

