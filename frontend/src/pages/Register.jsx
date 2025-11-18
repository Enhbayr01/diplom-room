// src/pages/Register.js (БҮРЭН ЗАСВАРЛСАН)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/logo.png';
import { authService } from '../services/auth'; // ✅ ЗАСАГДСАН

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company_name: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Алдаа устгах
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Нэвтрэх нэр оруулна уу';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Нэвтрэх нэр хамгийн багадаа 3 тэмдэгт байх ёстой';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Имэйл оруулна уу';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Имэйл буруу байна';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Утасны дугаар оруулна уу';
    }

    if (!formData.password) {
      newErrors.password = 'Нууц үг оруулна уу';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Нууц үгээ давтан оруулна уу';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Нууц үг тохирохгүй байна';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // Backend рүү бүртгэлийн хүсэлт илгээх
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        company_name: formData.company_name || null,
        role: 'CUSTOMER' // Default role
      };

      console.log('Бүртгэлийн мэдээлэл:', userData);

      const response = await authService.register(userData);
      
      console.log('Амжилттай бүртгэгдлээ:', response);
      
      // Амжилттай бүртгэгдсэн бол нэвтрэх хуудас руу шилжих
      alert('Амжилттай бүртгэгдлээ! Одоо нэвтрэнэ үү.');
      navigate('/login');
      
    } catch (error) {
      console.error('Бүртгэлийн алдаа:', error);
      
      // API алдааны messages
      if (error.message?.includes('username') || error.message?.includes('Нэр')) {
        setApiError('Энэ нэвтрэх нэр аль хэдийн бүртгэгдсэн байна');
      } else if (error.message?.includes('email') || error.message?.includes('Имэйл')) {
        setApiError('Энэ имэйл аль хэдийн бүртгэгдсэн байна');
      } else {
        setApiError(error.message || 'Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.');
      }
    } finally {
      setIsLoading(false);
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
        <h2>Бүртгүүлэх</h2>
      
        {/* API алдаа messages харуулах */}
        {apiError && (
          <div className="error-message">
            {apiError}
          </div>
        )}
      
        <form onSubmit={handleSubmit} className="register-form">
          {/* Нэвтрэх нэр - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="username">Нэвтрэх нэр *</label>
              <div className="input-container">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Нэвтрэх нэрээ оруулна уу"
                  className={errors.username ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
            </div>
          </div>

          {/* Имэйл - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="email">Имэйл хаяг *</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Имэйл хаягаа оруулна уу"
                  className={errors.email ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
          </div>

          {/* Утасны дугаар - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="phone">Утасны дугаар *</label>
              <div className="input-container">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Утасны дугаараа оруулна уу"
                  className={errors.phone ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Компанийн нэр (optional) */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="company_name">Компанийн нэр</label>
              <div className="input-container">
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Компанийн нэр (заавал биш)"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Нууц үг - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="password">Нууц үг *</label>
              <div className="input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Нууц үгээ оруулна уу"
                  className={errors.password ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
            </div>
          </div>

          {/* Нууц үг давтах - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="confirmPassword">Нууц үг давтах *</label>
              <div className="input-container">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Нууц үгээ давтан оруулна уу"
                  className={errors.confirmPassword ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Бүртгүүлэх товч */}
          <div className="form-row">
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
            </button>
          </div>

          {/* Нэвтрэх холбоос */}
          <div className="form-row">
            <div className="register-link">
              Бүртгэлтэй хэрэглэгч үү? <Link to="/login">Нэвтрэх</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;