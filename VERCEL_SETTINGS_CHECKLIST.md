# Vercel Settings Checklist - Fix Favicon 404

## ✅ Your Current Settings

**Root Directory:** `frontend` ✅ (Correct!)

**Other Settings to Check:**

---

## 🔍 Check These Settings

### 1. Build & Development Settings

**In Vercel Dashboard → Settings → General:**

- ✅ **Root Directory:** `frontend` (You have this correct!)
- ⚠️ **Framework Preset:** Should be "Next.js" (auto-detected)
- ⚠️ **Build Command:** Should be `npm run build` (or leave empty for auto)
- ⚠️ **Output Directory:** Should be `.next` (or leave empty for auto)
- ⚠️ **Install Command:** Should be `npm install` (or leave empty for auto)

### 2. Git Settings

**In Vercel Dashboard → Settings → Git:**

- ✅ **Production Branch:** Should be `main`
- ✅ **Auto-deploy:** Should be **Enabled**
- ⚠️ **Skip deployments when there are no changes:** 
  - **Uncheck this** if you want deployments even for small changes
  - **Or keep checked** if you only want deployments when files change

### 3. Environment Variables

**In Vercel Dashboard → Settings → Environment Variables:**

- Check if you have any variables that might affect the build
- Make sure `NEXT_PUBLIC_API_URL` is set correctly

---

## 🚀 Fix Steps

### Step 1: Uncheck "Skip deployments" (Temporarily)

**To test if this is the issue:**
1. Go to Settings → General
2. **Uncheck:** "Skip deployments when there are no changes to the root directory or its dependencies"
3. Save
4. Make a small change and push to Git
5. See if Vercel auto-deploys

### Step 2: Verify Build Command

**Check if build command is correct:**
1. Go to Settings → General
2. Look at "Build Command"
3. Should be: `npm run build` or empty (auto)
4. If wrong, set it to: `npm run build`

### Step 3: Check "Include files outside root directory"

**This setting:**
- ✅ **Check it** if you need files from parent directory
- ❌ **Uncheck it** if you don't (most cases)

**For your setup:** You probably don't need this checked since everything is in `frontend/`

### Step 4: Force Redeploy with Cache Clear

**After checking settings:**
1. Go to Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"
4. **IMPORTANT:** Check "Clear cache and build artifacts"
5. Click "Redeploy"

---

## 🔍 Verify Build Output

**After redeploy, check build logs:**

1. Go to Deployments → Latest
2. Click on the deployment
3. Check "Build Logs"
4. Look for:
   - `Creating an optimized production build`
   - `Copying public files` or similar
   - Should see `favicon.ico` and `icon.png` being copied

**If you see errors:**
- Note the error message
- Check if files are being found
- Verify `public/` directory is being included

---

## 🐛 Common Issues

### Issue 1: Build Command Wrong

**Problem:** Build command not finding Next.js

**Solution:**
- Set Build Command to: `npm run build`
- Or leave empty (Vercel auto-detects Next.js)

### Issue 2: Output Directory Wrong

**Problem:** Vercel looking in wrong place for build output

**Solution:**
- Set Output Directory to: `.next`
- Or leave empty (Vercel auto-detects)

### Issue 3: Files Not in Build

**Problem:** `public/` files not being copied

**Solution:**
- Verify files are in Git: `git ls-files frontend/public/favicon.ico`
- Check build logs for "Copying public files"
- Ensure `.gitignore` doesn't ignore `public/`

### Issue 4: Cache Issues

**Problem:** Old build cached, new files not included

**Solution:**
- Redeploy with "Clear cache and build artifacts" checked
- Wait for build to complete
- Test URLs again

---

## ✅ Verification Steps

After fixing settings and redeploying:

1. **Check Build Logs:**
   - Should see files being copied
   - No errors about missing files

2. **Test URLs:**
   - `https://www.mocxs.com/favicon.ico` → Should return 200 (not 404)
   - `https://www.mocxs.com/icon.png` → Should return 200 (not 404)
   - `https://www.mocxs.com/robots.txt` → Should return 200 (test file)

3. **Check Browser Tab:**
   - Open `https://www.mocxs.com`
   - Favicon should appear in browser tab

4. **Check Page Source:**
   - Right-click → View Page Source
   - Look for: `<link rel="icon" href="/favicon.ico" />`

---

## 📋 Recommended Settings

**For your project, these settings should work:**

```
Root Directory: frontend
Framework Preset: Next.js (auto)
Build Command: (empty - auto)
Output Directory: (empty - auto)
Install Command: (empty - auto)

Production Branch: main
Auto-deploy: Enabled
Skip deployments: (your choice)

Include files outside root: Unchecked
```

---

## 🎯 Next Steps

1. **Check all settings** in Vercel Dashboard
2. **Uncheck "Skip deployments"** temporarily to test
3. **Redeploy with cache clear**
4. **Check build logs** for file copying
5. **Test URLs** after deployment
6. **Verify favicon appears** in browser tab

**If still not working after these steps, check the build logs for specific errors!** 🔍

