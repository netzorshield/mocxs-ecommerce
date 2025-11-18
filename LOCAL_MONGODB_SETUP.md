# Local MongoDB Setup Guide for Windows

## 🎯 Overview

This guide will help you install and run MongoDB locally on your Windows machine for development.

## 📦 Installation Methods

### Method 1: MongoDB Community Edition (Recommended)

#### Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: 7.0 (or latest stable)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **Download**

#### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Follow the installation wizard:
   - Click **Next** on welcome screen
   - Accept the license agreement
   - Choose **Complete** installation
   - Select **Install MongoDB as a Service** (recommended)
   - Service Name: `MongoDB`
   - Check **Install MongoDB Compass** (GUI tool - optional but helpful)
   - Click **Install**
   - Wait for installation to complete

#### Step 3: Verify Installation

Open **Command Prompt** or **PowerShell** and run:

```cmd
mongod --version
```

You should see MongoDB version information.

#### Step 4: Start MongoDB Service

MongoDB should automatically start as a Windows service. To verify:

1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for **MongoDB** service
4. Check if it's **Running**

If it's not running:
- Right-click on **MongoDB** → **Start**

#### Step 5: Test Connection

Open a new Command Prompt and run:

```cmd
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```

Type `exit` to exit MongoDB shell.

---

### Method 2: MongoDB via Docker (Alternative)

If you have Docker installed:

#### Step 1: Install Docker Desktop

1. Download Docker Desktop for Windows: https://www.docker.com/products/docker-desktop
2. Install and restart your computer
3. Start Docker Desktop

#### Step 2: Run MongoDB Container

Open PowerShell and run:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

This will:
- Download MongoDB image
- Start MongoDB container on port 27017
- Run in background (`-d` flag)

#### Step 3: Verify MongoDB is Running

```powershell
docker ps
```

You should see the `mongodb` container running.

#### Step 4: Stop MongoDB (when needed)

```powershell
docker stop mongodb
```

#### Step 5: Start MongoDB (when needed)

```powershell
docker start mongodb
```

---

## ✅ Verify MongoDB is Working

### Option 1: Using MongoDB Shell

```cmd
mongosh
```

If it connects successfully, MongoDB is running!

### Option 2: Check Port

```cmd
netstat -ano | findstr :27017
```

You should see MongoDB listening on port 27017.

### Option 3: Test with Your Application

Run the seed script:

```cmd
cd D:\MOCXS\backend
npm run seed
```

If you see "Connected to MongoDB", it's working!

---

## 🔧 Configuration

Your `.env` file is already configured for localhost:

```env
MONGODB_URI=mongodb://localhost:27017/mocxs
```

This will:
- Connect to MongoDB on `localhost` (127.0.0.1)
- Use port `27017` (default MongoDB port)
- Use database name `mocxs`

---

## 🚀 Run Your Application

### Step 1: Start MongoDB (if not running as service)

**For MongoDB Community Edition:**
- MongoDB should run automatically as a Windows service
- Check in Services (`services.msc`) if needed

**For Docker:**
```powershell
docker start mongodb
```

### Step 2: Run Seed Script

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

### Step 3: Start Your Backend Server

```cmd
cd D:\MOCXS\backend
npm run dev
```

### Step 4: Start Your Frontend Server

Open a new terminal:

```cmd
cd D:\MOCXS\frontend
npm run dev
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solution 1: Check if MongoDB is running**
```cmd
netstat -ano | findstr :27017
```

If nothing shows, MongoDB is not running.

**Solution 2: Start MongoDB Service**
1. Press `Win + R`
2. Type `services.msc`
3. Find **MongoDB** service
4. Right-click → **Start**

**Solution 3: Start MongoDB Manually (if not installed as service)**
```cmd
mongod --dbpath "C:\data\db"
```

Create the directory first:
```cmd
mkdir C:\data\db
```

### Error: "Port 27017 already in use"

**Solution:** Another MongoDB instance might be running. Check:

```cmd
netstat -ano | findstr :27017
```

Find the PID and stop the process, or use a different port.

### Error: "Access Denied"

**Solution:** Run Command Prompt as Administrator and try again.

---

## 📁 MongoDB Data Directory

By default, MongoDB stores data in:
```
C:\data\db
```

If you need to use a different directory:

1. Create the directory:
```cmd
mkdir D:\MongoDB\data\db
```

2. Start MongoDB with custom path:
```cmd
mongod --dbpath "D:\MongoDB\data\db"
```

---

## 🎯 Quick Start Commands

### Start MongoDB (Docker)
```powershell
docker start mongodb
```

### Stop MongoDB (Docker)
```powershell
docker stop mongodb
```

### Check MongoDB Status
```cmd
netstat -ano | findstr :27017
```

### Connect to MongoDB Shell
```cmd
mongosh
```

### Run Seed Script
```cmd
cd D:\MOCXS\backend
npm run seed
```

---

## 🔄 For Deployment

When you're ready to deploy to production:

1. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority
```

2. Use MongoDB Atlas (cloud) or your production MongoDB server
3. Update environment variables in your hosting platform

---

## ✅ Success Checklist

- [ ] MongoDB installed (Community Edition or Docker)
- [ ] MongoDB service is running
- [ ] Port 27017 is accessible
- [ ] `.env` file has `MONGODB_URI=mongodb://localhost:27017/mocxs`
- [ ] Seed script runs successfully
- [ ] Backend server connects to MongoDB
- [ ] Frontend can communicate with backend

---

## 📚 Additional Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **MongoDB Compass**: GUI tool for MongoDB (optional)
- **MongoDB Shell (mongosh)**: Command-line interface
- **MongoDB Atlas**: Cloud MongoDB (for production)

---

**That's it! Your local MongoDB setup is complete!** 🎉











