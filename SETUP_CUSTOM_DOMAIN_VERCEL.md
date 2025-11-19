# Setup Custom Domain in Vercel - Complete Guide

## 🎯 Overview

**Setting up a custom domain in Vercel is easy!** Vercel automatically handles SSL certificates and DNS configuration.

---

## 📋 Step-by-Step Instructions

### Step 1: Go to Domain Settings

**In Vercel Dashboard:**
1. **Go to:** Your project
2. **Click:** "Settings" tab
3. **Click:** "Domains" (in the left sidebar or top tabs)

---

### Step 2: Add Your Domain

**In the Domains section:**
1. **Click:** "Add" or "Add Domain" button
2. **Enter your domain:** 
   - For example: `www.mocxs.com` or `mocxs.com`
   - You can add both (with and without www)
3. **Click:** "Add" or "Continue"

---

### Step 3: Choose Domain Configuration

**Vercel will show you options:**

#### Option A: Add Both www and Root Domain (Recommended)

**Add both:**
- `mocxs.com` (root domain)
- `www.mocxs.com` (www subdomain)

**This way:**
- Users can access with or without www
- Both redirect to your site

#### Option B: Add Only One

**If you only want one:**
- Add either `mocxs.com` OR `www.mocxs.com`
- Users must use the exact domain you choose

**Recommended:** Add both for better user experience

---

### Step 4: Get DNS Configuration

**After adding domain, Vercel will show DNS instructions:**

**You'll see something like:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Or:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Vercel will show you the exact records you need!**

---

### Step 5: Update DNS Records

**Go to your domain registrar (where you bought the domain):**

**Common registrars:**
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- AWS Route 53
- etc.

**Steps:**
1. **Log in** to your domain registrar
2. **Go to:** DNS Management or DNS Settings
3. **Find:** DNS Records section
4. **Add/Update records** as shown in Vercel:

**For Root Domain (mocxs.com):**
- **Type:** A or CNAME (Vercel will tell you)
- **Name:** @ or (blank)
- **Value:** The IP or CNAME Vercel provides
- **TTL:** 3600 (or default)

**For www (www.mocxs.com):**
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com` (or what Vercel shows)
- **TTL:** 3600 (or default)

---

### Step 6: Wait for DNS Propagation

**After updating DNS:**
1. **DNS changes take time** to propagate (usually 5 minutes to 48 hours)
2. **Vercel will show status:**
   - ⏳ "Pending" = Waiting for DNS
   - ✅ "Valid" = Domain is connected
   - ❌ "Invalid" = DNS not configured correctly

**You can check status in Vercel Dashboard → Domains**

---

### Step 7: SSL Certificate (Automatic)

**Vercel automatically:**
- ✅ Issues SSL certificate (HTTPS)
- ✅ Renews it automatically
- ✅ Works for both www and root domain

**No action needed!** Just wait for DNS to propagate.

---

## 🔍 Detailed DNS Configuration Examples

### Example 1: Using A Record (Root Domain)

**If Vercel shows A record for root domain:**

**In your DNS provider:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

### Example 2: Using CNAME for Both

**If Vercel shows CNAME for both:**

**For root domain:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**For www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Note:** Some DNS providers don't support CNAME for root domain. In that case, use A record for root and CNAME for www.

---

## 🌐 Common Domain Registrars - Where to Find DNS Settings

### GoDaddy
1. **Log in** to GoDaddy
2. **My Products** → **DNS** → **Manage DNS**
3. **Add/Edit records** as shown in Vercel

### Namecheap
1. **Log in** to Namecheap
2. **Domain List** → Click **Manage** next to your domain
3. **Advanced DNS** tab
4. **Add/Edit records** as shown in Vercel

### Google Domains
1. **Log in** to Google Domains
2. **My domains** → Click your domain
3. **DNS** tab
4. **Add/Edit records** as shown in Vercel

### Cloudflare
1. **Log in** to Cloudflare
2. **Select your domain**
3. **DNS** → **Records**
4. **Add/Edit records** as shown in Vercel

### AWS Route 53
1. **Log in** to AWS Console
2. **Route 53** → **Hosted zones**
3. **Select your domain**
4. **Create record** as shown in Vercel

---

## ✅ Verification Steps

### Step 1: Check DNS Propagation

**Use online tools to check:**
- https://dnschecker.org
- Enter your domain
- Check if DNS records are propagated globally

### Step 2: Check Vercel Status

**In Vercel Dashboard:**
1. **Settings → Domains**
2. **Check status:**
   - ✅ "Valid" = Connected and working
   - ⏳ "Pending" = Still waiting for DNS
   - ❌ "Invalid" = DNS not configured correctly

### Step 3: Test Your Domain

**After DNS propagates:**
1. **Visit:** `https://www.mocxs.com` (or your domain)
2. **Should show:** Your Vercel site
3. **Check SSL:** Should show padlock (HTTPS)

---

## 🚨 Troubleshooting

### Problem: Domain Shows "Invalid" in Vercel

**Solutions:**
1. **Check DNS records** are correct in your registrar
2. **Wait longer** - DNS can take up to 48 hours
3. **Remove old DNS records** that might conflict
4. **Verify** you're using the exact values Vercel provided

### Problem: Domain Not Loading

**Solutions:**
1. **Check DNS propagation:** Use dnschecker.org
2. **Clear browser cache:** Try incognito mode
3. **Check Vercel status:** Make sure deployment is "Ready"
4. **Verify DNS records:** Make sure they match Vercel's instructions

### Problem: SSL Certificate Not Working

**Solutions:**
1. **Wait longer** - SSL is issued after DNS propagates
2. **Check Vercel status** - Should show "Valid" for domain
3. **Vercel handles SSL automatically** - No manual setup needed

---

## 📋 Quick Checklist

**Before starting:**
- [ ] You own the domain
- [ ] You have access to domain registrar
- [ ] You know where DNS settings are

**When adding domain:**
- [ ] Added domain in Vercel Dashboard
- [ ] Got DNS configuration from Vercel
- [ ] Updated DNS records in registrar
- [ ] Waited for DNS propagation
- [ ] Verified domain status in Vercel

**After setup:**
- [ ] Domain shows "Valid" in Vercel
- [ ] Site loads at your custom domain
- [ ] SSL certificate is active (HTTPS)
- [ ] Both www and root domain work (if configured)

---

## 🎯 Summary

**Steps to add custom domain:**
1. **Vercel Dashboard** → Settings → Domains
2. **Add domain:** Enter `mocxs.com` and `www.mocxs.com`
3. **Get DNS configuration** from Vercel
4. **Update DNS records** in your domain registrar
5. **Wait for propagation** (5 min - 48 hours)
6. **Verify** domain shows "Valid" in Vercel

**Vercel automatically:**
- ✅ Issues SSL certificate
- ✅ Handles HTTPS
- ✅ Renews SSL automatically

**That's it!** Your custom domain will be live once DNS propagates. 🚀

---

## 💡 Pro Tips

**For faster DNS propagation:**
- Use Cloudflare DNS (usually faster)
- Set TTL to 3600 (1 hour) before making changes
- Remove old DNS records that might conflict

**For better SEO:**
- Add both www and root domain
- Set up redirect (Vercel can do this automatically)
- Use HTTPS (Vercel handles this automatically)

**To verify everything works:**
- Check: `https://www.mocxs.com`
- Check: `https://mocxs.com` (if you added root domain)
- Both should show your site with SSL padlock ✅

