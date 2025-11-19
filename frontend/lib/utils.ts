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

// Convert relative image paths to full URLs
export const getImageUrl = (image: string | undefined | null): string => {
  if (!image) {
    console.warn('getImageUrl: No image provided');
    return PLACEHOLDER_IMAGE; // Use placeholder instead of broken image
  }
  
  // If already a full URL (http/https), ensure HTTPS in production
  if (image.startsWith('http://') || image.startsWith('https://')) {
    // Force HTTPS in production to avoid mixed content issues
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      const httpsUrl = image.replace('http://', 'https://');
      console.log('getImageUrl: Converted HTTP to HTTPS', { original: image, converted: httpsUrl });
      return httpsUrl;
    }
    return image;
  }
  
  // Get API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  
  // Ensure HTTPS in production
  let baseUrl = API_BASE_URL;
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    baseUrl = API_BASE_URL.replace('http://', 'https://');
  }
  
  // If it's a relative path starting with /uploads/, convert to full URL
  if (image.startsWith('/uploads/')) {
    const fullUrl = `${baseUrl}${image}`;
    console.log('getImageUrl: Converted /uploads/ path', { original: image, baseUrl, fullUrl });
    return fullUrl;
  }
  
  // If it's already a full path but missing protocol, assume it's from our API
  if (image.startsWith('/')) {
    const fullUrl = `${baseUrl}${image}`;
    console.log('getImageUrl: Converted / path', { original: image, baseUrl, fullUrl });
    return fullUrl;
  }
  
  // Return as is if it doesn't match any pattern
  console.warn('getImageUrl: Unknown image format', { image });
  return image;
};

// Placeholder image for missing/broken images
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U1ZTdlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

