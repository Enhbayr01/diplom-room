// src/services/roomService.js
import api from './api';

export const roomService = {
  // Бүх өрөөнүүд
  getAllRooms: async () => {
    const response = await api.get('/rooms');
    return response.data;
  },

  // Өрөөний дэлгэрэнгүй
  getRoomById: async (id) => {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  },

  // Өрөө үүсгэх
  createRoom: async (roomData) => {
    const response = await api.post('/rooms', roomData);
    return response.data;
  },

  // Өрөө шинэчлэх
  updateRoom: async (id, roomData) => {
    const response = await api.put(`/rooms/${id}`, roomData);
    return response.data;
  },

  // Өрөө устгах
  deleteRoom: async (id) => {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  }
};