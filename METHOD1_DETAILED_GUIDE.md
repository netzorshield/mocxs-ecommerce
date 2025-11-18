# Method 1: Quick Start Scripts - Detailed Guide

## 📋 Overview

Method 1 uses pre-made scripts that automatically:
1. Check if Node.js is installed
2. Install dependencies if needed
3. Start both backend and frontend servers
4. Open the website in your browser

## 🎯 Step-by-Step Instructions

### Option A: Using Batch File (.bat)

#### Step 1: Locate the File
- Navigate to your project folder: `D:\MOCXS`
- Find the file: `START_LOCALHOST.bat`
- It should look like a gear icon or a Windows batch file

#### Step 2: Run the File
**Method A1: Double-Click**
- Simply **double-click** `START_LOCALHOST.bat`
- A black Command Prompt window will open

**Method A2: Right-Click**
- **Right-click** `START_LOCALHOST.bat`
- Select **"Run as administrator"** (if needed)

#### Step 3: What Happens
The script will:
1. ✅ Check if Node.js is installed
   - If not installed: Shows error and instructions
   - If installed: Shows version numbers

2. ✅ Check if dependencies are installed
   - If `node_modules` folders don't exist: Automatically installs them
   - This may take 2-5 minutes the first time

3. ✅ Start the servers
   - Backend starts on port 5000
   - Frontend starts on port 3000

#### Step 4: What You'll See
```
========================================
  Starting MOCXS Website on localhost:3000
========================================

[OK] Node.js found
v18.17.0
9.6.7

========================================
  Starting servers...
========================================

Backend:  http://localhost:5000
Frontend: http://localhost:3000  <-- OPEN THIS IN BROWSER

Press Ctrl+C to stop servers

[0] Server running on port 5000
[1] Ready on http://localhost:3000
```

#### Step 5: Open Your Browser
- The script will keep running (don't close the window!)
- Open your web browser (Chrome, Edge, Firefox, etc.)
- Type in address bar: `http://localhost:3000`
- Press Enter
- **Your website should load!** 🎉

#### Step 6: Stop the Servers
- When you're done, go back to the Command Prompt window
- Press **Ctrl + C**
- Press **Y** and Enter to confirm
- The window will close

---

### Option B: Using PowerShell Script (.ps1) - RECOMMENDED

#### Step 1: Locate the File
- Navigate to: `D:\MOCXS`
- Find: `START_LOCALHOST.ps1`
- It should have a PowerShell icon

#### Step 2: Run the File
**Method B1: Right-Click**
- **Right-click** `START_LOCALHOST.ps1`
- Select **"Run with PowerShell"**
- If you see a security warning, click **"Run"** or **"Yes"**

**Method B2: From PowerShell**
- Open PowerShell
- Navigate to project: `cd D:\MOCXS`
- Run: `.\START_LOCALHOST.ps1`

#### Step 3: Handle Execution Policy (If Needed)
If you see this error:
```
cannot be loaded because running scripts is disabled on this system
```

**Fix it:**
1. Open PowerShell as Administrator:
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. Run this command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Type `Y` and press Enter

4. Try running the script again

#### Step 4: What Happens
The PowerShell script will:
1. ✅ Check Node.js installation
2. ✅ Install dependencies automatically
3. ✅ Start both servers
4. ✅ **Automatically open your browser** to http://localhost:3000
   - This happens after 3 seconds!

#### Step 5: What You'll See
```
========================================
  Starting MOCXS Website
  http://localhost:3000
========================================

[OK] Node.js: v18.17.0
[OK] npm: 9.6.7

Installing dependencies...
Installing frontend dependencies...
Installing backend dependencies...

========================================
  Starting Servers...
========================================

Backend:  http://localhost:5000
Frontend: http://localhost:3000

Opening browser in 3 seconds...
Press Ctrl+C to stop servers

[0] Server running on port 5000
[1] Ready on http://localhost:3000
```

**Your browser will automatically open!** 🌐

#### Step 6: Stop the Servers
- Press **Ctrl + C** in the PowerShell window
- Type `Y` and press Enter

---

## 🔧 Troubleshooting Method 1

### Problem 1: "Node.js is not installed"

**Symptoms:**
```
[ERROR] Node.js is not installed!
Please install Node.js from: https://nodejs.org/
```

**Solution:**
1. Go to: https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. **Restart your computer** (important!)
5. Try running the script again

**Verify installation:**
- Open PowerShell
- Type: `node --version`
- Should show: `v18.x.x` or higher

### Problem 2: "Execution Policy" Error (PowerShell Only)

**Symptoms:**
```
cannot be loaded because running scripts is disabled
```

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then type `Y` and press Enter.

### Problem 3: Script Closes Immediately

**Symptoms:**
- Window opens and closes instantly
- Can't see any errors

**Solution:**
1. Open PowerShell manually
2. Navigate to project: `cd D:\MOCXS`
3. Run: `.\START_LOCALHOST.bat` or `.\START_LOCALHOST.ps1`
4. Now you'll see the errors

### Problem 4: "Port 3000 already in use"

**Symptoms:**
```
Error: Port 3000 is already in use
```

**Solution:**
1. Find what's using port 3000:
   ```powershell
   netstat -ano | findstr :3000
   ```
2. Note the PID number (last column)
3. Kill the process:
   ```powershell
   taskkill /PID <PID_NUMBER> /F
   ```
4. Run the script again

### Problem 5: Dependencies Won't Install

**Symptoms:**
- Script hangs on "Installing dependencies..."
- Shows npm errors

**Solution:**
1. Close the script (Ctrl+C)
2. Clear npm cache:
   ```powershell
   npm cache clean --force
   ```
3. Delete node_modules folders:
   ```powershell
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Recurse -Force frontend\node_modules
   Remove-Item -Recurse -Force backend\node_modules
   ```
4. Run the script again

### Problem 6: "Cannot find module" Errors

**Symptoms:**
```
Error: Cannot find module 'express'
Error: Cannot find module 'react'
```

**Solution:**
- Dependencies didn't install properly
- Follow Problem 5 solution above

---

## ✅ Success Indicators

You'll know Method 1 worked when you see:

1. ✅ No error messages about Node.js
2. ✅ Version numbers displayed (node and npm)
3. ✅ Messages like "Installing dependencies..." (first time)
4. ✅ "Server running on port 5000"
5. ✅ "Ready on http://localhost:3000"
6. ✅ Browser opens automatically (PowerShell script)
7. ✅ Website loads in browser

---

## 📝 Before Running Method 1

Make sure you have:

1. ✅ **Node.js installed** (v18 or higher)
   - Check: `node --version` in PowerShell

2. ✅ **Environment files created** (optional for first run)
   - `backend\.env` - Can create later
   - `frontend\.env.local` - Can create later
   - Script will work without them, but some features won't work

3. ✅ **Internet connection** (for downloading dependencies)

---

## 🎯 Quick Comparison

| Feature | Batch File (.bat) | PowerShell (.ps1) |
|---------|------------------|-------------------|
| Ease of use | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Auto-open browser | ❌ No | ✅ Yes |
| Better error messages | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Windows 11 optimized | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Recommended** | Good | **Best** |

---

## 🚀 Quick Start Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] In project folder? (`D:\MOCXS`)
- [ ] Script file exists? (`START_LOCALHOST.ps1` or `.bat`)
- [ ] Ready to run? (Double-click or right-click → Run with PowerShell)
- [ ] Browser ready? (Will open automatically with PowerShell script)

---

**That's Method 1 in detail! The PowerShell script is recommended for Windows 11.** 🎉

