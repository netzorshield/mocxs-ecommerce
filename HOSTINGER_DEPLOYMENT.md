# 🚀 Hostinger Deployment Guide for MOCXS

This guide will help you deploy your MOCXS e-commerce website to Hostinger.

## 📋 Prerequisites

1. **Hostinger Account** with one of the following:
   - **VPS Hosting** (Recommended) - Full Node.js support
   - **Cloud Hosting** - Node.js support available
   - **Shared Hosting** - Limited Node.js support (may require custom setup)

2. **Domain Name** (optional but recommended)

3. **MongoDB Atlas Account** (Free tier works fine)

4. **Razorpay Account** (for payment processing)

## 🔧 Step 1: Choose Your Hosting Plan

### Option A: VPS Hosting (Recommended)
- Full control over server
- Node.js and npm pre-installed
- SSH access
- Best for production applications

### Option B: Cloud Hosting
- Node.js support available
- Managed environment
- Good for scaling

### Option C: Shared Hosting
- May require Node.js installation
- Limited customization
- Contact Hostinger support for Node.js setup

## 📦 Step 2: Prepare Your Application

### 2.1 Build the Frontend

On your local machine, build the Next.js frontend:

```bash
cd frontend
npm install
npm run build
```

This creates an optimized production build in `frontend/.next`

### 2.2 Prepare Environment Variables

Create production environment files (see `DEPLOYMENT_ENV_TEMPLATE.md` for details):

- `backend/.env.production`
- `frontend/.env.production`

## 🌐 Step 3: Upload Files to Hostinger

### Method 1: Using File Manager (Shared/Cloud Hosting)

1. Log in to your Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain folder)
4. Upload your project files:
   - Upload entire `backend` folder
   - Upload entire `frontend` folder
   - Upload `package.json` from root

### Method 2: Using FTP/SFTP (Recommended for VPS)

1. Get FTP credentials from Hostinger hPanel
2. Use FileZilla or similar FTP client
3. Connect to your server
4. Upload project files to `/home/username/domains/yourdomain.com/public_html`

### Method 3: Using SSH (VPS Only)

```bash
# On your local machine, compress the project
tar -czf mocxs-deploy.tar.gz backend frontend package.json

# Upload via SCP
scp mocxs-deploy.tar.gz username@your-server-ip:/home/username/

# SSH into server
ssh username@your-server-ip

# Extract files
cd /home/username/domains/yourdomain.com/public_html
tar -xzf ~/mocxs-deploy.tar.gz
```

## ⚙️ Step 4: Server Setup (VPS)

### 4.1 Install Node.js (if not installed)

```bash
# Check Node.js version
node -v

# If not installed, install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### 4.2 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 4.3 Install Dependencies

```bash
# Navigate to project directory
cd /home/username/domains/yourdomain.com/public_html

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install --production

# Install frontend dependencies
cd ../frontend
npm install --production
```

## 🔐 Step 5: Configure Environment Variables

### 5.1 Backend Environment Variables

Create `backend/.env` on the server:

```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
RAZORPAY_KEY_ID=your-production-razorpay-key-id
RAZORPAY_KEY_SECRET=your-production-razorpay-key-secret
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

### 5.2 Frontend Environment Variables

Create `frontend/.env.production` on the server:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-production-razorpay-key-id
```

**Note:** Replace `yourdomain.com` with your actual domain name.

## 🏗️ Step 6: Build Frontend on Server

```bash
cd frontend
npm run build
```

This creates the production build optimized for your server.

## 🚀 Step 7: Start the Application

### Option A: Using PM2 (Recommended for VPS)

```bash
# Start backend
cd backend
pm2 start server.js --name mocxs-backend

# Start frontend
cd ../frontend
pm2 start npm --name mocxs-frontend -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
```

### Option B: Using Node.js Directly

```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
npm start
```

### Option C: Using Nginx Reverse Proxy (Recommended)

See `NGINX_CONFIG.md` for detailed Nginx configuration.

## 🌍 Step 8: Configure Domain and DNS

### 8.1 Point Domain to Server

1. Go to your domain registrar
2. Update DNS records:
   - **A Record**: `@` → Your server IP
   - **A Record**: `www` → Your server IP
   - **A Record**: `api` → Your server IP (for API subdomain)

### 8.2 SSL Certificate (HTTPS)

1. In Hostinger hPanel, go to **SSL**
2. Install free SSL certificate (Let's Encrypt)
3. Enable HTTPS for your domain

## 🔄 Step 9: Update CORS and API URLs

### Update Backend CORS

Edit `backend/server.js` to allow your production domain:

```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

### Update Frontend API URL

Ensure `frontend/.env.production` has:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

Or if using same domain:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

## 📝 Step 10: Verify Deployment

1. **Check Backend Health:**
   ```
   https://api.yourdomain.com/api/health
   ```

2. **Check Frontend:**
   ```
   https://yourdomain.com
   ```

3. **Test Features:**
   - User registration/login
   - Product browsing
   - Add to cart
   - Checkout process

## 🔧 Troubleshooting

### Backend Not Starting

```bash
# Check logs
pm2 logs mocxs-backend

# Check if port is in use
netstat -tulpn | grep 5000

# Check MongoDB connection
cd backend
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
```

### Frontend Not Loading

```bash
# Check logs
pm2 logs mocxs-frontend

# Rebuild frontend
cd frontend
rm -rf .next
npm run build
pm2 restart mocxs-frontend
```

### MongoDB Connection Issues

1. Check MongoDB Atlas:
   - Cluster is running (not paused)
   - IP whitelist includes your server IP
   - Connection string is correct

2. Test connection:
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(e => console.error(e))"
```

### Port Issues

If port 5000 is blocked, change it in `backend/.env`:

```env
PORT=3001
```

And update frontend API URL accordingly.

## 📊 Monitoring

### PM2 Monitoring Commands

```bash
# View all processes
pm2 list

# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart application
pm2 restart all

# Stop application
pm2 stop all
```

## 🔄 Updating Your Application

1. **Upload new files** to server
2. **Install dependencies** (if package.json changed):
   ```bash
   cd backend && npm install --production
   cd ../frontend && npm install --production
   ```
3. **Rebuild frontend**:
   ```bash
   cd frontend && npm run build
   ```
4. **Restart services**:
   ```bash
   pm2 restart all
   ```

## 📞 Support

- **Hostinger Support**: https://www.hostinger.com/contact
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Razorpay Support**: https://razorpay.com/support/

## ✅ Checklist

- [ ] Hostinger account created
- [ ] Domain configured
- [ ] Files uploaded to server
- [ ] Node.js installed (VPS)
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Frontend built
- [ ] Backend running
- [ ] Frontend running
- [ ] SSL certificate installed
- [ ] DNS records configured
- [ ] CORS updated
- [ ] MongoDB Atlas configured
- [ ] Razorpay keys configured
- [ ] Application tested

---

**Need Help?** Check the troubleshooting section or contact Hostinger support for server-specific issues.

