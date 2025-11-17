import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faKey } from '@fortawesome/free-solid-svg-icons';

const mockNotifications = [
  { id: 1, message: "Таны захиалга баталгаажлаа", time: "5 мин", read: false },
  { id: 2, message: "Шинэ өрөө нэмэгдлээ", time: "1 цаг", read: true },
  { id: 3, message: "Системд шинэчлэлт орлоо", time: "2 цаг", read: true },
];

const mockUser = {
  name: "Бат",
  email: "bat@muis.edu.mn",
  role: "Хэрэглэгч"
};

const Header = () => {
     
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;


    return(
        <header className="home__top">
        <div className="home__logo">MUIS Rooms</div>
        <nav className="home__actions">
          <div className="nav-icons">
            {/* Notification Icon */}
            <div className="notification-wrapper">
              <button 
                className="icon-btn notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FontAwesomeIcon icon={faBell} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    <h3>Мэдэгдэл</h3>
                    <button 
                      className="close-btn"
                      onClick={() => setShowNotifications(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {!notification.read && <div className="unread-dot"></div>}
                      </div>
                    ))}
                  </div>
                  {notifications.length === 0 && (
                    <div className="empty-state">Мэдэгдэл байхгүй</div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Icon */}
            <div className="profile-wrapper">
              <button 
                className="icon-btn profile-btn"
                onClick={() => setShowProfile(!showProfile)}
              >
              <FontAwesomeIcon icon={faUser}/>
              </button>
              
              {/* Profile Dropdown */}
              {showProfile && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar">Б</div>
                    <div className="profile-info">
                      <h4>{mockUser.name}</h4>
                      <p>{mockUser.email}</p>
                      <span className="user-role">{mockUser.role}</span>
                    </div>
                  </div>
                  <div className="profile-menu">
                    <a href="/home/profile" className="menu-item">
                      📊 Миний профайл
                    </a>
                    <a href="/home/mybooking" className="menu-item">
                      📅 Миний захиалгууд
                    </a>
                    <a href="/home/changePassword" className="menu-item"><FontAwesomeIcon icon={faKey}/>
                       нууц үг солих
                    </a>
                    <div className="menu-divider"></div>
                    <button className="menu-item logout-btn">
                      🚪 Гарах
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    )
}

export default Header;