import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={{ 
      backgroundColor: '#343a40', 
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <h3>Diplom Room</h3>
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>Сайн байна уу, {user.firstname || user.username}!</span>
            <button 
              onClick={onLogout}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none',
                borderRadius: '3px'
              }}
            >
              Гарах
            </button>
          </div>
        ) : (
          <span>Гость хэрэглэгч</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;