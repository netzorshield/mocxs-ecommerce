# Fix MongoDB Connection Error

## Error: `ECONNREFUSED ::1:27017` or `ECONNREFUSED 127.0.0.1:27017`

This error means your application is trying to connect to a **local MongoDB instance** that is **not running**.

---

## 🎯 Quick Solution: Use MongoDB Atlas (Recommended)

MongoDB Atlas is a free cloud database service. This is the easiest and recommended solution.

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up (free tier available)
3. Create a free cluster (takes 3-5 minutes)

### Step 2: Get Your Connection String

1. In MongoDB Atlas dashboard, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and copy the connection string
4. It will look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 3: Configure Your Database

1. Replace `<password>` with your database password
2. Add database name at the end: `/mocxs`
3. Final string should look like:
   ```
   mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/mocxs?retryWrites=true&w=majority
   ```

### Step 4: Update Your .env File

1. Open `backend/.env` file
2. Replace the `MONGODB_URI` line with your Atlas connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/mocxs?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 5: Configure IP Whitelist

1. In MongoDB Atlas, go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

### Step 6: Restart Your Server

```powershell
cd D:\MOCXS\backend
npm run dev
```

You should now see: `✅ MongoDB Connected successfully`

---

## 🔧 Alternative: Install Local MongoDB

If you prefer to run MongoDB locally on your Windows machine:

### Step 1: Download MongoDB Community Server

1. Go to https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (7.0 or higher)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **"Download"**

### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. Check **"Install MongoDB as a Service"**
4. Check **"Install MongoDB Compass"** (optional GUI tool)
5. Click **"Install"**

### Step 3: Verify MongoDB is Running

Open PowerShell and run:

```powershell
Get-Service MongoDB
```

**Expected output:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

If it says **"Stopped"**, start it:

```powershell
net start MongoDB
```

### Step 4: Test Connection

```powershell
mongosh
```

If you see `test>` prompt, MongoDB is working! Type `exit` to quit.

### Step 5: Your .env File Should Already Be Correct

Your `backend/.env` file should have:
```env
MONGODB_URI=mongodb://localhost:27017/mocxs
```

This is already correct for local MongoDB.

### Step 6: Restart Your Server

```powershell
cd D:\MOCXS\backend
npm run dev
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Service Won't Start

**Solution:**
```powershell
# Check if MongoDB service exists
Get-Service MongoDB

# If it doesn't exist, reinstall MongoDB
# If it exists but won't start, check logs:
Get-Content "C:\Program Files\MongoDB\Server\*\log\mongod.log" -Tail 50
```

### Issue: "Access Denied" When Starting Service

**Solution:**
1. Run PowerShell as Administrator
2. Try starting again: `net start MongoDB`

### Issue: Port 27017 Already in Use

**Solution:**
```powershell
# Find what's using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F
```

### Issue: MongoDB Atlas Connection Timeout

**Solutions:**
1. Check your internet connection
2. Verify IP whitelist includes `0.0.0.0/0` or your current IP
3. Check username/password in connection string
4. Ensure cluster is running (not paused) in Atlas dashboard
5. Try the connection string in MongoDB Compass to test

### Issue: Authentication Failed (MongoDB Atlas)

**Solutions:**
1. Verify username and password are correct
2. Make sure password doesn't contain special characters that need URL encoding
3. If password has `@`, `#`, `%`, etc., URL encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - Or change your MongoDB password to avoid special characters

---

## ✅ Verify Connection

After fixing, restart your server. You should see:

```
✅ MongoDB Connected successfully
   Database: mocxs
Server running on port 5000
```

If you still see errors, check:
1. `.env` file exists in `backend/` folder
2. `MONGODB_URI` is on a single line (no line breaks)
3. No extra spaces or quotes around the connection string
4. MongoDB service is running (for local) or Atlas cluster is active (for cloud)

---

## 📚 Additional Resources

- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- MongoDB Community Server: https://www.mongodb.com/docs/manual/installation/
- MongoDB Compass (GUI): https://www.mongodb.com/products/compass




