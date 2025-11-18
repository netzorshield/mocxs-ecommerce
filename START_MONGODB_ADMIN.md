# Fix: "System error 5 - Access is denied"

## 🔐 Problem

This error means you need **Administrator privileges** to run the command (likely `net start MongoDB`).

## ✅ Solution: Run PowerShell as Administrator

### Step 1: Open PowerShell as Administrator

**Method 1: From Start Menu**
1. Press `Win` key
2. Type `PowerShell`
3. Right-click on **"Windows PowerShell"**
4. Click **"Run as administrator"**
5. Click **"Yes"** when prompted

**Method 2: Quick Method**
1. Press `Win + X`
2. Click **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**

**Method 3: From Run Dialog**
1. Press `Win + R`
2. Type: `powershell`
3. Press `Ctrl + Shift + Enter` (this runs as admin)
4. Click **"Yes"** when prompted

### Step 2: Verify You're Running as Admin

You should see **"Administrator"** in the window title, or run:
```powershell
([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
```

If it returns `True`, you're good!

### Step 3: Start MongoDB Service

Now run:
```powershell
net start MongoDB
```

You should see:
```
The MongoDB Server (MongoDB) service was started successfully.
```

### Step 4: Verify MongoDB is Running

```powershell
Get-Service MongoDB
```

Should show:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

### Step 5: Navigate to Your Project and Start Server

```powershell
cd D:\MOCXS\backend
npm run dev
```

---

## 🐛 Alternative: If MongoDB Service Doesn't Exist

If you get "The service name is invalid", MongoDB might not be installed yet or wasn't installed as a service.

**Check if MongoDB is installed:**
```powershell
Get-Service MongoDB -ErrorAction SilentlyContinue
```

If nothing is returned, MongoDB needs to be installed. See `INSTALL_MONGODB_LOCAL.md`.

---

## 🔧 Alternative: Start MongoDB Manually (Without Service)

If you can't start the service, you can run MongoDB manually:

1. **Find MongoDB installation:**
   ```powershell
   Get-ChildItem "C:\Program Files\MongoDB" -Recurse -Filter "mongod.exe" | Select-Object -First 1
   ```

2. **Create data directory:**
   ```powershell
   New-Item -ItemType Directory -Force -Path "C:\data\db"
   ```

3. **Start MongoDB manually:**
   ```powershell
   & "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath "C:\data\db"
   ```

   Keep this window open while using MongoDB.

---

## ✅ Quick Checklist

- [ ] Opened PowerShell as Administrator
- [ ] Verified admin privileges
- [ ] Ran `net start MongoDB`
- [ ] Verified service is running: `Get-Service MongoDB`
- [ ] Started your server: `npm run dev`

---

## 💡 Tip: Make MongoDB Start Automatically

Once MongoDB is running, you can set it to start automatically:

```powershell
Set-Service -Name MongoDB -StartupType Automatic
```

This way, MongoDB will start automatically when Windows boots.



