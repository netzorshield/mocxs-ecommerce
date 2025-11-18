# Quick MongoDB Local Setup

## ✅ Your .env file is already configured!

Your `backend/.env` file is set to use local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/mocxs
```

## 🚀 Choose Your Setup Method

### Method 1: Docker (Fastest - if Docker Desktop is running)

**Step 1: Start Docker Desktop**
- Open Docker Desktop
- Wait until it shows "Docker Desktop is running"

**Step 2: Run MongoDB**
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Step 3: Verify it's running**
```powershell
docker ps
```

You should see `mongodb` container running.

**Step 4: Test your application**
```cmd
cd D:\MOCXS\backend
npm run seed
```

**To stop MongoDB:**
```powershell
docker stop mongodb
```

**To start MongoDB again:**
```powershell
docker start mongodb
```

---

### Method 2: MongoDB Community Edition (Recommended for Windows)

**Step 1: Download MongoDB**
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: 7.0 (latest)
   - Platform: Windows
   - Package: MSI
3. Click **Download**

**Step 2: Install MongoDB**
1. Run the downloaded `.msi` file
2. Follow installation wizard:
   - Click **Next** through the wizard
   - Select **Complete** installation
   - **IMPORTANT**: Check **Install MongoDB as a Service** (this makes it auto-start)
   - Service Name: `MongoDB`
   - Check **Install MongoDB Compass** (optional GUI tool)
   - Click **Install**
   - Wait for installation (2-3 minutes)

**Step 3: Verify Installation**
Open Command Prompt and run:
```cmd
mongod --version
```

You should see MongoDB version information.

**Step 4: Check if MongoDB is Running**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for **MongoDB** service
4. It should be **Running** (if not, right-click → Start)

**Step 5: Test Connection**
Open Command Prompt:
```cmd
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```

Type `exit` to exit.

**Step 6: Run Seed Script**
```cmd
cd D:\MOCXS\backend
npm run seed
```

Expected output:
```
Connected to MongoDB
Cleared existing products
Inserted 8 products
Admin user created: admin@mocxs.com / admin123
Seeding completed!
```

---

## ✅ Verify MongoDB is Working

### Test 1: Check if MongoDB is running
```cmd
netstat -ano | findstr :27017
```

You should see MongoDB listening on port 27017.

### Test 2: Connect with MongoDB Shell
```cmd
mongosh
```

If it connects, MongoDB is working!

### Test 3: Run Seed Script
```cmd
cd D:\MOCXS\backend
npm run seed
```

If you see "Connected to MongoDB", it's working!

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solution 1: Check if MongoDB is running**
```cmd
netstat -ano | findstr :27017
```

If nothing shows, MongoDB is not running.

**For Docker:**
- Make sure Docker Desktop is running
- Run: `docker start mongodb`

**For MongoDB Community Edition:**
1. Press `Win + R`
2. Type `services.msc`
3. Find **MongoDB** service
4. Right-click → **Start**

### Error: "Port 27017 already in use"

**Solution:** Another MongoDB instance is running. Check what's using the port:
```cmd
netstat -ano | findstr :27017
```

Stop the process or use a different port.

### Error: "mongod command not found"

**Solution:** MongoDB is not installed or not in PATH. Install MongoDB Community Edition (Method 2 above).

---

## 🎯 Quick Start (After MongoDB is Installed)

### 1. Verify MongoDB is Running
```cmd
netstat -ano | findstr :27017
```

### 2. Run Seed Script
```cmd
cd D:\MOCXS\backend
npm run seed
```

### 3. Start Backend Server
```cmd
cd D:\MOCXS\backend
npm run dev
```

### 4. Start Frontend Server (in new terminal)
```cmd
cd D:\MOCXS\frontend
npm run dev
```

### 5. Access Application
- Frontend: http://localhost:3000
- Admin Login: http://localhost:3000/admin/login
- Credentials: `admin@mocxs.com` / `admin123`

---

## 📝 Summary

1. ✅ `.env` file is configured for local MongoDB
2. ⏳ Install MongoDB (Docker or Community Edition)
3. ✅ Verify MongoDB is running
4. ✅ Run seed script
5. ✅ Start your application

---

## 🔄 For Production Deployment

When deploying to production, update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority
```

Use MongoDB Atlas (cloud) for production.

---

**That's it! Once MongoDB is installed and running, you're ready to go!** 🎉











