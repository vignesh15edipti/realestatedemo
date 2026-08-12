//const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
 const VITE_API_URL = import.meta.env.VITE_API_URL || 'https://realestatedemo-1realestate-backend.onrender.com/api';
//const VITE_API_URL = import.meta.env.VITE_API_URL || 'mongodb+srv://vignesh1515official_db_user:O09eVlE2W596OhAo@projects.xqbabtx.mongodb.net/';

import axios from 'axios';

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('svs_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for Error Management
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful centralized error handler
    const message =
      error.response?.data?.message || 'Something went wrong. Please try again.';
    error.message = message;
    return Promise.reject(error);
  }
);

export default api;
