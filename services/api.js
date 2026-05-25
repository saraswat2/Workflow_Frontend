import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors (like 401 Unauthorized here)
    if (error.response?.status === 401) {
      // Clear token if unauthorized, except on login
      if (!error.config.url.includes('/auth/login')) {
         localStorage.removeItem('token');
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
