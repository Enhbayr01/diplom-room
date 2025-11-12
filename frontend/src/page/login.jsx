// src/components/Login.js
import React, { useState } from 'react';
import '../styles/login.css';
import logo from '../assets/logo.png';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Энд нэвтрэх логик байх болно
        console.log('Нэвтрэх мэдээлэл:', formData);
        
        // Жишээ амжилттай нэвтрэх мэдэгдэл
        alert('Амжилттай нэвтэрлээ!');
    };

    return (
        <div className="login-container">
            <div className="welcome-section">
                <div className="university-logo">
                     <img src={logo} alt="MUIS logo" />
                </div>
                <h1>Монгол улсын их сургууль</h1>
                <p>МУИС-ийн хурлын өрөө захиалах программд тавтай морилно уу</p>
            </div>
            
            <div className="login-form-section">
                <h2>Нэвтрэх</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">И-мэйл хаяг</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="И-мэйл хаягаа оруулна уу" 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Нууц үг</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Нууц үгээ оруулна уу" 
                            required 
                        />
                    </div>
                    
                    <div className="forgot-password">
                        <a href="#forgot">Нууц үгээ мартсан уу?</a>
                    </div>
                    
                    <button type="submit" className="login-button">Нэвтрэх</button>
                    
                    <div className="register-link">
                        Шинэ хэрэглэгч үү? <a href="/register">Бүртгүүлэх</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;