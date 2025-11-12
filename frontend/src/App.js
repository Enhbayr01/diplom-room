// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../src/page/Register';
import Login from '../src/page/login';
import Home from '../src/page/Home';
import RoomDetail from './page/roomdetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
           <Route path="/rooms/:id" element={<RoomDetail/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;