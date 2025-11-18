# Admin Panel Guide - Complete Operations Manual

## 🎯 Overview

The MOCXS Admin Panel allows you to manage products, users, and orders from a web interface.

## 🔐 Accessing Admin Panel

### Step 1: Create Admin Account

**Option A: Using MongoDB (Recommended)**
1. Register a normal user account at `/login`
2. Go to MongoDB Atlas or your MongoDB database
3. Find the user document
4. Change `role` field from `"user"` to `"admin"`
5. Save the document

**Option B: Using Seed Script**
```powershell
cd backend
npm run seed
```
This creates: `admin@mocxs.com` / `admin123`

### Step 2: Login as Admin
1. Go to: http://localhost:3000/login
2. Login with admin credentials
3. Click on your user icon in header
4. Click **"Admin Panel"**

---

## 📦 Managing Products

### View All Products
1. Go to Admin Dashboard
2. Click **"Manage Products"** or go to `/admin/products`
3. See all products in a table

### Add New Product
1. Click **"Add Product"** button
2. Fill in the form:
   - **Product Name** (required)
   - **Description** (required)
   - **Price** (required) - in ₹
   - **Original Price** (optional) - for showing discounts
   - **Category** (required) - Men, Women, Kids, etc.
   - **Subcategory** (optional) - e.g., T-Shirts, Jeans
   - **Stock Quantity** (required)
   - **Available Sizes** - Check boxes for available sizes
   - **Colors** - Add color name and hex code
   - **Product Images** - Add image URLs (one per line)
   - **Featured** - Check to show on homepage
3. Click **"Create Product"**

### Edit Product
1. Go to Products page
2. Click **Edit icon** (pencil) next to product
3. Modify fields
4. Click **"Save Changes"**

### Delete Product
1. Go to Products page
2. Click **Delete icon** (trash) next to product
3. Confirm deletion

---

## 👥 Managing Users

### View All Users
1. Go to Admin Dashboard
2. Click **"Manage Users"** or go to `/admin/users`
3. See all users in a table

### Edit User
1. Go to Users page
2. Click **Edit icon** next to user
3. Modify:
   - Name
   - Email
   - Phone
   - Role (user/admin)
4. Save changes

### Delete User
1. Go to Users page
2. Click **Delete icon** next to user
3. Confirm deletion
4. **Note:** Cannot delete admin users

---

## 📋 Managing Orders

### View All Orders
1. Go to Admin Dashboard
2. Click **"Manage Orders"** or go to `/admin/orders`
3. See all orders with:
   - Order ID
   - Customer info
   - Items count
   - Total amount
   - Status
   - Payment status
   - Date

### Update Order Status
1. Go to Orders page
2. Click **"View"** on an order
3. Change order status:
   - **Pending** - Order just placed
   - **Processing** - Being prepared
   - **Shipped** - Sent to customer
   - **Delivered** - Received by customer
   - **Cancelled** - Order cancelled
4. Save changes

---

## 📊 Dashboard Statistics

The Admin Dashboard shows:
- **Total Products** - Number of products in store
- **Total Users** - Number of registered users
- **Total Orders** - Number of orders placed
- **Total Revenue** - Sum of all paid orders
- **Recent Orders** - Last 10 orders

---

## 🔧 API Endpoints (For Reference)

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Users
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get single user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Orders
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get single order
- `PUT /api/admin/orders/:id/status` - Update order status

### Stats
- `GET /api/admin/stats` - Get dashboard statistics

---

## 💡 Tips & Best Practices

### Product Images
- Use image URLs (e.g., from Unsplash, Cloudinary, or your hosting)
- Example: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500`
- Add multiple images for better product display

### Product Pricing
- Set `originalPrice` higher than `price` to show discount
- Example: Price: ₹799, Original Price: ₹999 (shows 20% off)

### Stock Management
- Update stock when products are sold
- Set stock to 0 for out-of-stock items

### Order Processing
- Update order status as you process orders
- Mark as "Shipped" when dispatched
- Mark as "Delivered" when confirmed received

---

## 🚨 Common Tasks

### Add Multiple Products Quickly
1. Use the "Add Product" form
2. Fill in details
3. Copy similar products and modify
4. Save each one

### Bulk Update Stock
1. Go to Products page
2. Click Edit on each product
3. Update stock quantity
4. Save

### Check Order Details
1. Go to Orders page
2. Click "View" on any order
3. See full order details including:
   - Customer address
   - Items ordered
   - Payment method
   - Order history

---

## 🔒 Security Notes

- Only users with `role: "admin"` can access admin panel
- All admin routes require authentication
- Admin users cannot be deleted through the UI
- Always verify admin access before making changes

---

## 📝 Quick Reference

| Task | Location | Action |
|------|----------|--------|
| Add Product | `/admin/products/new` | Fill form → Create |
| Edit Product | `/admin/products` → Edit icon | Modify → Save |
| Delete Product | `/admin/products` → Delete icon | Confirm |
| View Users | `/admin/users` | View table |
| Edit User | `/admin/users` → Edit icon | Modify → Save |
| View Orders | `/admin/orders` | View table |
| Update Order | `/admin/orders` → View | Change status → Save |

---

**The admin panel is now fully functional! Start managing your e-commerce store!** 🎉












