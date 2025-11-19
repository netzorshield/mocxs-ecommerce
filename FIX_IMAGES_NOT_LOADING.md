# Fix Images Not Loading - Debugging Guide

## 🔍 Step 1: Check Browser Console

**After redeploy, open your site and:**

1. **Press F12** to open DevTools
2. **Go to Console tab**
3. **Reload the page**
4. **Look for messages like:**
   - `getImageUrl: Converted /uploads/ path` - Shows what URL is being generated
   - `Image failed to load:` - Shows which images are failing
   - `Image loaded successfully:` - Shows which images work

**This will tell us:**
- What URLs are being generated
- Which images are failing
- Why they're failing

---

## 🔍 Step 2: Check Network Tab

**In DevTools:**
1. **Go to Network tab**
2. **Filter by "Img"** (images)
3. **Reload page**
4. **Check each image request:**
   - **Status:** 200 = success, 404 = not found, CORS = blocked
   - **URL:** What URL is being requested
   - **Error:** Any error messages

**Common issues:**
- **404 Not Found** = Image doesn't exist on Railway
- **CORS error** = Railway not allowing requests from your domain
- **Mixed content** = HTTP image on HTTPS page

---

## 🔍 Step 3: Check Environment Variable

**In browser console, type:**
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

**Should show:**
- `https://mocxs-ecommerce-production.up.railway.app/api`

**If it shows:**
- `undefined` = Environment variable not set
- `http://...` = Wrong protocol (should be HTTPS)

---

## 🔍 Step 4: Test Image URL Directly

**Get an image URL from console logs, then:**
1. **Copy the URL** from console
2. **Paste in browser address bar**
3. **Press Enter**

**If it loads:**
- ✅ Image exists, but something else is wrong

**If it shows 404:**
- ❌ Image doesn't exist on Railway (lost due to ephemeral filesystem)

---

## 🚨 Most Likely Issues

### Issue 1: Images Don't Exist on Railway

**Railway's filesystem is ephemeral:**
- Images are lost when Railway redeploys
- Database still has URLs, but files are gone
- **Solution:** Re-upload images through admin panel

### Issue 2: Environment Variable Not Set

**If `NEXT_PUBLIC_API_URL` is undefined:**
- Images can't be converted to full URLs
- **Solution:** Add environment variable in Vercel

### Issue 3: Wrong URL Format in Database

**Images might be stored as:**
- Full Railway URLs (should work)
- Relative paths like `/uploads/...` (needs conversion)
- Wrong format (won't work)

---

## ✅ Quick Fixes

### Fix 1: Re-upload Images

**If images don't exist on Railway:**
1. **Go to Admin Panel**
2. **Edit each product**
3. **Re-upload images**
4. **Save**

**This will:**
- Upload images to Railway
- Update database with new URLs
- Images should load

### Fix 2: Check Environment Variable

**In Vercel Dashboard:**
1. **Settings → Environment Variables**
2. **Check:** `NEXT_PUBLIC_API_URL`
3. **Should be:** `https://mocxs-ecommerce-production.up.railway.app/api`
4. **If missing or wrong:** Add/update it
5. **Redeploy**

### Fix 3: Check What URLs Are in Database

**The console logs will show:**
- Original image path from database
- Converted URL being used

**If original is wrong format:**
- Need to fix database entries
- Or re-upload images

---

## 📋 What to Tell Me

**After checking console, tell me:**
1. **What do console logs show?** (copy the messages)
2. **What URLs are being generated?** (from console logs)
3. **What errors in Network tab?** (404, CORS, etc.)
4. **Does `NEXT_PUBLIC_API_URL` show in console?** (what value?)

**This will help me identify the exact issue!**

---

## 🎯 Next Steps

1. **Redeploy** (code with debug logging is pushed)
2. **Open site** and check console
3. **Share console logs** with me
4. **I'll provide specific fix** based on what we find

**The debug logging will show us exactly what's wrong!**

