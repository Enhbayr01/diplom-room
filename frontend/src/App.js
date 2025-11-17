// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../src/page/Register';
import Login from '../src/page/login';
import Home from '../src/page/Home';
import RoomDetail from '../src/page/roomdetail';
import MyBooking from '../src/page/mybooking';
import Profile from '../src/page/profile';
import './App.css';
import ChangePassword from '../src/page/changepassword';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
           <Route path="/rooms/:id" element={<RoomDetail/>} />
           <Route path="/home/mybooking" element={<MyBooking />} />
           <Route path="/home/profile" element={<Profile />} />
            <Route path="/home/changePassword" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;