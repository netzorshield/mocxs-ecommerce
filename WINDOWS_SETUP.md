# Windows Setup Guide for MOCXS E-commerce

## 🪟 Step-by-Step Windows Installation

### Prerequisites Check

1. **Node.js Installation**
   - Download from: https://nodejs.org/
   - Choose the LTS version (v18 or higher)
   - Install with default settings
   - Verify installation:
     ```powershell
     node --version
     npm --version
     ```

2. **Git (Optional but Recommended)**
   - Download from: https://git-scm.com/download/win
   - Use Git Bash or PowerShell

### Step 1: Open Terminal

**Option A: PowerShell (Recommended)**
- Press `Win + X` and select "Windows PowerShell" or "Terminal"
- Or search "PowerShell" in Start menu

**Option B: Command Prompt**
- Press `Win + R`, type `cmd`, press Enter

**Option C: VS Code Terminal**
- Open VS Code
- Press `` Ctrl + ` `` (backtick) to open integrated terminal

### Step 2: Navigate to Project Directory

```powershell
cd D:\MOCXS
```

### Step 3: Install Dependencies

**Install root dependencies:**
```powershell
npm install
```

**Install backend dependencies:**
```powershell
cd backend
npm install
cd ..
```

**Install frontend dependencies:**
```powershell
cd frontend
npm install
cd ..
```

**OR use the convenience script:**
```powershell
npm run install:all
```

### Step 4: Create Environment Files

#### Backend Environment File

1. Navigate to backend folder:
   ```powershell
   cd backend
   ```

2. Create `.env` file:
   ```powershell
   # In PowerShell
   New-Item -Path .env -ItemType File
   
   # Or use Notepad
   notepad .env
   ```

3. Copy this content to `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. Replace the placeholder values with your actual credentials

#### Frontend Environment File

1. Navigate to frontend folder:
   ```powershell
   cd ..\frontend
   ```

2. Create `.env.local` file:
   ```powershell
   New-Item -Path .env.local -ItemType File
   # Or
   notepad .env.local
   ```

3. Copy this content to `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
   ```

### Step 5: Get MongoDB Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (takes 3-5 minutes)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `mocxs` or keep default
8. Paste into `backend/.env` as `MONGODB_URI`

**Example:**
```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/mocxs?retryWrites=true&w=majority
```

### Step 6: Get Razorpay Keys (For Testing)

1. Go to https://razorpay.com/
2. Sign up for account
3. Go to Settings → API Keys
4. Generate Test Keys
5. Copy Key ID and Key Secret
6. Paste into both `.env` files

### Step 7: Run the Application

#### Option A: Run Both Together (Recommended)

Open **one** PowerShell window in project root:

```powershell
cd D:\MOCXS
npm run dev
```

This starts both backend and frontend automatically.

#### Option B: Run Separately (Two Windows)

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

### Step 8: Access the Website

- **Frontend**: Open browser and go to http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### Step 9: Seed Sample Data (Optional)

Open a new PowerShell window:

```powershell
cd D:\MOCXS\backend
npm run seed
```

This creates:
- 8 sample products
- Admin account: `admin@mocxs.com` / `admin123`

## 🐛 Common Windows Issues & Solutions

### Issue 1: "npm is not recognized"

**Solution:**
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal/PowerShell
- Verify: `npm --version`

### Issue 2: Port 5000 or 3000 Already in Use

**Solution:**

**Find what's using the port:**
```powershell
# For port 5000
netstat -ano | findstr :5000

# For port 3000
netstat -ano | findstr :3000
```

**Kill the process:**
```powershell
taskkill /PID <PID_NUMBER> /F
```

**Or change ports:**

In `backend/.env`:
```env
PORT=5001
```

In `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Issue 3: "Cannot find module" Errors

**Solution:**
```powershell
# Delete node_modules and reinstall
cd backend
Remove-Item -Recurse -Force node_modules
npm install

cd ..\frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue 4: PowerShell Execution Policy Error

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue 5: MongoDB Connection Timeout

**Solutions:**
1. Check your internet connection
2. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs) for testing
3. Check username/password in connection string
4. Ensure cluster is running (not paused)

### Issue 6: File Path Issues

**Use forward slashes or escaped backslashes:**
```powershell
# Good
cd D:/MOCXS/backend

# Also good
cd D:\MOCXS\backend
```

### Issue 7: Environment Variables Not Loading

**Solution:**
- Ensure `.env` files are in correct folders (`backend/.env` and `frontend/.env.local`)
- No spaces around `=` in `.env` files
- Restart the server after changing `.env` files
- Check file encoding is UTF-8 (not UTF-16)

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] npm installed (`npm --version` works)
- [ ] All dependencies installed (`node_modules` folders exist)
- [ ] `backend/.env` file created with correct values
- [ ] `frontend/.env.local` file created with correct values
- [ ] MongoDB Atlas account created
- [ ] MongoDB connection string added to `.env`
- [ ] Razorpay test keys added to `.env` files
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can access http://localhost:3000 in browser
- [ ] Can access http://localhost:5000/api/health

## 🚀 Quick Commands Reference

```powershell
# Navigate to project
cd D:\MOCXS

# Install all dependencies
npm run install:all

# Run both servers
npm run dev

# Run backend only
cd backend
npm run dev

# Run frontend only
cd frontend
npm run dev

# Seed database
cd backend
npm run seed

# Check if ports are in use
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

## 📞 Need Help?

1. Check the main [README.md](./README.md) for detailed documentation
2. Check [QUICKSTART.md](./QUICKSTART.md) for quick reference
3. Verify all environment variables are set correctly
4. Check console/terminal for error messages
5. Ensure MongoDB cluster is running (not paused)

---

**Happy Coding! 🎉**

