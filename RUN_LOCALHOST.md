# How to Run Website on localhost:3000

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies (First Time Only)

Open **PowerShell** in the project folder (`D:\MOCXS`):

```powershell
npm install
cd frontend
npm install
cd ..\backend
npm install
cd ..
```

**OR** use the batch file:
- Double-click `SETUP_WINDOWS.bat`

### Step 2: Configure Environment Files

**Create `backend\.env`:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:password@cluster.mongodb.net/mocxs
JWT_SECRET=your-secret-key-min-32-characters
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Create `frontend\.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key-id
```

### Step 3: Start the Servers

**Option A: Run Both Together (Recommended)**
```powershell
npm run dev
```

**Option B: Run Separately (Two Windows)**

**Window 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Window 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## ✅ Access the Website

After starting, open your browser and go to:

**Frontend (Main Website):** http://localhost:3000

**Backend API:** http://localhost:5000/api

**Health Check:** http://localhost:5000/api/health

## 🎯 What You Should See

When you run `npm run dev`, you should see:

```
[0] Backend server running on port 5000
[1] Frontend server running on http://localhost:3000
```

Then open **http://localhost:3000** in your browser!

## 🐛 Troubleshooting

### Port 3000 Already in Use?

```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F
```

### Backend Not Starting?

- Check if port 5000 is available
- Verify `backend\.env` file exists
- Check MongoDB connection string

### Frontend Not Starting?

- Check if port 3000 is available
- Verify `frontend\.env.local` exists
- Make sure backend is running first

### "npm is not recognized"?

1. Install Node.js: https://nodejs.org/
2. Restart your computer
3. Verify: `npm --version`

## 📝 Quick Commands

| Task | Command |
|------|---------|
| Start both servers | `npm run dev` |
| Start backend only | `cd backend && npm run dev` |
| Start frontend only | `cd frontend && npm run dev` |
| Stop servers | Press `Ctrl+C` |

---

**That's it! Your website will be running on http://localhost:3000** 🎉

