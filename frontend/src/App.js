// src/App.js (Header-той хувилбар)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Register from '../src/pages/Register';
import Login from '../src/pages/login';
import Home from '../src/pages/Home';
import RoomDetail from '../src/pages/roomdetail';
import MyBooking from '../src/pages/mybooking';
import Profile from '../src/pages/profile';
import ChangePassword from '../src/pages/changepassword';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes - Header-гүй */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Protected routes - Header-той */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms/:id" 
            element={
              <ProtectedRoute>
                
                <RoomDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home/mybooking" 
            element={
              <ProtectedRoute>
               
                <MyBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home/profile" 
            element={
              <ProtectedRoute>
                
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home/changePassword" 
            element={
              <ProtectedRoute>
          
                <ChangePassword />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;