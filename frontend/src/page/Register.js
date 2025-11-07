import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      if (response.data.success) {
        onLogin(response.data.user, response.data.token);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Бүртгэлд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Бүртгүүлэх</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="username"
            placeholder="Хэрэглэгчийн нэр"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Имэйл хаяг"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="Нууц үг"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="firstname"
            placeholder="Нэр"
            value={formData.firstname}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="lastname"
            placeholder="Овог"
            value={formData.lastname}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="phone"
            placeholder="Утас"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}
        >
          {loading ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
        </button>
      </form>
    </div>
  );
};

export default Register;