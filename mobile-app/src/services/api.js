import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Android emulator, use 'http://10.0.2.2:3001/api'
// For iOS simulator, use 'http://localhost:3001/api'
// For physical devices, use your computer's IP address: 'http://YOUR_IP:3001/api'
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
