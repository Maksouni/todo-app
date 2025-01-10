// src/api/axios.js
import axios from 'axios';
import { BACKEND_URL } from '../env';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string,
  userId: number,
  iat: number,
  exp: number
}

const instance = axios.create({
  baseURL: BACKEND_URL,
});

// Добавляем токен в заголовки для каждого запроса
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      Cookies.remove('jwt_token');
      window.location.href = '/auth/login'; // Перенаправить на страницу логина
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;


