# Environment Variables for Production Deployment

## Backend Environment Variables

Create `backend/.env` on your production server with the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Database
# Get this from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority

# JWT Secret Key (Generate a random 32+ character string)
# You can generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long-change-this

# Frontend URL (Your production domain)
FRONTEND_URL=https://yourdomain.com

# Razorpay Payment Gateway (Production Keys)
# Get these from: https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-production-secret-key
```

## Frontend Environment Variables

Create `frontend/.env.production` on your production server:

```env
# Backend API URL
# If using subdomain: https://api.yourdomain.com/api
# If using same domain: https://yourdomain.com/api
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api

# Razorpay Key ID (Public key - same as backend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

## Important Notes

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (or use existing)
3. Go to **Database Access** → Create database user
4. Go to **Network Access** → Add your server IP address (or 0.0.0.0/0 for all IPs)
5. Go to **Database** → Click **Connect** → **Connect your application**
6. Copy the connection string
7. Replace `<password>` with your database password
8. Replace `<dbname>` with `mocxs` (or your preferred database name)

### 2. Razorpay Production Keys

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Switch to **Live Mode** (not Test Mode)
4. Generate or copy your **Key ID** and **Key Secret**
5. Use these in both backend and frontend environment files

### 3. Security Best Practices

- **Never commit `.env` files to Git**
- Use strong, random JWT_SECRET (32+ characters)
- Keep Razorpay keys secure
- Use HTTPS in production
- Regularly rotate secrets

### 4. Generating Secure Secrets

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Generate Random String:**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## Example Production Configuration

### Backend `.env` Example:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://mocxs_user:SecurePass123@cluster0.abc123.mongodb.net/mocxs?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
FRONTEND_URL=https://mocxs.com
RAZORPAY_KEY_ID=rzp_live_ABC123XYZ789
RAZORPAY_KEY_SECRET=secret_abc123xyz789def456
```

### Frontend `.env.production` Example:
```env
NEXT_PUBLIC_API_URL=https://api.mocxs.com/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_ABC123XYZ789
```

## Testing Environment Variables

### Test Backend Connection:
```bash
cd backend
node -e "require('dotenv').config(); console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set ✓' : 'Missing ✗');"
```

### Test Frontend Variables:
```bash
cd frontend
node -e "require('dotenv').config({ path: '.env.production' }); console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || 'Missing');"
```

