const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const sampleProducts = [
  {
    name: "Men's Cotton T-Shirt",
    description: "Premium quality cotton t-shirt for men. Comfortable, breathable, and perfect for everyday wear.",
    price: 799,
    originalPrice: 999,
    category: "Men",
    subcategory: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy Blue", hex: "#1e3a8a" }
    ],
    stock: 100,
    featured: true,
    rating: 4.5
  },
  {
    name: "Women's Sports Bra",
    description: "High-support sports bra designed for active women. Moisture-wicking fabric keeps you dry during workouts.",
    price: 999,
    originalPrice: 1299,
    category: "Women",
    subcategory: "Activewear",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Pink", hex: "#FFC0CB" }
    ],
    stock: 75,
    featured: true,
    rating: 4.8
  },
  {
    name: "Men's Joggers",
    description: "Comfortable joggers perfect for casual wear and light exercise. Elastic waistband and tapered fit.",
    price: 1299,
    originalPrice: 1599,
    category: "Men",
    subcategory: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500"
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#1e3a8a" }
    ],
    stock: 50,
    featured: true,
    rating: 4.6
  },
  {
    name: "Innerwear Pack (3 pcs)",
    description: "Premium quality innerwear pack. Includes 3 pieces of comfortable, breathable innerwear.",
    price: 599,
    originalPrice: 799,
    category: "Innerwear",
    subcategory: "Men's Innerwear",
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500"
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Beige", hex: "#F5F5DC" }
    ],
    stock: 200,
    featured: true,
    rating: 4.7
  },
  {
    name: "Premium Socks Pack",
    description: "Comfortable cotton socks pack. Perfect for daily wear. Pack of 3 pairs.",
    price: 399,
    originalPrice: 499,
    category: "Accessories",
    subcategory: "Socks",
    images: [
      "https://images.unsplash.com/photo-1586350977773-bf3b3f0f6d8d?w=500"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#808080" }
    ],
    stock: 150,
    featured: false,
    rating: 4.4
  },
  {
    name: "Women's Casual T-Shirt",
    description: "Stylish and comfortable t-shirt for women. Perfect for casual outings and everyday wear.",
    price: 699,
    originalPrice: 899,
    category: "Women",
    subcategory: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Pink", hex: "#FFC0CB" },
      { name: "Blue", hex: "#4169E1" }
    ],
    stock: 80,
    featured: true,
    rating: 4.5
  },
  {
    name: "Kids Cotton T-Shirt",
    description: "Soft and comfortable t-shirt for kids. Made with premium cotton for sensitive skin.",
    price: 499,
    originalPrice: 699,
    category: "Kids",
    subcategory: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Red", hex: "#FF0000" },
      { name: "Blue", hex: "#0000FF" },
      { name: "Yellow", hex: "#FFFF00" }
    ],
    stock: 120,
    featured: false,
    rating: 4.6
  },
  {
    name: "Men's Athletic Shorts",
    description: "Lightweight athletic shorts perfect for workouts and sports. Quick-dry fabric.",
    price: 899,
    originalPrice: 1199,
    category: "Sportswear",
    subcategory: "Shorts",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" }
    ],
    stock: 60,
    featured: false,
    rating: 4.5
  }
];

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} products`);

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@mocxs.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@mocxs.com',
        password: 'admin123', // Change this in production!
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created: admin@mocxs.com / admin123');
    }

    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

