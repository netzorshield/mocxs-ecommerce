# How to Run on Windows 11 - Complete Guide

## ✅ npm Works on Windows!

**npm is cross-platform** - it works perfectly on Windows, Linux, and Mac. The issue might be:
1. Node.js is not installed
2. Node.js is not in your PATH
3. Batch file syntax issues

## 🚀 Method 1: PowerShell Scripts (Recommended for Windows 11)

PowerShell scripts are more reliable on Windows 11:

### Setup:
1. **Right-click** `SETUP_WINDOWS.ps1`
2. Select **"Run with PowerShell"**
3. If you get an execution policy error, run this first:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Run:
1. **Right-click** `RUN_WINDOWS.ps1`
2. Select **"Run with PowerShell"**

## 🚀 Method 2: Batch Files (.bat)

### Setup:
1. **Double-click** `SETUP_WINDOWS.bat`

### Run:
1. **Double-click** `RUN_WINDOWS.bat`

## 🚀 Method 3: Manual PowerShell Commands (Most Reliable)

Open **PowerShell** (not Command Prompt):

```powershell
# Navigate to project folder
cd D:\MOCXS

# Install all dependencies
npm install
cd frontend
npm install
cd ..\backend
npm install
cd ..

# Run the application
npm run dev
```

## 🚀 Method 4: Two Separate Windows

Open **two PowerShell windows**:

**Window 1 - Backend:**
```powershell
cd D:\MOCXS\backend
npm run dev
```

**Window 2 - Frontend:**
```powershell
cd D:\MOCXS\frontend
npm run dev
```

## 🔧 Troubleshooting

### Issue: "npm is not recognized"

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Choose **LTS version** (v18 or higher)
3. **Restart your computer** after installation
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### Issue: "Execution Policy" Error (PowerShell)

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try running the PowerShell script again.

### Issue: Batch File Closes Immediately

**Solution:**
- The batch file should pause automatically
- If it closes, run it from PowerShell:
  ```powershell
  .\RUN_WINDOWS.bat
  ```

### Issue: Port Already in Use

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F
```

### Issue: Dependencies Won't Install

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules folders
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force frontend\node_modules
Remove-Item -Recurse -Force backend\node_modules

# Reinstall
npm install
cd frontend
npm install
cd ..\backend
npm install
```

## ✅ Verify Everything Works

1. **Check Node.js:**
   ```powershell
   node --version
   npm --version
   ```
   Should show version numbers (e.g., v18.17.0, 9.6.7)

2. **Check Dependencies:**
   ```powershell
   # Should exist:
   Test-Path node_modules
   Test-Path frontend\node_modules
   Test-Path backend\node_modules
   ```
   All should return `True`

3. **Check Environment Files:**
   ```powershell
   # Should exist (or at least .example files):
   Test-Path backend\.env
   Test-Path frontend\.env.local
   ```

4. **Start Servers:**
   ```powershell
   npm run dev
   ```
   Should see:
   - Backend: `Server running on port 5000`
   - Frontend: `Ready on http://localhost:3000`

## 📝 Quick Reference

| Task | Command |
|------|---------|
| Install all | `npm run install:all` |
| Run both | `npm run dev` |
| Run backend only | `cd backend && npm run dev` |
| Run frontend only | `cd frontend && npm run dev` |
| Check Node.js | `node --version` |
| Check npm | `npm --version` |

## 🎯 Recommended Approach for Windows 11

1. **Use PowerShell** (not Command Prompt)
2. **Run commands manually** for better control
3. **Use two windows** if `npm run dev` doesn't work

---

**Remember: npm works perfectly on Windows!** The issue is usually Node.js not being installed or not in PATH.



