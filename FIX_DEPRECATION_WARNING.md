# Fix Next.js Deprecation Warning

## Issue
```
⚠ The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
```

## Solution

The configuration has already been updated in `frontend/next.config.js`. However, Next.js may have cached the old configuration.

### Step 1: Stop the Frontend Server
Press `Ctrl + C` in the terminal where the frontend is running.

### Step 2: Clear Next.js Cache
```powershell
cd D:\MOCXS\frontend
Remove-Item -Recurse -Force .next
```

Or manually delete the `.next` folder in the `frontend` directory.

### Step 3: Restart the Frontend Server
```powershell
cd D:\MOCXS\frontend
npm run dev
```

The warning should now be gone!

## About the 404 Image Errors

The 404 errors for Unsplash images (like `photo-1586350977773-bf3b3f0f6d8d`) are not critical. They occur because:
- Some seed data images use Unsplash URLs that may have expired or don't exist
- This doesn't affect functionality - just means some product images won't display

### To Fix Missing Images:
1. Go to Admin Panel → Products
2. Edit products with missing images
3. Upload new images or use valid image URLs

---

**The deprecation warning will disappear after clearing the cache and restarting!**











