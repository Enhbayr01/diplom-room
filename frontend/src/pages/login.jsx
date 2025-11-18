// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/logo.png';
import { authService } from '../services/auth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Алдаа messages арилгах
        if (error) setError('');
    };

    // src/pages/Login.js (алдаа боловсруулах хэсгийг шинэчлэх)
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        // Backend рүү нэвтрэх хүсэлт илгээх
        const response = await authService.login(formData.email, formData.password);
        
        console.log('Амжилттай нэвтэрлээ:', response);
        
        // Амжилттай нэвтрсэн бол home хуудас руу шилжих
        navigate('/home');
        
    } catch (error) {
        console.error('Нэвтрэх алдаа:', error);
        
        // Backend-с ирсэн алдаа messages
        if (error.message) {
            setError(error.message);
        } else if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError('Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.');
        }
    } finally {
        setLoading(false);
    }
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
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="forgot-password">
                        <a href="#forgot">Нууц үгээ мартсан уу?</a>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Нэвтрэж байна...' : 'Нэвтрэх'}
                    </button>
                    
                    <div className="register-link">
                        Шинэ хэрэглэгч үү? <a href="/register">Бүртгүүлэх</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;