// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // LocalStorage-с токен шалгах
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    // Нэвтрээгүй бол login хуудас руу шилжүүлэх
    return <Navigate to="/login" replace />;
  }

  // Нэвтрсэн бол children component-уудыг харуулах
  return children;
};

export default ProtectedRoute;