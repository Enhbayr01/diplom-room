// page/Register.js
import React, { useState } from 'react';
// import '../styles/register.css';
import '../styles/login.css';
import logo from '../assets/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Алдаа устгах
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Нэр оруулна уу';
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

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Үйлчилгээний нөхцөл зөвшөөрөх ёстой';
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

    try {
      // Энд бүртгэлийн API дуудах
      console.log('Бүртгэлийн мэдээлэл:', formData);
      
      // Зохиомол ачаалал
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Амжилттай бүртгэгдлээ! Та нэвтрэх хэсэгрүү шилжинэ үү.');
      
      // Нэвтрэх хуудасруу шилжих
      // window.location.href = '/login';
      
    } catch (error) {
      console.error('Бүртгэлийн алдаа:', error);
      alert('Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.');
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
      
        <form onSubmit={handleSubmit} className="register-form">
          {/* Нэр - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="lastName">Нэр</label>
              <div className="input-container">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Нэрээ оруулна уу"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>
          </div>

          {/* Имэйл - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="email">Имэйл хаяг</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Имэйл хаягаа оруулна уу"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
          </div>

          {/* Утасны дугаар - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="phone">Утасны дугаар</label>
              <div className="input-container">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Утасны дугаараа оруулна уу"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Нууц үг - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="password">Нууц үг</label>
              <div className="input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Нууц үгээ оруулна уу"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
            </div>
          </div>

          {/* Нууц үг давтах - цуваа байдлаар */}
          <div className="form-row">
            <div className="form-group horizontal">
              <label htmlFor="confirmPassword">Нууц үг давтах</label>
              <div className="input-container">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Нууц үгээ давтан оруулна уу"
                  className={errors.confirmPassword ? 'error' : ''}
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
              Бүртгэлтэй хэрэглэгч үү? <a href="/">Нэвтрэх</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;