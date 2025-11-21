# How to Verify Root Directory in Vercel

## 📋 Step-by-Step Instructions

### Step 1: Go to Vercel Dashboard

1. **Open your browser**
2. **Go to:** https://vercel.com
3. **Log in** to your Vercel account
4. **Select your project** (MOCXS or your project name)

---

### Step 2: Navigate to Settings

1. **Click on your project** (if not already selected)
2. **Click on "Settings"** tab (at the top of the page)
3. **You should see:** General, Domains, Environment Variables, etc.

---

### Step 3: Check General Settings

1. **Click on "General"** (first option in Settings)
2. **Scroll down** to find "Root Directory" section
3. **Look for the field labeled "Root Directory"**

---

### Step 4: Verify Root Directory Value

**The Root Directory field should show:**
```
frontend
```

**It should be:**
- ✅ Exactly: `frontend` (lowercase, no spaces)
- ✅ NOT: `/frontend` (no leading slash)
- ✅ NOT: `./frontend` (no `./`)
- ✅ NOT: `frontend/` (no trailing slash)
- ✅ NOT: empty (should have a value)
- ✅ NOT: `/` (should not be root)

---

### Step 5: If It's Wrong, Fix It

**If Root Directory is wrong:**

1. **Click "Edit"** button next to Root Directory
2. **Type exactly:** `frontend`
3. **Click "Save"**
4. **Vercel will ask to redeploy** - click "Redeploy"

---

## 🎯 Visual Guide

**What you should see:**

```
Settings → General

Root Directory
┌─────────────────────────────┐
│ frontend                     │  ← Should say exactly this
└─────────────────────────────┘
[Edit] button
```

**If it looks like this, it's correct:**
- ✅ `frontend` (exactly, no slashes, no spaces)

**If it looks like any of these, it's wrong:**
- ❌ `/` (root)
- ❌ Empty (blank)
- ❌ `/frontend`
- ❌ `./frontend`
- ❌ `frontend/`

---

## 🔍 Alternative: Check in Project Settings

**If you can't find it in General settings:**

1. **Go to:** Project → Settings
2. **Look for:** "Build & Development Settings"
3. **Find:** "Root Directory" field
4. **Should show:** `frontend`

---

## ✅ Quick Verification Checklist

- [ ] Root Directory field exists
- [ ] Value is exactly: `frontend`
- [ ] No leading slash (`/frontend`)
- [ ] No trailing slash (`frontend/`)
- [ ] No `./` prefix (`./frontend`)
- [ ] Not empty
- [ ] Not set to `/` (root)

---

## 🚨 If Root Directory is Wrong

**After fixing:**

1. **Save the changes**
2. **Vercel will prompt to redeploy** - click "Redeploy"
3. **Or manually redeploy:**
   - Go to Deployments
   - Click "..." on latest
   - Click "Redeploy"
   - Check "Clear cache and build artifacts"
   - Redeploy

---

## 📝 Why This Matters

**If Root Directory is wrong:**
- Vercel won't find your `package.json`
- Vercel won't find your `public/` directory
- Build will fail or files won't be included
- Static files won't be deployed

**If Root Directory is correct:**
- Vercel finds everything in `frontend/` directory
- `public/` files are included in deployment
- Build works correctly
- Static files are accessible

---

## 🎯 Summary

**To verify:**
1. Vercel Dashboard → Your Project
2. Settings → General
3. Look for "Root Directory"
4. Should be exactly: `frontend`

**If wrong, fix it and redeploy!** ✅




