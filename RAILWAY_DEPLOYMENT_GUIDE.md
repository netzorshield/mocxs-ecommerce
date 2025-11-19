# Deploy Backend to Railway

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (same account you used for Vercel)
4. Authorize Railway to access your GitHub

## Step 2: Deploy from GitHub

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: `netzorshield/mocxs-ecommerce`
4. Railway will detect it's a Node.js project

## Step 3: Configure Project

1. **Set Root Directory**: `backend`
   - Go to Settings → Root Directory
   - Set to: `backend`

2. **Set Start Command**:
   - Go to Settings → Deploy
   - Start Command: `node server.js`

3. **Set Port** (if needed):
   - Railway automatically assigns a PORT
   - Your backend should use `process.env.PORT` (already configured)

## Step 4: Add Environment Variables

Go to Variables tab and add:

```
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-32-character-secret-key
RAZORPAY_KEY_ID=placeholder (we'll add real key later)
RAZORPAY_KEY_SECRET=placeholder (we'll add real key later)
FRONTEND_URL=https://frontend-dozm1fxke-netzors-projects.vercel.app
NODE_ENV=production
```

## Step 5: Deploy

Railway will automatically deploy when you:
- Push to GitHub, or
- Click "Deploy" button

## Step 6: Get Backend URL

After deployment:
1. Go to Settings → Networking
2. Generate a domain (or use the provided one)
3. Copy the URL (e.g., `your-backend.railway.app`)

## Step 7: Update Frontend

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api`

## Notes

- Railway free tier gives $5 credit monthly
- App may sleep after inactivity (wakes automatically)
- MongoDB Atlas is free tier
- Razorpay keys can be added later


