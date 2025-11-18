# MOCXS E-commerce Website

A complete, production-ready e-commerce website for MOCXS, a premium Indian clothing and lifestyle brand.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Payment Gateway**: Razorpay

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install:all
```

Or manually:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

#### Backend Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**To get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string and replace `<password>` with your password

**To get Razorpay keys:**
1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Settings > API Keys
3. Generate test keys for development

#### Frontend Configuration

Create a `.env.local` file in the `frontend` directory:

```bash
cd frontend
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
```

### 3. Run the Application

#### Option 1: Run Both Frontend and Backend Together

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend server on `http://localhost:3000`

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
MOCXS/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── lib/             # Utilities and API client
│   └── package.json
└── package.json         # Root package.json
```

## 🔑 Default Admin Account

To create an admin account, you can either:

1. **Use MongoDB Compass/Atlas UI:**
   - Create a user manually and set `role: "admin"`

2. **Use the API:**
   - Register a user normally
   - Update the user document in MongoDB to set `role: "admin"`

## 🧪 Testing the Application

1. **Register a new user** at `/login`
2. **Browse products** at `/shop`
3. **Add products to cart**
4. **Checkout** (use Razorpay test credentials)
5. **View orders** in `/account/orders`

## 📦 Seeding Sample Products (Optional)

You can add sample products using the admin API or MongoDB directly. Example product structure:

```json
{
  "name": "Men's Cotton T-Shirt",
  "description": "Premium cotton t-shirt for men",
  "price": 799,
  "originalPrice": 999,
  "category": "Men",
  "images": ["https://example.com/image.jpg"],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": [{"name": "Black", "hex": "#000000"}],
  "stock": 100,
  "featured": true
}
```

## 🚢 Production Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

3. Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL` - Your backend API URL
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Your Razorpay key

### Backend (Render/Railway/Heroku)

1. Set environment variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `FRONTEND_URL` - Your frontend URL

2. Deploy:
```bash
cd backend
# Follow platform-specific deployment instructions
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Use Razorpay production keys only in production

## 📝 API Endpoints

### Public
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Protected (Requires Auth)
- `GET /api/auth/me` - Get current user
- `GET /api/users/profile` - Get user profile
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Admin Only
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/admin/stats` - Get dashboard stats

## 🐛 Troubleshooting

**Backend won't start:**
- Check if MongoDB connection string is correct
- Ensure PORT 5000 is not in use
- Verify all environment variables are set

**Frontend won't start:**
- Check if backend is running
- Verify `NEXT_PUBLIC_API_URL` is correct
- Clear `.next` folder and rebuild

**Payment not working:**
- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure Razorpay script is loaded

## 📞 Support

For issues or questions, please check the documentation or create an issue.

---

**Made with ❤️ for MOCXS**

