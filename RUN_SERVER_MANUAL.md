# Manual Server Start - Step by Step

If scripts don't work, run servers manually:

## 🎯 Method: Two Separate Windows

### Window 1: Backend Server

1. **Open PowerShell**
   - Press `Win + X`
   - Click "Windows PowerShell" or "Terminal"

2. **Navigate to backend:**
   ```powershell
   cd D:\MOCXS\backend
   ```

3. **Start backend:**
   ```powershell
   npm run dev
   ```

4. **Expected output:**
   ```
   Server running on port 5000
   MongoDB Connected
   ```

5. **Keep this window open!**

---

### Window 2: Frontend Server

1. **Open another PowerShell window**
   - Press `Win + X` again
   - Click "Windows PowerShell" or "Terminal"

2. **Navigate to frontend:**
   ```powershell
   cd D:\MOCXS\frontend
   ```

3. **Start frontend:**
   ```powershell
   npm run dev
   ```

4. **Expected output:**
   ```
   Ready on http://localhost:3000
   ```

5. **Keep this window open!**

---

### Step 3: Open Browser

1. Open Chrome, Edge, or Firefox
2. Go to: **http://localhost:3000**
3. Website should load!

---

## 🔍 If Backend Fails

**Error: "Cannot find module"**
```powershell
cd D:\MOCXS\backend
npm install
npm run dev
```

**Error: "MongoDB connection error"**
- Check `backend\.env` file exists
- Verify MongoDB URI is correct
- Check MongoDB Atlas cluster is running

**Error: "Port 5000 already in use"**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

---

## 🔍 If Frontend Fails

**Error: "Cannot find module"**
```powershell
cd D:\MOCXS\frontend
npm install
npm run dev
```

**Error: "Port 3000 already in use"**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Error: "Cannot connect to backend"**
- Make sure backend is running first
- Check `frontend\.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

---

## ✅ Success Indicators

**Backend is running when you see:**
- ✅ "Server running on port 5000"
- ✅ "MongoDB Connected" (if MongoDB configured)

**Frontend is running when you see:**
- ✅ "Ready on http://localhost:3000"
- ✅ No red error messages

**Website works when:**
- ✅ Browser loads http://localhost:3000
- ✅ You see MOCXS homepage
- ✅ Can navigate pages

---

## 🛑 To Stop Servers

1. Go to each PowerShell window
2. Press `Ctrl + C`
3. Type `Y` and press Enter
4. Window closes

---

**This method always works if Node.js is installed!** 🚀












