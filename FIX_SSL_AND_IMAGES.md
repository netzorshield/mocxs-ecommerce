# Fix SSL Certificate and Image Loading Issues

## 🚨 Problems

1. **SSL certificate not issued** for custom domain
2. **No images loading** on products page

---

## 🔒 Part 1: Fix SSL Certificate

### Step 1: Check DNS Configuration

**SSL certificate won't issue if DNS isn't properly configured.**

**Verify DNS is correct:**
1. **Go to:** https://dnschecker.org
2. **Enter your domain:** `mocxs.com` or `www.mocxs.com`
3. **Check if DNS records are propagated globally**

**If DNS isn't propagated:**
- Wait longer (can take up to 48 hours)
- Check DNS records in your registrar match Vercel's instructions

---

### Step 2: Check Domain Status in Vercel

**In Vercel Dashboard:**
1. **Settings → Domains**
2. **Check domain status:**
   - ✅ "Valid Configuration" = DNS is correct, SSL should issue soon
   - ⏳ "Pending" = Waiting for DNS propagation
   - ❌ "Invalid Configuration" = DNS records are wrong

**If "Invalid Configuration":**
- Check DNS records match Vercel's instructions exactly
- Remove conflicting DNS records
- Wait for DNS to propagate

---

### Step 3: Force SSL Certificate Issue

**If DNS is valid but SSL still not issued:**

1. **Remove domain from Vercel:**
   - Settings → Domains
   - Click "..." on your domain
   - Click "Remove"

2. **Wait 5 minutes**

3. **Add domain again:**
   - Click "Add Domain"
   - Enter your domain
   - This forces Vercel to re-check and issue SSL

---

### Step 4: Wait for SSL

**SSL certificate issuance:**
- Usually happens within **5-30 minutes** after DNS is valid
- Can take up to **24 hours** in rare cases
- Vercel uses Let's Encrypt (automatic)

**Check SSL status:**
- Visit: `https://www.mocxs.com`
- If you see a padlock = SSL is active ✅
- If you see "Not Secure" = SSL not issued yet ⏳

---

## 🖼️ Part 2: Fix Image Loading

### Problem: Mixed Content (HTTP images on HTTPS page)

**If your site is HTTPS but images are HTTP, browsers block them!**

**Check:**
1. **Open browser console** (F12)
2. **Look for errors like:**
   - "Mixed Content: The page was loaded over HTTPS, but requested an insecure image"
   - "Blocked loading mixed active content"

**This happens when:**
- Site is `https://www.mocxs.com` (HTTPS)
- But images are `http://railway.app/uploads/...` (HTTP)
- Browser blocks HTTP content on HTTPS pages

---

### Solution 1: Ensure Images Use HTTPS

**Check your environment variable:**

**In Vercel Dashboard:**
1. **Settings → Environment Variables**
2. **Check:** `NEXT_PUBLIC_API_URL`
3. **Should be:** `https://mocxs-ecommerce-production.up.railway.app/api`
4. **NOT:** `http://...` (must be HTTPS!)

**If it's HTTP, update it:**
- Change to HTTPS
- Redeploy

---

### Solution 2: Update getImageUrl Function

**The function should force HTTPS for production:**

Let me update the function to ensure HTTPS is used.

---

### Solution 3: Check Railway Backend

**Make sure Railway backend serves images over HTTPS:**

1. **Check Railway URL:**
   - Should be: `https://mocxs-ecommerce-production.up.railway.app`
   - NOT: `http://...`

2. **Test image URL directly:**
   - Visit: `https://mocxs-ecommerce-production.up.railway.app/uploads/products/[some-image].jpg`
   - Should load (not 404, not blocked)

---

### Solution 4: Use Regular img Tag (Temporary Fix)

**If Next.js Image component is causing issues, we can use regular img tag:**

This bypasses Next.js image optimization which might be causing problems.

---

## 🔧 Quick Fixes

### Fix 1: Update Environment Variable

**In Vercel Dashboard:**
1. **Settings → Environment Variables**
2. **Find:** `NEXT_PUBLIC_API_URL`
3. **Update to:** `https://mocxs-ecommerce-production.up.railway.app/api`
4. **Make sure it's HTTPS!**
5. **Save and redeploy**

### Fix 2: Check Browser Console

**Open your site and check console:**
1. **Press F12** to open DevTools
2. **Go to Console tab**
3. **Look for errors:**
   - Mixed content errors
   - CORS errors
   - 404 errors for images

**Share the errors you see** - this will help identify the exact issue.

---

## ✅ Checklist

**For SSL:**
- [ ] DNS records are correct in registrar
- [ ] DNS is propagated (check dnschecker.org)
- [ ] Domain shows "Valid Configuration" in Vercel
- [ ] Waited at least 30 minutes after DNS is valid
- [ ] Tried removing and re-adding domain

**For Images:**
- [ ] `NEXT_PUBLIC_API_URL` uses HTTPS (not HTTP)
- [ ] Railway backend URL is HTTPS
- [ ] Checked browser console for errors
- [ ] Images are accessible directly from Railway URL

---

## 🎯 Most Likely Issues

**SSL Certificate:**
- DNS not fully propagated → Wait longer
- DNS records incorrect → Fix DNS records
- Domain not properly added → Re-add domain

**Images Not Loading:**
- Mixed content (HTTP images on HTTPS page) → Use HTTPS for API URL
- Images don't exist on Railway → Upload images again
- CORS issues → Check Railway CORS settings
- Next.js Image optimization failing → Use unoptimized or regular img tag

---

## 🚀 Next Steps

1. **Check SSL:** Verify DNS is correct and wait for SSL
2. **Check Images:** Verify `NEXT_PUBLIC_API_URL` is HTTPS
3. **Check Console:** Look for specific errors
4. **Test Directly:** Try accessing image URLs directly

**Let me know what errors you see in the browser console, and I'll provide specific fixes!**

