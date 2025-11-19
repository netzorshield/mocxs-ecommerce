import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Debug: Log API URL in development (will be removed in production build)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔗 API URL:', API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is invalid (401), remove it
    if (error.response?.status === 401 && error.config?.url !== '/auth/login' && error.config?.url !== '/auth/register') {
      Cookies.remove('token');
      // Only redirect if we're not already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
