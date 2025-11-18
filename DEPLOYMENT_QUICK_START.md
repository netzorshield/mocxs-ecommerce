# 🚀 Quick Start Deployment Guide for Hostinger

This is a condensed version of the deployment guide. For detailed instructions, see `HOSTINGER_DEPLOYMENT.md`.

## Prerequisites Checklist

- [ ] Hostinger VPS/Cloud hosting account
- [ ] Domain name (optional)
- [ ] MongoDB Atlas account (free tier works)
- [ ] Razorpay account (for payments)
- [ ] SSH access to your server

## Step-by-Step Deployment

### 1. Prepare Your Local Files

```bash
# Build frontend for production
cd frontend
npm install
npm run build
cd ..
```

### 2. Upload Files to Server

**Option A: Using FTP/SFTP**
- Use FileZilla or similar
- Upload entire project to `/home/username/domains/yourdomain.com/public_html`

**Option B: Using SSH**
```bash
# Compress project
tar -czf mocxs-deploy.tar.gz backend frontend package.json ecosystem.config.js

# Upload
scp mocxs-deploy.tar.gz username@your-server-ip:/home/username/

# SSH into server
ssh username@your-server-ip

# Extract
cd /home/username/domains/yourdomain.com/public_html
tar -xzf ~/mocxs-deploy.tar.gz
```

### 3. Install Node.js (if needed)

```bash
# Check if Node.js is installed
node -v

# If not, install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

### 4. Install Dependencies

```bash
cd /path/to/your/project

# Install all dependencies
npm install
cd backend && npm install --production
cd ../frontend && npm install --production
```

### 5. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-32-character-secret-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
FRONTEND_URL=https://yourdomain.com
```

**Frontend** (`frontend/.env.production`):
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
```

### 6. Build Frontend

```bash
cd frontend
npm run build
```

### 7. Start Application with PM2

```bash
# From project root
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup auto-start on reboot
pm2 startup
```

### 8. Configure Nginx (Optional but Recommended)

See `NGINX_CONFIG.md` for detailed Nginx setup.

Quick setup:
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/mocxs
# (Copy config from NGINX_CONFIG.md)
sudo ln -s /etc/nginx/sites-available/mocxs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 9. Setup SSL Certificate

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 10. Verify Deployment

- Frontend: `https://yourdomain.com`
- Backend API: `https://yourdomain.com/api/health`
- Check PM2: `pm2 list`
- Check logs: `pm2 logs`

## Common Commands

```bash
# View running processes
pm2 list

# View logs
pm2 logs

# Restart application
pm2 restart all

# Stop application
pm2 stop all

# Monitor resources
pm2 monit
```

## Troubleshooting

**Backend not starting?**
```bash
pm2 logs mocxs-backend
cd backend && node server.js  # Test directly
```

**Frontend not loading?**
```bash
pm2 logs mocxs-frontend
cd frontend && npm run build  # Rebuild
```

**MongoDB connection issues?**
- Check MongoDB Atlas IP whitelist
- Verify connection string in `.env`
- Test: `cd backend && node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"`

## Next Steps

1. ✅ Test all features (login, products, cart, checkout)
2. ✅ Setup domain DNS records
3. ✅ Configure email notifications (if needed)
4. ✅ Setup backups
5. ✅ Monitor application performance

---

**Need Help?** See `HOSTINGER_DEPLOYMENT.md` for detailed instructions.

