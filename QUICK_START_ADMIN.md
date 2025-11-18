# Quick Start - Admin Panel

## 🚀 Get Started in 3 Steps

### Step 1: Create Admin Account

**Option A: Using Seed Script (Easiest)**
```powershell
cd backend
npm run seed
```
This creates: `admin@mocxs.com` / `admin123`

**Option B: Manual Method**
1. Register normally at http://localhost:3000/login
2. Open MongoDB Atlas/database
3. Find your user document
4. Change `role: "user"` to `role: "admin"`
5. Save

### Step 2: Login as Admin

1. Go to: http://localhost:3000/login
2. Login with admin credentials
3. Click your user icon (top right)
4. Click **"Admin Panel"**

### Step 3: Start Managing!

- **Add Products** - Click "Add New Product"
- **Manage Users** - Click "Manage Users"
- **View Orders** - Click "View Orders"

---

## 📦 Adding Your First Product

1. Go to Admin Dashboard
2. Click **"Add New Product"**
3. Fill in:
   - Name: "Men's Cotton T-Shirt"
   - Description: "Premium cotton t-shirt..."
   - Price: 799
   - Category: Men
   - Stock: 100
   - Sizes: Check M, L, XL
   - Images: Add image URL (e.g., from Unsplash)
4. Click **"Create Product"**
5. Done! Product is now live!

---

## 👥 Making Someone Admin

1. Go to Admin Panel → Users
2. Find the user
3. Click Edit icon
4. Change Role to "Admin"
5. Save
6. They now have admin access!

---

## 📋 Common Tasks

| Task | How To |
|------|--------|
| Add Product | Admin → Add New Product → Fill form → Create |
| Edit Product | Admin → Products → Edit icon → Modify → Save |
| Delete Product | Admin → Products → Delete icon → Confirm |
| View Users | Admin → Manage Users |
| Make Admin | Users → Edit → Change Role → Save |
| View Orders | Admin → View Orders |
| Update Order | Orders → View → Change Status → Save |

---

## 🎯 Admin Panel URLs

- Dashboard: http://localhost:3000/admin
- Products: http://localhost:3000/admin/products
- Add Product: http://localhost:3000/admin/products/new
- Users: http://localhost:3000/admin/users
- Orders: http://localhost:3000/admin/orders

---

**That's it! You're ready to manage your store!** 🎉

For detailed guide, see `ADMIN_PANEL_GUIDE.md`












