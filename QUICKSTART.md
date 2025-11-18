# Quick Start Guide

## 🚀 Running the MOCXS E-commerce Website

### Step 1: Install Dependencies

```bash
# Install all dependencies
npm run install:all
```

Or manually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Set Up Environment Variables

#### Backend (.env file in `backend/` folder)

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mocxs
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env.local file in `frontend/` folder)

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
```

### Step 3: Start the Servers

**Option A: Run both together (Recommended)**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Step 4: Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

This will create:
- 8 sample products
- Admin user: `admin@mocxs.com` / `admin123`

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📝 Important Notes

1. **MongoDB**: You need a MongoDB database. Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud database.

2. **Razorpay**: Sign up at [Razorpay](https://razorpay.com/) and get test API keys for development.

3. **First Time Setup**:
   - Create a MongoDB Atlas account
   - Get your connection string
   - Sign up for Razorpay test account
   - Copy the keys to your `.env` files

## 🐛 Troubleshooting

**Port already in use?**
- Change `PORT` in `backend/.env` to another port (e.g., 5001)
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` accordingly

**MongoDB connection error?**
- Check your connection string
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct

**Frontend can't connect to backend?**
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` matches your backend URL
- Check CORS settings in `backend/server.js`

## ✅ Verify Everything Works

1. Visit http://localhost:3000 - Should see homepage
2. Click "Shop" - Should see products (if seeded)
3. Try registering a new account
4. Add products to cart
5. Proceed to checkout

---

For detailed documentation, see [README.md](./README.md)

