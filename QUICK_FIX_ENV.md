# Quick Fix - Razorpay Error

## 🚨 Error Fixed!

I've updated the code so it won't crash if Razorpay keys are missing. Now you just need to create the `.env` file.

---

## ✅ Quick Fix (2 Minutes)

### Step 1: Create `.env` File

**Option A: Use Setup Script (Easiest)**
```powershell
# Double-click this file:
SETUP_ENV.bat
```
Or right-click `SETUP_ENV.ps1` → Run with PowerShell

**Option B: Manual Creation**
1. Go to `D:\MOCXS\backend` folder
2. Create new file named `.env` (not `.env.txt`)
3. Copy this content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs
JWT_SECRET=my-super-secret-jwt-key-for-mocxs-min-32-characters-long
RAZORPAY_KEY_ID=rzp_test_dummy
RAZORPAY_KEY_SECRET=dummy_secret_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 2: Update Values

**Required:**
- **MONGODB_URI** - Your MongoDB connection string
- **JWT_SECRET** - Any random string (32+ characters)

**Optional (for now):**
- **RAZORPAY_KEY_ID** - Can use `rzp_test_dummy` for testing
- **RAZORPAY_KEY_SECRET** - Can use `dummy_secret_key` for testing

### Step 3: Restart Server

1. Stop current server (Ctrl+C)
2. Run `npm run dev` again
3. Should start without errors! ✅

---

## 🎯 What Changed

The code now:
- ✅ Won't crash if Razorpay keys are missing
- ✅ Shows warning instead of error
- ✅ Server starts successfully
- ✅ Payment features disabled until keys are added

---

## 📝 Get Real Razorpay Keys (Later)

When you're ready to enable payments:

1. Go to: https://razorpay.com/
2. Sign up for free account
3. Go to **Settings** → **API Keys**
4. Click **"Generate Test Keys"**
5. Copy keys to `.env` file
6. Restart server

---

## ✅ Verify It Works

After creating `.env`:

1. Restart server
2. Should see:
   ```
   Server running on port 5000
   MongoDB Connected
   ```
3. No Razorpay errors! ✅

---

**The error is fixed! Just create the `.env` file and restart!** 🎉












