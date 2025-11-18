# Install MongoDB Locally on Windows

## 🎯 Quick Installation Guide

### Step 1: Download MongoDB Community Server

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (7.0 or higher recommended)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **"Download"** (file will be ~200-300 MB)

### Step 2: Install MongoDB

1. **Run the downloaded `.msi` file**
2. Click **"Next"** on the welcome screen
3. Accept the license agreement → **"Next"**
4. Choose **"Complete"** installation → **"Next"**
5. **IMPORTANT**: Check **"Install MongoDB as a Service"**
   - Service Name: `MongoDB`
   - **Run service as: `Network Service user` (RECOMMENDED)**
     - This is the default and recommended option
     - More secure with limited privileges
     - Perfect for local development
     - Only choose "Local System" if you encounter permission issues later
6. **Optional**: Check **"Install MongoDB Compass"** (GUI tool - recommended)
7. Click **"Install"**
8. Wait for installation to complete
9. Click **"Finish"**

### Step 3: Verify Installation

Open PowerShell (as Administrator) and run:

```powershell
Get-Service MongoDB
```

**Expected output:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

If status is **"Running"**, you're all set! ✅

If status is **"Stopped"**, start it:

```powershell
net start MongoDB
```

### Step 4: Test MongoDB Connection

Open a new PowerShell window and run:

```powershell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB: 7.x.x
Using Mongosh: x.x.x
...
test>
```

Type `exit` to quit.

### Step 5: Your .env File is Already Correct

Your `backend/.env` file already has the correct local MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/mocxs
```

**No changes needed!** ✅

### Step 6: Restart Your Server

```powershell
cd D:\MOCXS\backend
npm run dev
```

You should now see:
```
✅ MongoDB Connected successfully
   Database: mocxs
Server running on port 5000
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Service Won't Start

**Solution 1: Start manually**
```powershell
# Run PowerShell as Administrator
net start MongoDB
```

**Solution 2: Check if service exists**
```powershell
Get-Service MongoDB
```

If you get "Cannot find any service", MongoDB wasn't installed as a service. Reinstall and make sure to check "Install MongoDB as a Service".

**Solution 3: Check logs**
```powershell
Get-Content "C:\Program Files\MongoDB\Server\*\log\mongod.log" -Tail 50
```

### Issue: "Access Denied" When Starting Service

**Solution:**
1. Right-click PowerShell
2. Select **"Run as Administrator"**
3. Try again: `net start MongoDB`

### Issue: Port 27017 Already in Use

**Check what's using the port:**
```powershell
netstat -ano | findstr :27017
```

**Kill the process** (replace PID with actual number):
```powershell
taskkill /PID <PID_NUMBER> /F
```

### Issue: "mongosh is not recognized"

**Solution:**
1. MongoDB might not be in your PATH
2. Try using full path:
   ```powershell
   "C:\Program Files\MongoDB\Server\*\bin\mongosh.exe"
   ```
3. Or add MongoDB to PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add: `C:\Program Files\MongoDB\Server\<version>\bin`
   - Restart PowerShell

### Issue: Installation Fails

**Common causes:**
- Antivirus blocking installation
- Insufficient permissions (run installer as Administrator)
- Previous MongoDB installation not fully removed

**Solution:**
1. Run installer as Administrator
2. Temporarily disable antivirus
3. If reinstalling, use MongoDB's uninstaller first

---

## 📁 MongoDB Data Location

MongoDB stores data in:
```
C:\Program Files\MongoDB\Server\<version>\data\db
```

Or if installed as service:
```
C:\Program Files\MongoDB\Server\<version>\data
```

---

## 🛠️ Useful MongoDB Commands

**Start MongoDB service:**
```powershell
net start MongoDB
```

**Stop MongoDB service:**
```powershell
net stop MongoDB
```

**Check MongoDB status:**
```powershell
Get-Service MongoDB
```

**Connect to MongoDB shell:**
```powershell
mongosh
```

**List databases:**
```powershell
mongosh
> show dbs
```

**Use your database:**
```powershell
mongosh
> use mocxs
> show collections
```

---

## ✅ Verification Checklist

After installation, verify:

- [ ] MongoDB service is running: `Get-Service MongoDB` shows "Running"
- [ ] Can connect via mongosh: `mongosh` works
- [ ] Server connects: `npm run dev` shows "MongoDB Connected successfully"
- [ ] Database created: Check with `mongosh` → `use mocxs` → `show collections`

---

## 🎉 You're All Set!

Once MongoDB is installed and running, your application will automatically connect to it using the connection string in your `.env` file. No further configuration needed!

