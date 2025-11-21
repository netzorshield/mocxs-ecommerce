'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { getCurrentUser, getAuthToken } from '@/lib/auth';
import { getImageUrl, convertToFullImageUrl } from '@/lib/utils';
import { FiArrowLeft, FiSave, FiUpload, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('upload'); // Default to upload
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Men',
    subcategory: '',
    images: [] as string[],
    sizes: [] as string[],
    colors: [{ name: '', hex: '#000000' }],
    stock: '',
    rating: '',
    featured: false,
  });

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process images - ensure all are full URLs
      const processedImages = formData.images.map(img => {
        // Convert to full URL if needed (handles both relative and full URLs)
        return convertToFullImageUrl(img);
      }).filter(img => img.trim() !== '');

      if (processedImages.length === 0) {
        toast.error('Please add at least one product image');
        setLoading(false);
        return;
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock),
        rating: formData.rating ? Number(formData.rating) : 0,
        images: processedImages,
        sizes: formData.sizes.filter(s => s.trim() !== ''),
        colors: formData.colors.filter(c => c.name.trim() !== ''),
      };

      await api.post('/admin/products', productData);
      toast.success('Product created successfully!');
      router.push('/admin/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const token = getAuthToken();

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${API_URL}/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        // Convert relative path to full URL immediately
        const relativePath = response.data.url;
        return convertToFullImageUrl(relativePath);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedUrls],
      });
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload images');
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const addImageUrl = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { name: '', hex: '#000000' }],
    });
  };

  const removeColor = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/admin/products" className="text-deepBlue hover:underline inline-flex items-center mb-4">
            <FiArrowLeft className="mr-1" /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Innerwear">Innerwear</option>
                  <option value="Sportswear">Sportswear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subcategory</label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., T-Shirts, Jeans"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., 4.5"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Set initial product rating</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sizes.includes(size)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, sizes: [...formData.sizes, size] });
                        } else {
                          setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
                        }
                      }}
                      className="mr-2"
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Colors</label>
              {formData.colors.map((color, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={color.name}
                    onChange={(e) => {
                      const newColors = [...formData.colors];
                      newColors[index].name = e.target.value;
                      setFormData({ ...formData, colors: newColors });
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => {
                      const newColors = [...formData.colors];
                      newColors[index].hex = e.target.value;
                      setFormData({ ...formData, colors: newColors });
                    }}
                    className="w-16 h-10 border rounded"
                  />
                  {formData.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addColor}
                className="mt-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Add Color
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Images *</label>
              
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-4 py-2 rounded-lg ${
                    imageMode === 'upload'
                      ? 'bg-deepBlue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FiUpload className="inline mr-2" /> Upload Files
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-4 py-2 rounded-lg ${
                    imageMode === 'url'
                      ? 'bg-deepBlue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Use URLs
                </button>
              </div>

              {/* Upload Mode */}
              {imageMode === 'upload' && (
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Upload images from your computer (JPG, PNG, GIF, WebP - Max 5MB each)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full px-4 py-2 border rounded-lg cursor-pointer disabled:opacity-50"
                  />
                  {uploading && (
                    <p className="text-sm text-blue-600 mt-2">Uploading images...</p>
                  )}
                </div>
              )}

              {/* URL Mode */}
              {imageMode === 'url' && (
                <div className="space-y-2 mb-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={image}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index] = e.target.value;
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="flex-1 px-4 py-2 border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Add Image URL
                  </button>
                </div>
              )}

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Uploaded Images ({formData.images.length}):</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={getImageUrl(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2"
                />
                <span>Featured Product</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-deepBlue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 inline-flex items-center"
              >
                <FiSave className="mr-2" /> {loading ? 'Creating...' : 'Create Product'}
              </button>
              <Link
                href="/admin/products"
                className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}


