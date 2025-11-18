# Method 1: Visual Step-by-Step Guide

## 🎬 Complete Walkthrough

### PART 1: Preparation

#### Step 1.1: Check Your Project Folder
```
📁 D:\MOCXS
   ├── 📄 START_LOCALHOST.bat      ← Option A (Batch file)
   ├── 📄 START_LOCALHOST.ps1       ← Option B (PowerShell - RECOMMENDED)
   ├── 📁 frontend
   ├── 📁 backend
   └── 📄 package.json
```

#### Step 1.2: Verify Node.js is Installed
1. Press `Win + X`
2. Click "Windows PowerShell" or "Terminal"
3. Type: `node --version`
4. Press Enter
5. **Expected:** `v18.17.0` or similar
6. **If error:** Install Node.js from https://nodejs.org/

---

### PART 2: Running the Script

## 🎯 OPTION A: Batch File (START_LOCALHOST.bat)

### Visual Steps:

```
┌─────────────────────────────────────┐
│  Step 1: Find the file              │
│  📄 START_LOCALHOST.bat             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 2: Double-click the file     │
│  👆 Double-click                    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 3: Command Prompt opens       │
│  ⬛ Black window appears             │
│  Shows: "Starting MOCXS Website..." │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 4: Wait for installation      │
│  ⏳ Installing dependencies...       │
│  (First time: 2-5 minutes)          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 5: Servers start               │
│  ✅ Backend: http://localhost:5000  │
│  ✅ Frontend: http://localhost:3000  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 6: Open browser manually      │
│  🌐 Type: http://localhost:3000    │
│  Press Enter                         │
└─────────────────────────────────────┘
```

### Detailed Instructions:

**1. Locate the File:**
   - Open File Explorer
   - Go to: `D:\MOCXS`
   - Look for: `START_LOCALHOST.bat`
   - It looks like a gear icon or a Windows batch file

**2. Run the File:**
   - **Double-click** `START_LOCALHOST.bat`
   - A black Command Prompt window will appear

**3. What You'll See:**
   ```
   ========================================
     Starting MOCXS Website on localhost:3000
   ========================================
   
   [OK] Node.js found
   v18.17.0
   9.6.7
   
   Installing dependencies...
   (This may take a few minutes the first time)
   
   ========================================
     Starting servers...
   ========================================
   
   Backend:  http://localhost:5000
   Frontend: http://localhost:3000  <-- OPEN THIS IN BROWSER
   
   Press Ctrl+C to stop servers
   
   [0] Server running on port 5000
   [1] Ready on http://localhost:3000
   ```

**4. Open Your Browser:**
   - Open Chrome, Edge, or Firefox
   - Type in address bar: `http://localhost:3000`
   - Press Enter
   - **Website loads!** 🎉

**5. Keep the Window Open:**
   - ⚠️ **Don't close the Command Prompt window!**
   - It needs to stay open for the servers to run
   - To stop: Press `Ctrl + C`, then `Y`, then Enter

---

## 🎯 OPTION B: PowerShell Script (START_LOCALHOST.ps1) - RECOMMENDED

### Visual Steps:

```
┌─────────────────────────────────────┐
│  Step 1: Find the file              │
│  📄 START_LOCALHOST.ps1             │
│  (Has PowerShell icon)              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 2: Right-click the file      │
│  👆 Right-click                     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 3: Select "Run with PowerShell"│
│  📋 Context menu appears            │
│  Click: "Run with PowerShell"       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 4: Security prompt (if any)   │
│  ⚠️ "Do you want to run this?"      │
│  Click: "Run" or "Yes"              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 5: PowerShell window opens   │
│  🔵 Blue window appears              │
│  Shows colored text                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 6: Auto-installs dependencies │
│  ⏳ Installing...                    │
│  (First time: 2-5 minutes)          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 7: Servers start               │
│  ✅ Backend: http://localhost:5000  │
│  ✅ Frontend: http://localhost:3000│
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Step 8: Browser opens automatically│
│  🌐 Opens http://localhost:3000    │
│  After 3 seconds                    │
└─────────────────────────────────────┘
```

### Detailed Instructions:

**1. Locate the File:**
   - Open File Explorer
   - Go to: `D:\MOCXS`
   - Look for: `START_LOCALHOST.ps1`
   - It has a PowerShell icon (blue, looks like `>_`)

**2. Run the File:**
   - **Right-click** `START_LOCALHOST.ps1`
   - Select **"Run with PowerShell"**
   - If security warning appears, click **"Run"** or **"Yes"**

**3. Handle Execution Policy (If Needed):**
   
   If you see this error:
   ```
   cannot be loaded because running scripts is disabled
   ```
   
   **Fix it:**
   - Press `Win + X`
   - Click "Windows PowerShell (Admin)"
   - Type: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
   - Press Enter
   - Type `Y` and press Enter
   - Close admin PowerShell
   - Try running script again

**4. What You'll See:**
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

**5. Browser Opens Automatically:**
   - ⏰ Wait 3 seconds
   - 🌐 Browser opens automatically
   - ✅ Website loads at http://localhost:3000

**6. Keep the Window Open:**
   - ⚠️ **Don't close the PowerShell window!**
   - To stop: Press `Ctrl + C`, type `Y`, press Enter

---

## 📊 Comparison: Which Should You Use?

| Feature | Batch (.bat) | PowerShell (.ps1) |
|---------|-------------|-------------------|
| **Ease** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Auto-open browser** | ❌ No | ✅ Yes |
| **Better colors** | ❌ No | ✅ Yes |
| **Better errors** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Windows 11** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Recommended** | Good | **Best!** |

---

## 🎬 Video-Like Walkthrough

### Scenario: First Time Running

**Minute 0:00** - You double-click `START_LOCALHOST.ps1`
- Window opens
- Shows: "Checking Node.js..."

**Minute 0:05** - Node.js check passes
- Shows: "[OK] Node.js: v18.17.0"

**Minute 0:10** - Checks dependencies
- Shows: "Installing dependencies..."
- This takes 2-5 minutes the first time

**Minute 2:00** - Dependencies installed
- Shows: "Starting Servers..."

**Minute 2:05** - Servers start
- Shows: "Server running on port 5000"
- Shows: "Ready on http://localhost:3000"

**Minute 2:08** - Browser opens automatically
- 🌐 Browser opens
- Website loads!

**Minute 2:10** - You see your website!
- ✅ Homepage loads
- ✅ Can browse products
- ✅ Everything works!

---

## ✅ Success Checklist

After running Method 1, you should have:

- [ ] ✅ Script ran without errors
- [ ] ✅ Saw "Server running on port 5000"
- [ ] ✅ Saw "Ready on http://localhost:3000"
- [ ] ✅ Browser opened (PowerShell) or opened manually (Batch)
- [ ] ✅ Website loaded at http://localhost:3000
- [ ] ✅ Can see MOCXS homepage
- [ ] ✅ Can navigate the website

---

## 🛑 How to Stop

**When you're done:**

1. Go back to the PowerShell/Command Prompt window
2. Press **Ctrl + C**
3. Type **Y** (if asked)
4. Press **Enter**
5. Window closes
6. Servers stopped ✅

---

## 💡 Pro Tips

1. **First time is slowest** - Installing dependencies takes time
2. **Keep window open** - Don't close it while using the website
3. **Use PowerShell** - Better experience on Windows 11
4. **Check Node.js first** - Run `node --version` before starting
5. **Internet needed** - For downloading dependencies

---

**That's Method 1 completely explained! Try the PowerShell script first - it's the easiest!** 🚀

