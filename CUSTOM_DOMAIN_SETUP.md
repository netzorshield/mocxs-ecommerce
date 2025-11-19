# Custom Domain Setup Guide - Hostinger

This guide will help you connect your MOCXS e-commerce site to a custom domain hosted on Hostinger.

## Prerequisites

- ✅ Domain registered with Hostinger
- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Railway
- ✅ Domain DNS access in Hostinger

## Step 1: Configure Domain in Vercel (Frontend)

### 1.1 Add Domain to Vercel Project

1. Go to: https://vercel.com/netzors-projects/frontend/settings/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `mocxs.com` or `www.mocxs.com`)
4. Click "Add"

### 1.2 Vercel will show DNS records needed

Vercel will display DNS records you need to add. You'll see something like:
- **Type A**: `76.76.21.21` (or similar IP)
- **Type CNAME**: `cname.vercel-dns.com` (for www subdomain)

**Note these down** - you'll need them in Step 2.

## Step 2: Configure DNS in Hostinger

### 2.1 Access DNS Management

1. Log in to Hostinger hPanel
2. Go to **Domains** → **Your Domain** → **DNS / Name Servers**
3. Click **Manage DNS**

### 2.2 Add DNS Records

Add the following records (use the values Vercel provided):

#### For Root Domain (mocxs.com):

**Option A: Using A Record (Recommended)**
- **Type**: A
- **Name**: @ (or leave blank)
- **Value**: IP address from Vercel (e.g., `76.76.21.21`)
- **TTL**: 3600 (or default)

**Option B: Using CNAME (Alternative)**
- **Type**: CNAME
- **Name**: @
- **Value**: `cname.vercel-dns.com`
- **TTL**: 3600

#### For WWW Subdomain (www.mocxs.com):

- **Type**: CNAME
- **Name**: www
- **Value**: `cname.vercel-dns.com`
- **TTL**: 3600

### 2.3 Save DNS Records

Click "Save" or "Add Record" after each entry.

## Step 3: Update Environment Variables

### 3.1 Update Frontend (Vercel)

1. Go to: https://vercel.com/netzors-projects/frontend/settings/environment-variables
2. Update or add:
   - `NEXT_PUBLIC_API_URL` = `https://mocxs-ecommerce-production.up.railway.app/api`
   - (Keep this as is - backend URL doesn't change)

### 3.2 Update Backend (Railway)

1. Go to Railway → Your backend project → Variables
2. Update `FRONTEND_URL` to include your custom domain:
   ```
   https://mocxs.com,https://www.mocxs.com,https://frontend-hkg46s4eg-netzors-projects.vercel.app
   ```
   (Keep the Vercel URL as backup, add your custom domains)

3. **Important**: Keep all other variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `RAZORPAY_KEY_ID` (if set)
   - `RAZORPAY_KEY_SECRET` (if set)

## Step 4: Wait for DNS Propagation

DNS changes can take:
- **Minimum**: 5-10 minutes
- **Average**: 1-2 hours
- **Maximum**: 24-48 hours

### Check DNS Propagation:

Use these tools to verify:
- https://dnschecker.org
- https://www.whatsmydns.net

Enter your domain and check if it points to Vercel's IP.

## Step 5: Verify SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. This usually happens automatically within a few minutes after DNS propagates.

1. Go to Vercel → Your project → Settings → Domains
2. Wait for "Valid Configuration" status
3. SSL certificate will be issued automatically

## Step 6: Test Your Site

1. Visit: `https://yourdomain.com` (or `https://www.yourdomain.com`)
2. Test:
   - Homepage loads
   - Products page works
   - Login works
   - Admin panel accessible

## Step 7: Update Any Hardcoded URLs (Optional)

If you have any hardcoded URLs in your code, update them:
- Email templates
- Social media links
- API documentation

## Troubleshooting

### Domain Not Resolving

1. **Check DNS Records**: Verify records are correct in Hostinger
2. **Wait Longer**: DNS can take up to 48 hours
3. **Clear DNS Cache**: 
   - Windows: `ipconfig /flushdns`
   - Mac/Linux: `sudo dscacheutil -flushcache`

### SSL Certificate Not Issuing

1. **Wait**: Can take up to 24 hours
2. **Check DNS**: Ensure DNS is fully propagated
3. **Contact Vercel Support**: If still not working after 24 hours

### CORS Errors

1. **Update Backend**: Make sure `FRONTEND_URL` in Railway includes your custom domain
2. **Redeploy Backend**: Railway should auto-restart after variable change

### Site Shows "Invalid Host Header"

1. **Check Vercel Settings**: Ensure domain is properly added
2. **Wait for DNS**: DNS might not be fully propagated

## Important Notes

1. **Keep Vercel URL**: Don't remove the Vercel URL (`frontend-*.vercel.app`) - it's useful as a backup
2. **HTTPS Only**: Always use `https://` in your URLs
3. **WWW vs Non-WWW**: Choose one as primary and redirect the other
4. **Backend URL**: Your backend stays on Railway - no need to change it

## Next Steps After Setup

1. ✅ Test all functionality
2. ✅ Update any documentation with new domain
3. ✅ Set up email (if needed) with your domain
4. ✅ Configure Google Analytics (if using)
5. ✅ Submit sitemap to search engines

## Support

If you encounter issues:
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **Hostinger Support**: Check Hostinger help center
- **DNS Issues**: Use DNS checker tools mentioned above


