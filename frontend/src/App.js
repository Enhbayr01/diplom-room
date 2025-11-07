// src/App.js
import React from 'react';
import './App.css';
import Login from './components/login';

function App() {
    return (
        <div className="App" style={{
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <Login />
        </div>
    );
}

export default App;