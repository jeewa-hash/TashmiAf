import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if we're currently refreshing the token
let isRefreshing = false;
// Store callbacks from requests that came in while refreshing
let refreshSubscribers = [];

// Function to add new requests to the subscribers queue
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to notify all subscribers that token is refreshed
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
};

// Request interceptor - adds token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is not 401 or request already retried, reject
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Mark this request as retried to prevent infinite loops
    originalRequest._retry = true;
    
    // If we're already refreshing, wait for the new token
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }
    
    // Start refreshing process
    isRefreshing = true;
    
    try {
      // Get refresh token from storage
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        // No refresh token available - log out user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // Redirect to login or dispatch logout action if using state management
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      // Request new token
      const response = await axios.post(
        'http://localhost:5002/api/users/refresh-token',
        { refreshToken },
        { baseURL: axiosInstance.defaults.baseURL }
      );
      
      // Save new tokens
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Update Authorization header
      originalRequest.headers.Authorization = `Bearer ${token}`;
      
      // Notify subscribers about the new token
      onTokenRefreshed(token);
      
      // Reset refreshing state
      isRefreshing = false;
      
      // Retry original request with new token
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Token refresh failed - log out user
      isRefreshing = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      // Redirect to login or dispatch logout action
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
