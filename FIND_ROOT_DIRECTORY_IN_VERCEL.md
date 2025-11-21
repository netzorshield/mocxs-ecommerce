# How to Find Root Directory in Vercel Dashboard

## 🎯 Where to Look

**You're in the right place!** The Root Directory setting is in **Settings → General**.

---

## 📋 Step-by-Step Navigation

### Step 1: Go to Your Project
1. **Vercel Dashboard** → https://vercel.com
2. **Click on your project** (MOCXS or your project name)

### Step 2: Open Settings
1. **Click "Settings"** tab (at the top, next to "Deployments", "Analytics", etc.)
2. **You should see tabs:** General, Domains, Environment Variables, Git, etc.

### Step 3: Click "General"
1. **Click "General"** (first tab in Settings)
2. **Scroll down** the page

### Step 4: Find "Root Directory"
**Look for a section called:**
- **"Root Directory"** 
- **OR "Build & Development Settings"** (Root Directory is inside this section)

**It should look like this:**
```
┌─────────────────────────────────────┐
│ Root Directory                      │
│ ┌─────────────────────────────────┐ │
│ │ frontend                         │ │  ← This is the field
│ └─────────────────────────────────┘ │
│ [Edit] button                        │
└─────────────────────────────────────┘
```

---

## 🔍 If You Don't See "Root Directory"

**Try these locations:**

### Location 1: In "Build & Development Settings"
1. **Settings → General**
2. **Scroll to "Build & Development Settings"** section
3. **Root Directory** should be inside this section

### Location 2: Check All Sections
**Scroll through the entire General page and look for:**
- Root Directory
- Build & Development Settings
- Framework Settings
- Project Settings

### Location 3: It Might Be Hidden
**If you still can't find it:**
1. **Try clicking "Edit"** on any setting
2. **Sometimes Root Directory appears when editing other settings**

---

## 📸 What Each Section Looks Like

### "Deploy Hooks" Section (What You're Seeing)
```
Deploy Hooks
┌─────────────────────────────────────┐
│ Deploy hooks are unique URLs...     │
│ This project does not have any...   │
└─────────────────────────────────────┘
```
**This is NOT where Root Directory is!** Keep scrolling down.

### "Root Directory" Section (What You Need)
```
Root Directory
┌─────────────────────────────────────┐
│ The directory within your project,  │
│ where your code is located.         │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ frontend                         │ │  ← Edit this
│ └─────────────────────────────────┘ │
│                                     │
│ [Edit] button                        │
└─────────────────────────────────────┘
```

---

## ✅ What to Do When You Find It

**If Root Directory field shows:**
- ✅ `frontend` → **It's correct!** But Vercel still can't find it, so try the fix below
- ❌ Empty/blank → **This is the problem!** Set it to `frontend`
- ❌ `/` → **Wrong!** Set it to `frontend`

**To fix:**
1. **Click "Edit"** button
2. **Type exactly:** `frontend` (no slashes, no spaces)
3. **Click "Save"**
4. **Redeploy when prompted**

---

## 🚨 If You Still Can't Find It

**Alternative: Use Vercel CLI**

If you can't find the setting in the dashboard, we can set it via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (from root directory)
vercel link

# This will prompt you to set Root Directory
```

**OR: Check if it's in a different project**

1. **Make sure you're in the correct Vercel project**
2. **Check project name** matches your repository
3. **If you have multiple projects**, make sure you're in the right one

---

## 📋 Quick Checklist

- [ ] I'm in Settings → General
- [ ] I've scrolled through the entire page
- [ ] I've looked in "Build & Development Settings" section
- [ ] I've checked if there's an "Edit" button that reveals more settings
- [ ] I've verified I'm in the correct Vercel project

---

## 🎯 Next Steps

**Once you find Root Directory:**
1. **Check the value** (should be `frontend`)
2. **If wrong, fix it** (set to `frontend`)
3. **Save and redeploy**
4. **Check if Vercel now finds the directory**

**If you still can't find it, tell me:**
- What sections you DO see in Settings → General
- What the page looks like
- Any error messages




