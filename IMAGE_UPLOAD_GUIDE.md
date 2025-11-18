# Image Upload Guide

## 📁 Folder Structure

Images are stored in:
```
backend/uploads/products/
```

## 🚀 How to Upload Images

### Method 1: Upload Files (Recommended)

1. Go to Admin Panel → Products → Add New Product
2. Select **"Upload Files"** tab
3. Click **"Choose File"** or drag and drop images
4. Select one or more image files (JPG, PNG, GIF, WebP)
5. Images will be uploaded automatically
6. You'll see previews of uploaded images
7. Click **"Create Product"** to save

### Method 2: Use Image URLs

1. Go to Admin Panel → Products → Add New Product
2. Select **"Use URLs"** tab
3. Enter image URLs (one per line)
4. Click **"Add Image URL"** to add more
5. Click **"Create Product"** to save

## 📋 Image Requirements

- **Supported Formats**: JPG, JPEG, PNG, GIF, WebP
- **Max File Size**: 5MB per image
- **Max Images**: 10 images per product
- **Recommended Size**: 800x800px to 1200x1200px

## 🔧 API Endpoints

### Upload Single Image
```
POST /api/upload/image
Content-Type: multipart/form-data
Body: { image: File }
```

### Upload Multiple Images
```
POST /api/upload/images
Content-Type: multipart/form-data
Body: { images: File[] }
```

### Delete Image
```
DELETE /api/upload/image/:filename
```

## 📂 Image Storage

- Images are stored in: `backend/uploads/products/`
- Images are served from: `http://localhost:5000/uploads/products/`
- Filenames are automatically generated with timestamps

## 🖼️ Accessing Uploaded Images

Uploaded images are accessible at:
```
http://localhost:5000/uploads/products/filename.jpg
```

## 🔒 Security

- Only authenticated admin users can upload images
- File types are validated (only images allowed)
- File size is limited (5MB max)
- Filenames are sanitized and unique

## 🐛 Troubleshooting

### Error: "Only image files are allowed"
- Make sure you're uploading an image file (JPG, PNG, GIF, WebP)
- Check file extension

### Error: "File too large"
- Reduce image size (max 5MB)
- Compress image before uploading

### Error: "Failed to upload images"
- Check if backend server is running
- Verify you're logged in as admin
- Check backend/uploads/products/ folder exists
- Check file permissions

### Images not displaying
- Make sure backend server is running on port 5000
- Check image URL is correct
- Verify image file exists in uploads/products/ folder

## 📝 Notes

- Images are stored locally on the server
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
- Backup uploads folder regularly
- Clean up unused images periodically

## 🚀 Production Deployment

For production, consider:

1. **Cloud Storage**: Use AWS S3, Cloudinary, or similar
2. **CDN**: Use a CDN for faster image delivery
3. **Image Optimization**: Compress images automatically
4. **Backup**: Backup images regularly
5. **Security**: Add virus scanning for uploaded files

---

**That's it! You can now upload images to your products!** 🎉











