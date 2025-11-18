// src/services/authService.js
import api from './api';

export const authService = {
  // Нэвтрэх
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });
      
      // Токен болон хэрэглэгчийн мэдээлэл хадгалах
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Нэвтрэхэд алдаа гарлаа' };
    }
  },

  // Бүртгүүлэх
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Бүртгүүлэхэд алдаа гарлаа' };
    }
  },

  // Гарах
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Токен авах
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Хэрэглэгчийн мэдээлэл авах
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};