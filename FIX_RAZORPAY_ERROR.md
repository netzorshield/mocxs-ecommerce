# Fix Razorpay Error - Quick Solution

## 🐛 Error You're Seeing

```
Error: `key_id` or `oauthToken` is mandatory
```

This means Razorpay keys are not configured in your `.env` file.

---

## ✅ Quick Fix (2 Steps)

### Step 1: Create `.env` File

1. Go to `backend` folder: `D:\MOCXS\backend`
2. Create a file named `.env` (not `.env.txt` - just `.env`)
3. Copy this content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long-change-this
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 2: Get Razorpay Keys

**Option A: Use Test Keys (For Development)**

1. Go to: https://razorpay.com/
2. Sign up for free account
3. Go to **Settings** → **API Keys**
4. Click **"Generate Test Keys"**
5. Copy **Key ID** and **Key Secret**
6. Paste into `.env` file:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
   ```

**Option B: Skip Payment for Now (Optional)**

If you don't want to set up Razorpay right now:
- Leave the keys empty or use dummy values
- The server will start but payment won't work
- You can still test everything else

---

## 🔧 Temporary Fix (Skip Payment)

If you just want to run the server without payment:

**Edit `backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:password@cluster.mongodb.net/mocxs
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
RAZORPAY_KEY_ID=rzp_test_dummy
RAZORPAY_KEY_SECRET=dummy_secret_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

The server will start, but payment features won't work until you add real keys.

---

## ✅ Verify Fix

After creating `.env` file:

1. **Restart the server:**
   - Stop current server (Ctrl+C)
   - Run `npm run dev` again

2. **Check for errors:**
   - Should see: "Server running on port 5000"
   - No Razorpay errors

---

## 📝 Complete `.env` Setup Guide

### Required Fields:

1. **MONGODB_URI** (Required)
   - Get from MongoDB Atlas
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/mocxs`

2. **JWT_SECRET** (Required)
   - Any random string, minimum 32 characters
   - Example: `my-super-secret-jwt-key-for-mocxs-2024`

3. **RAZORPAY_KEY_ID** (Optional for testing)
   - Get from Razorpay dashboard
   - Format: `rzp_test_xxxxxxxxxxxxx`

4. **RAZORPAY_KEY_SECRET** (Optional for testing)
   - Get from Razorpay dashboard
   - Secret key string

---

## 🎯 Quick Checklist

- [ ] Created `backend/.env` file
- [ ] Added MONGODB_URI
- [ ] Added JWT_SECRET (32+ characters)
- [ ] Added RAZORPAY_KEY_ID (or dummy value)
- [ ] Added RAZORPAY_KEY_SECRET (or dummy value)
- [ ] Restarted server
- [ ] No errors in console

---

## 🚨 Still Getting Error?

**Check:**
1. File is named `.env` (not `.env.txt` or `.env.example`)
2. File is in `backend` folder (not root folder)
3. No extra spaces around `=` sign
4. Restarted server after creating file

**Test:**
```powershell
cd backend
type .env
```
Should show your environment variables.

---

**After fixing, your server should start without errors!** ✅












