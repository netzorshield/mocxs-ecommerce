# Server Not Running - Troubleshooting Guide

## 🔍 Quick Diagnostic Steps

### Step 1: Check Node.js Installation

Open PowerShell and run:
```powershell
node --version
npm --version
```

**Expected:** Version numbers (e.g., `v18.17.0`, `9.6.7`)
**If error:** Node.js is not installed or not in PATH

**Fix:**
1. Install Node.js: https://nodejs.org/
2. Choose LTS version
3. Restart computer
4. Try again

---

### Step 2: Check Current Directory

```powershell
pwd
```

**Expected:** `D:\MOCXS`
**If wrong:** Navigate to project:
```powershell
cd D:\MOCXS
```

---

### Step 3: Check Dependencies

```powershell
Test-Path node_modules
Test-Path frontend\node_modules
Test-Path backend\node_modules
```

**Expected:** All return `True`
**If False:** Install dependencies:
```powershell
npm install
cd frontend
npm install
cd ..\backend
npm install
cd ..
```

---

### Step 4: Check Environment Files

```powershell
Test-Path backend\.env
Test-Path frontend\.env.local
```

**Note:** These are optional for first run, but backend needs `.env` for MongoDB connection

---

### Step 5: Try Running Manually

**Terminal 1 - Backend:**
```powershell
cd D:\MOCXS\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd D:\MOCXS\frontend
npm run dev
```

**What errors do you see?** Write them down!

---

## 🐛 Common Errors & Solutions

### Error 1: "npm is not recognized"

**Problem:** Node.js not installed or not in PATH

**Solution:**
1. Install Node.js from https://nodejs.org/
2. During installation, check "Add to PATH"
3. Restart computer
4. Verify: `npm --version`

---

### Error 2: "Cannot find module"

**Problem:** Dependencies not installed

**Solution:**
```powershell
cd D:\MOCXS
npm install
cd frontend
npm install
cd ..\backend
npm install
```

---

### Error 3: "Port 5000 already in use"

**Problem:** Another program using port 5000

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F
```

---

### Error 4: "Port 3000 already in use"

**Problem:** Another program using port 3000

**Solution:**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID_NUMBER> /F
```

---

### Error 5: "MongoDB connection error"

**Problem:** MongoDB connection string wrong or cluster not running

**Solution:**
1. Check `backend\.env` file exists
2. Verify MongoDB URI is correct
3. Check MongoDB Atlas cluster is running (not paused)
4. Verify IP whitelist includes your IP or `0.0.0.0/0`

---

### Error 6: "concurrently is not recognized"

**Problem:** Root dependencies not installed

**Solution:**
```powershell
cd D:\MOCXS
npm install
```

---

### Error 7: Script runs but nothing happens

**Problem:** Script might be waiting or error is hidden

**Solution:**
1. Run manually in PowerShell (see Step 5 above)
2. Check for error messages
3. Look for red text or error codes

---

### Error 8: "Execution Policy" error (PowerShell)

**Problem:** PowerShell script execution disabled

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Type `Y` and press Enter

---

## 🔧 Alternative: Run Servers Separately

If `npm run dev` doesn't work, run servers separately:

### Window 1 - Backend:
```powershell
cd D:\MOCXS\backend
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB Connected
```

### Window 2 - Frontend:
```powershell
cd D:\MOCXS\frontend
npm run dev
```

**Expected output:**
```
Ready on http://localhost:3000
```

Then open: http://localhost:3000

---

## 📋 Diagnostic Checklist

Run these commands and note the results:

- [ ] `node --version` → Shows version?
- [ ] `npm --version` → Shows version?
- [ ] `cd D:\MOCXS` → Success?
- [ ] `Test-Path node_modules` → True?
- [ ] `Test-Path frontend\node_modules` → True?
- [ ] `Test-Path backend\node_modules` → True?
- [ ] `Test-Path backend\.env` → True or False?
- [ ] `cd backend && npm run dev` → Starts?
- [ ] `cd frontend && npm run dev` → Starts?

---

## 🆘 Still Not Working?

**Please provide:**
1. What command you ran
2. Exact error message (copy/paste)
3. Output of `node --version`
4. Output of `npm --version`
5. Which step failed

Then we can help you specifically!












