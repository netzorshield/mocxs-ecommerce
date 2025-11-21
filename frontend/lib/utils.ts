// Utility functions

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone.replace(/\D/g, ''));
};

export const validatePincode = (pincode: string): boolean => {
  const re = /^\d{6}$/;
  return re.test(pincode);
};

// Get API base URL (without /api suffix) - used for image URLs
export const getApiBaseUrl = (): string => {
  // Get API base URL - handle both with and without /api suffix
  let API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  // Remove /api suffix if present to get base URL
  if (API_BASE_URL.endsWith('/api')) {
    API_BASE_URL = API_BASE_URL.replace('/api', '');
  } else if (API_BASE_URL.endsWith('/api/')) {
    API_BASE_URL = API_BASE_URL.replace('/api/', '');
  }
  
  // Ensure HTTPS in production
  let baseUrl = API_BASE_URL;
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    baseUrl = API_BASE_URL.replace('http://', 'https://');
  }
  
  // Remove trailing slash from baseUrl
  baseUrl = baseUrl.replace(/\/$/, '');
  
  return baseUrl;
};

// Convert relative image path to full URL
export const convertToFullImageUrl = (imagePath: string): string => {
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Force HTTPS in production to avoid mixed content issues
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return imagePath.replace('http://', 'https://');
    }
    return imagePath;
  }
  
  const baseUrl = getApiBaseUrl();
  
  // If it's a relative path starting with /uploads/, convert to full URL
  if (imagePath.startsWith('/uploads/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // If it's already a full path but missing protocol, assume it's from our API
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // If image doesn't start with /, assume it's a relative path from uploads
  if (!imagePath.includes('://') && !imagePath.startsWith('/')) {
    return `${baseUrl}/uploads/products/${imagePath}`;
  }
  
  // Return as is if it doesn't match any pattern
  return imagePath;
};

// Convert relative image paths to full URLs
export const getImageUrl = (image: string | undefined | null): string => {
  if (!image) {
    console.warn('getImageUrl: No image provided');
    return PLACEHOLDER_IMAGE; // Use placeholder instead of broken image
  }
  
  return convertToFullImageUrl(image);
};

// Placeholder image for missing/broken images
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U1ZTdlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

