const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const { uploadSingle, uploadMultiple } = require('../middleware/upload');
const path = require('path');

// @route   POST /api/upload/image
// @desc    Upload single image
// @access  Private/Admin
router.post('/image', auth, admin, (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the file URL
    const fileUrl = `/uploads/products/${req.file.filename}`;
    res.json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename
    });
  });
});

// @route   POST /api/upload/images
// @desc    Upload multiple images
// @access  Private/Admin
router.post('/images', auth, admin, (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Return array of file URLs
    const fileUrls = req.files.map(file => ({
      url: `/uploads/products/${file.filename}`,
      filename: file.filename
    }));

    res.json({
      message: 'Images uploaded successfully',
      images: fileUrls
    });
  });
});

// @route   DELETE /api/upload/image/:filename
// @desc    Delete image
// @access  Private/Admin
router.delete('/image/:filename', auth, admin, (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, '../uploads/products', req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(404).json({ message: 'File not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  });
});

module.exports = router;











