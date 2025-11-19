# 🔄 MOCXS System Architecture & Update Flow

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Complete Data Flow](#complete-data-flow)
3. [Step-by-Step Update Process](#step-by-step-update-process)
4. [Local Development Flow](#local-development-flow)
5. [Production Deployment Flow](#production-deployment-flow)
6. [Component Details](#component-details)

---

## 🎯 System Overview

Your MOCXS e-commerce system consists of:

```
┌─────────────────────────────────────────────────────────────┐
│                    MOCXS E-COMMERCE SYSTEM                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   Frontend   │      │    Backend   │      │  Database │ │
│  │  (Next.js)   │◄────►│  (Express)   │◄────►│ (MongoDB) │ │
│  │   Port 3000  │      │   Port 5000  │      │   Atlas   │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                            │
│         │                      │                            │
│    ┌────▼────┐           ┌────▼────┐                       │
│    │ Vercel  │           │ Railway │                       │
│    │ (Cloud) │           │ (Cloud) │                       │
│    └─────────┘           └─────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete Data Flow

### Visual Flow Diagram

```
LOCAL FILES (Your Computer)
    │
    │ 1. Admin creates/updates product
    │    - Uploads images from local files
    │    - Fills product form
    │
    ▼
┌─────────────────────────────────────────┐
│   LOCAL DEVELOPMENT ENVIRONMENT         │
│                                         │
│  ┌──────────────┐      ┌──────────────┐│
│  │   Frontend   │      │    Backend   ││
│  │ localhost:   │      │ localhost:   ││
│  │    3000      │◄────►│    5000      ││
│  └──────────────┘      └──────────────┘│
│         │                      │        │
│         │                      │        │
│         │  2. API Request      │        │
│         │  POST /api/products  │        │
│         │                      │        │
│         │  3. Image Upload     │        │
│         │  POST /api/upload/   │        │
│         │      images          │        │
│         │                      │        │
│         │  4. Save to Local   │        │
│         │  backend/uploads/    │        │
│         │     products/        │        │
│         │                      │        │
│         │  5. Save to MongoDB  │        │
│         │  (Local or Atlas)    │        │
│         └──────────────────────┘        │
└─────────────────────────────────────────┘
    │
    │ 6. Push to GitHub
    │    git add .
    │    git commit -m "Update products"
    │    git push origin main
    │
    ▼
┌─────────────────────────────────────────┐
│         GITHUB REPOSITORY               │
│    (Code Version Control)               │
└─────────────────────────────────────────┘
    │
    │ 7. Auto-deploy triggers
    │
    ├─────────────────┬───────────────────┘
    │                 │
    ▼                 ▼
┌──────────┐    ┌──────────┐
│  Vercel  │    │ Railway  │
│ (Frontend│    │ (Backend)│
│  Deploy) │    │  Deploy) │
└──────────┘    └──────────┘
    │                 │
    │                 │ 8. Backend connects to
    │                 │    MongoDB Atlas
    │                 │
    │                 │ 9. Backend serves API
    │                 │    from Railway URL
    │                 │
    │                 │ 10. Images stored in
    │                 │     Railway filesystem
    │                 │     (or cloud storage)
    │                 │
    └─────────┬───────┘
              │
              │ 11. Frontend fetches data
              │     from Railway API
              │
              ▼
    ┌─────────────────────┐
    │   PRODUCTION SITE   │
    │   (Live Website)    │
    │                     │
    │  Users browse       │
    │  products from      │
    │  MongoDB Atlas      │
    └─────────────────────┘
```

---

## 📝 Step-by-Step Update Process

### Phase 1: Local Development (Your Computer)

#### Step 1: Start Local Servers

```bash
# Terminal 1 - Backend
cd D:\MOCXS\backend
npm run dev
# Server starts on http://localhost:5000

# Terminal 2 - Frontend  
cd D:\MOCXS\frontend
npm run dev
# Server starts on http://localhost:3000
```

**What happens:**
- Backend connects to MongoDB (local or Atlas)
- Frontend connects to backend API
- Both servers watch for file changes

---

#### Step 2: Admin Creates/Updates Product

**Location:** `http://localhost:3000/admin/products/new`

**Process:**

1. **Admin logs in** → JWT token stored in cookies
2. **Admin fills product form:**
   - Product name, description, price
   - Category, sizes, colors
   - Stock quantity

3. **Image Upload (Two Methods):**

   **Method A: Upload Local Files**
   ```
   User selects image files from computer
        │
        ▼
   Frontend: handleImageUpload() function
        │
        ▼
   Creates FormData with image file
        │
        ▼
   POST /api/upload/image
   Headers: Authorization: Bearer <token>
   Body: multipart/form-data
        │
        ▼
   Backend: upload.js route
        │
        ▼
   Middleware: upload.js (Multer)
   - Validates file type (jpg, png, gif, webp)
   - Checks file size (max 5MB)
   - Generates unique filename
        │
        ▼
   Saves to: backend/uploads/products/
   Filename: name-timestamp-random.ext
        │
        ▼
   Returns: { url: "/uploads/products/filename.jpg" }
        │
        ▼
   Frontend adds URL to formData.images array
   ```

   **Method B: Use Image URLs**
   ```
   Admin enters image URL directly
        │
        ▼
   URL added to formData.images array
   (No upload needed)
   ```

4. **Submit Product Form:**
   ```
   Frontend: handleSubmit() function
        │
        ▼
   Process images:
   - Convert local paths to full URLs
   - Keep external URLs as-is
        │
        ▼
   Prepare productData object:
   {
     name, description, price,
     images: [processed URLs],
     sizes, colors, stock, etc.
   }
        │
        ▼
   POST /api/admin/products
   Headers: Authorization: Bearer <token>
   Body: productData (JSON)
        │
        ▼
   Backend: products.js route
        │
        ▼
   Middleware: auth.js (verifies token)
   Middleware: admin.js (checks admin role)
        │
        ▼
   Create new Product document
        │
        ▼
   Save to MongoDB:
   - Local: mongodb://localhost:27017/mocxs
   - OR Atlas: mongodb+srv://...@cluster.mongodb.net/mocxs
        │
        ▼
   Returns: Created product object
        │
        ▼
   Frontend: Success toast → Redirect to /admin/products
   ```

---

#### Step 3: Data Storage Locations

**Local Development:**

```
D:\MOCXS\
├── backend/
│   ├── uploads/
│   │   └── products/
│   │       ├── tshirt-1234567890-123456789.jpg
│   │       ├── pants-1234567891-987654321.png
│   │       └── ...
│   │
│   └── .env
│       MONGODB_URI=mongodb://localhost:27017/mocxs
│       (OR mongodb+srv://...@atlas.../mocxs)
│
└── MongoDB Database (Local or Atlas)
    └── mocxs database
        └── products collection
            └── {
                  _id: ObjectId("..."),
                  name: "Men's T-Shirt",
                  images: [
                    "http://localhost:5000/uploads/products/tshirt-123.jpg"
                  ],
                  price: 799,
                  ...
                }
```

---

### Phase 2: Deployment to Production

#### Step 4: Push Code to GitHub

```bash
# In your project root
git add .
git commit -m "Add new products"
git push origin main
```

**What happens:**
- Code is pushed to GitHub repository
- Vercel and Railway are connected to this repo
- They detect the push and trigger auto-deployment

---

#### Step 5: Vercel Deployment (Frontend)

**Automatic Process:**

```
GitHub push detected
    │
    ▼
Vercel webhook triggered
    │
    ▼
Vercel clones repository
    │
    ▼
Reads vercel.json (if exists)
Sets root directory: frontend/
    │
    ▼
Installs dependencies:
npm install (in frontend/)
    │
    ▼
Builds Next.js app:
npm run build
    │
    ▼
Creates production build:
.next/ folder with optimized code
    │
    ▼
Deploys to Vercel CDN:
- Static pages
- Server-side rendered pages
- API routes (if any)
    │
    ▼
Frontend live at:
https://your-app.vercel.app
```

**Environment Variables (Vercel Dashboard):**
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key
```

**Important:** 
- Frontend is STATIC after build
- It makes API calls to Railway backend
- Images are served from Railway backend

---

#### Step 6: Railway Deployment (Backend)

**Automatic Process:**

```
GitHub push detected
    │
    ▼
Railway webhook triggered
    │
    ▼
Railway clones repository
    │
    ▼
Sets root directory: backend/
    │
    ▼
Reads package.json
Detects Node.js project
    │
    ▼
Installs dependencies:
npm install
    │
    ▼
Reads environment variables:
- MONGODB_URI (from Railway dashboard)
- JWT_SECRET
- RAZORPAY_KEY_ID
- FRONTEND_URL
    │
    ▼
Starts server:
node server.js
    │
    ▼
Connects to MongoDB Atlas:
mongoose.connect(MONGODB_URI)
    │
    ▼
Backend live at:
https://your-backend.railway.app
```

**Environment Variables (Railway Dashboard):**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mocxs?...
JWT_SECRET=your-32-char-secret-key
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=5000 (auto-assigned by Railway)
```

**Important:**
- Railway assigns a random PORT
- Backend uses `process.env.PORT`
- MongoDB Atlas must whitelist Railway IPs (or 0.0.0.0/0)

---

#### Step 7: MongoDB Atlas Connection

**How it works:**

```
Railway Backend starts
    │
    ▼
Reads MONGODB_URI from environment
    │
    ▼
mongoose.connect(MONGODB_URI)
    │
    ▼
MongoDB Atlas receives connection
    │
    ▼
Checks IP whitelist:
- Railway server IP must be allowed
- OR 0.0.0.0/0 (allow all - for development)
    │
    ▼
Checks authentication:
- Username/password from connection string
    │
    ▼
Connects to database: "mocxs"
    │
    ▼
Connection established ✅
```

**MongoDB Atlas Structure:**
```
MongoDB Atlas Cluster
└── mocxs database
    ├── products collection
    │   └── [Product documents]
    ├── users collection
    │   └── [User documents]
    └── orders collection
        └── [Order documents]
```

---

### Phase 3: Production Update Flow

#### Step 8: Admin Updates Product in Production

**Process:**

```
Admin visits: https://your-app.vercel.app/admin/products
    │
    ▼
Frontend (Vercel) loads
    │
    ▼
Makes API call:
GET https://your-backend.railway.app/api/products
    │
    ▼
Backend (Railway) receives request
    │
    ▼
Queries MongoDB Atlas:
Product.find({})
    │
    ▼
MongoDB Atlas returns products
    │
    ▼
Backend sends JSON response
    │
    ▼
Frontend displays products
```

**When Admin Updates:**

```
Admin edits product
    │
    ▼
Uploads new image (if needed)
    │
    ▼
POST https://your-backend.railway.app/api/upload/image
    │
    ▼
Railway backend receives file
    │
    ▼
Saves to Railway filesystem:
/backend/uploads/products/filename.jpg
    │
    ▼
Returns URL:
/uploads/products/filename.jpg
    │
    ▼
Admin submits form
    │
    ▼
PUT https://your-backend.railway.app/api/admin/products/:id
    │
    ▼
Backend updates MongoDB Atlas:
Product.findByIdAndUpdate(id, data)
    │
    ▼
MongoDB Atlas updates document
    │
    ▼
Returns updated product
    │
    ▼
Frontend shows success message
```

---

## 🔍 Component Details

### 1. Frontend (Next.js) - Vercel

**Technology:** Next.js 14, React, TypeScript

**Key Files:**
- `frontend/app/admin/products/new/page.tsx` - Create product form
- `frontend/app/admin/products/[id]/edit/page.tsx` - Edit product form
- `frontend/lib/api.ts` - API client (Axios)

**Responsibilities:**
- User interface
- Form handling
- Image upload UI
- API calls to backend
- Authentication (JWT tokens in cookies)

**Deployment:**
- Static build deployed to Vercel CDN
- Environment variables set in Vercel dashboard
- Auto-deploys on git push

---

### 2. Backend (Express.js) - Railway

**Technology:** Node.js, Express.js, Mongoose

**Key Files:**
- `backend/server.js` - Main server file
- `backend/routes/products.js` - Product CRUD routes
- `backend/routes/upload.js` - Image upload routes
- `backend/middleware/upload.js` - Multer configuration
- `backend/models/Product.js` - Product schema

**Responsibilities:**
- REST API endpoints
- Authentication & authorization
- File upload handling
- Database operations
- Image serving

**Deployment:**
- Runs on Railway server
- Environment variables set in Railway dashboard
- Auto-deploys on git push
- Serves static files from `/uploads` directory

---

### 3. Database (MongoDB) - Atlas

**Technology:** MongoDB (NoSQL)

**Collections:**
- `products` - Product data
- `users` - User accounts
- `orders` - Order history

**Connection:**
- Connection string in `MONGODB_URI`
- IP whitelist configured in Atlas dashboard
- Authentication via username/password

**Data Flow:**
- All CRUD operations go through Mongoose
- Data stored as JSON documents
- Images stored as URLs (not in database)

---

### 4. Image Storage

**Local Development:**
```
backend/uploads/products/
├── tshirt-1234567890-123456789.jpg
├── pants-1234567891-987654321.png
└── ...
```

**Production (Railway):**
```
Railway filesystem:
/backend/uploads/products/
├── tshirt-1234567890-123456789.jpg
├── pants-1234567891-987654321.png
└── ...
```

**Served at:**
- Local: `http://localhost:5000/uploads/products/filename.jpg`
- Production: `https://your-backend.railway.app/uploads/products/filename.jpg`

**Note:** Railway filesystem is ephemeral (may reset on redeploy). For production, consider:
- Cloud storage (AWS S3, Cloudinary, etc.)
- CDN for images
- Persistent volume mounts

---

## 🔄 Update Scenarios

### Scenario 1: Add New Product (Local → Production)

```
1. Local Development:
   - Admin creates product at localhost:3000/admin/products/new
   - Images uploaded to backend/uploads/products/
   - Product saved to MongoDB (local or Atlas)

2. Push to GitHub:
   - git add .
   - git commit -m "Add new product"
   - git push origin main

3. Auto-Deploy:
   - Vercel builds and deploys frontend
   - Railway builds and deploys backend
   - Both connect to MongoDB Atlas

4. Production:
   - Product visible at your-app.vercel.app
   - Images served from Railway backend
   - Data stored in MongoDB Atlas
```

### Scenario 2: Update Existing Product (Production)

```
1. Admin logs in to production site
2. Edits product at /admin/products/:id/edit
3. Uploads new image (saved to Railway filesystem)
4. Submits form
5. Backend updates MongoDB Atlas
6. Changes reflected immediately
```

### Scenario 3: Seed Database (Initial Setup)

```
1. Local: Run seed script
   cd backend
   npm run seed

2. Script:
   - Connects to MongoDB Atlas
   - Clears existing products
   - Inserts sample products
   - Creates admin user

3. Production:
   - Products immediately available
   - No deployment needed (database is shared)
```

---

## 🚨 Important Notes

### 1. Environment Variables
- **Never commit `.env` files to GitHub**
- Set variables in Vercel/Railway dashboards
- Different values for development vs production

### 2. MongoDB Atlas
- **Shared between local and production**
- Changes in production affect local (if using Atlas)
- Use separate databases for dev/prod (recommended)

### 3. Image Storage
- **Railway filesystem is temporary**
- Images may be lost on redeploy
- Consider cloud storage for production

### 4. CORS Configuration
- Backend must allow frontend origin
- Set `FRONTEND_URL` in Railway
- CORS configured in `backend/server.js`

### 5. Authentication
- JWT tokens stored in cookies
- Tokens expire (check auth middleware)
- Admin role required for product management

---

## 📊 Data Flow Summary

```
LOCAL FILES
    ↓
LOCAL DEVELOPMENT (localhost:3000 + localhost:5000)
    ↓
MongoDB (Local or Atlas)
    ↓
GITHUB (Code Repository)
    ↓
VERCEL (Frontend Deployment)
    ↓
RAILWAY (Backend Deployment)
    ↓
MongoDB Atlas (Production Database)
    ↓
LIVE WEBSITE (Users)
```

---

## 🛠️ Troubleshooting

### Images not showing in production
- Check Railway uploads directory exists
- Verify image URLs are correct
- Check CORS settings
- Consider using cloud storage

### Database connection fails
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Frontend can't reach backend
- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check Railway backend URL
- Verify CORS configuration
- Check network tab in browser console

---

**Last Updated:** 2024
**System Version:** MOCXS E-commerce v1.0

