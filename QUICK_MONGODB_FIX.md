# Quick Fix: MongoDB Connection Error

## 🚀 Fastest Solution (5 minutes)

### Step 1: Get MongoDB Atlas Connection String

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Sign up** (free account) or **log in**
3. **Create a free cluster**:
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select a cloud provider and region (closest to you)
   - Click "Create"
   - Wait 3-5 minutes for cluster to deploy

4. **Get connection string**:
   - Click **"Connect"** button on your cluster
   - Choose **"Connect your application"**
   - Select **"Node.js"** and version **"5.5 or later"**
   - **Copy** the connection string

5. **Modify the connection string**:
   - It will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - **Add `/mocxs` before the `?`**:
   - Final: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mocxs?retryWrites=true&w=majority`
   - Replace `<password>` with your actual database password

### Step 2: Update Your .env File

**Option A: Use the Helper Script (Easiest)**

```powershell
cd D:\MOCXS\backend
.\setup-mongodb-atlas.ps1
```

Paste your connection string when prompted.

**Option B: Manual Update**

1. Open `backend/.env` in a text editor
2. Find the line: `MONGODB_URI=mongodb://localhost:27017/mocxs`
3. Replace it with your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mocxs?retryWrites=true&w=majority
   ```
4. Save the file

### Step 3: Configure IP Whitelist

1. In MongoDB Atlas dashboard, click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** button
   - This adds `0.0.0.0/0` (allows all IPs)
   - Safe for development/testing
4. Click **"Confirm"**

### Step 4: Restart Your Server

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

## ✅ Success Checklist

- [ ] MongoDB Atlas account created
- [ ] Free cluster created and running
- [ ] Connection string copied and modified (added `/mocxs`)
- [ ] `.env` file updated with MongoDB Atlas connection string
- [ ] IP whitelist configured (0.0.0.0/0 or your IP)
- [ ] Server restarted
- [ ] See "MongoDB Connected successfully" message

---

## 🐛 Still Having Issues?

### Error: "Authentication failed"

- **Check**: Username and password are correct
- **Check**: Password doesn't have special characters that need URL encoding
- **Solution**: Change MongoDB password to avoid `@`, `#`, `%` characters

### Error: "Connection timeout"

- **Check**: Internet connection is working
- **Check**: MongoDB Atlas cluster is running (not paused)
- **Check**: IP whitelist includes `0.0.0.0/0` or your current IP
- **Solution**: Wait a few minutes after adding IP to whitelist

### Error: "Invalid connection string"

- **Check**: Connection string is on a single line (no line breaks)
- **Check**: Added `/mocxs` before the `?` in the connection string
- **Check**: No extra spaces or quotes around the connection string

### Test Your Connection String

You can test your connection string using MongoDB Compass:
1. Download: https://www.mongodb.com/products/compass
2. Open Compass
3. Paste your connection string
4. Click "Connect"
5. If it works in Compass, it will work in your app

---

## 📚 Need More Help?

See `FIX_MONGODB_CONNECTION.md` for detailed troubleshooting.



