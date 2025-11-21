# Where is Root Directory in Vercel? (Visual Guide)

## 🎯 You're Looking at "Deploy Hooks" - Keep Scrolling!

**You found:** Settings → General → "Deploy Hooks" section ✅

**What you need:** "Root Directory" section (keep scrolling down!)

---

## 📋 Exact Navigation Path

### Current Location:
```
Vercel Dashboard
  → Your Project (mocxs-ecommerce)
    → Settings (top tab)
      → General (first tab)
        → [You are here] "Deploy Hooks" section
```

### Where to Go:
```
Vercel Dashboard
  → Your Project
    → Settings
      → General
        → [Scroll down past Deploy Hooks]
        → "Root Directory" section ← YOU NEED THIS!
```

---

## 🔍 What to Look For

**After "Deploy Hooks" section, keep scrolling down. You should see:**

### Option 1: "Root Directory" as a Standalone Section
```
┌─────────────────────────────────────────┐
│ Root Directory                           │
│                                         │
│ The directory within your project,      │
│ where your code is located. Leave this │
│ field empty if your code is not        │
│ located in a subdirectory.             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ frontend                             │ │ ← This field
│ └─────────────────────────────────────┘ │
│                                         │
│ [Edit] button                           │
│                                         │
│ Include files outside the root          │
│ directory in the Build Step.            │
│ ☐ (checkbox)                           │
└─────────────────────────────────────────┘
```

### Option 2: Inside "Build & Development Settings"
```
┌─────────────────────────────────────────┐
│ Build & Development Settings            │
│                                         │
│ Framework Preset: Next.js              │
│                                         │
│ Root Directory                          │
│ ┌─────────────────────────────────────┐ │
│ │ frontend                             │ │ ← This field
│ └─────────────────────────────────────┘ │
│                                         │
│ Build Command: npm run build            │
│ Output Directory: .next                │
│ Install Command: npm install            │
└─────────────────────────────────────────┘
```

---

## ✅ Step-by-Step Instructions

1. **You're already in:** Settings → General ✅
2. **You see:** "Deploy Hooks" section ✅
3. **Now:** **Scroll down** past Deploy Hooks
4. **Look for:** "Root Directory" section
5. **If you don't see it:** Keep scrolling - it's further down!

---

## 🚨 If You Still Can't Find It

### Try This:

**Method 1: Use Browser Search**
1. **Press `Ctrl+F`** (or `Cmd+F` on Mac)
2. **Type:** `Root Directory`
3. **Press Enter** to find it on the page

**Method 2: Check All Tabs**
**In Settings, check these tabs:**
- ✅ General (most likely here)
- ⚠️ Git (might be here)
- ⚠️ Build & Development Settings (if it's a separate tab)

**Method 3: Check Project Settings**
1. **Click on your project name** (top left)
2. **Look for project-level settings**
3. **Root Directory might be there**

---

## 📸 What It Looks Like When You Find It

**The Root Directory field should show one of these:**

✅ **Correct:**
```
frontend
```

❌ **Wrong (Empty):**
```
(empty/blank)
```

❌ **Wrong (Root):**
```
/
```

---

## 🎯 What to Do When You Find It

**If it's empty or wrong:**
1. **Click "Edit"** button
2. **Type exactly:** `frontend` (no slashes!)
3. **Click "Save"**
4. **Vercel will ask to redeploy** - click "Redeploy"

**If it already says `frontend`:**
- The setting is correct, but Vercel still can't find it
- Try clearing it, saving, then setting it back to `frontend`
- This forces Vercel to re-scan the repository

---

## 🔍 Alternative: Check via Vercel CLI

**If you can't find it in the dashboard, use CLI:**

```bash
# From your project root
cd b:\MOCXS

# Install Vercel CLI (if not installed)
npm i -g vercel

# Link to your project
vercel link

# This will show current settings and let you change Root Directory
```

---

## 📋 Quick Checklist

- [ ] I'm in Settings → General
- [ ] I've scrolled past "Deploy Hooks"
- [ ] I've used Ctrl+F to search for "Root Directory"
- [ ] I've checked all sections on the General page
- [ ] I've checked if there's a "Build & Development Settings" section

---

## 🎯 Tell Me What You See

**After scrolling down past "Deploy Hooks", what sections do you see?**

Common sections you might see:
- Project Name
- Root Directory ← **This is what we need!**
- Build & Development Settings
- Framework Preset
- Environment Variables
- Git Repository
- Deploy Hooks (you already found this)

**List all the sections you see, and I'll help you find Root Directory!**




