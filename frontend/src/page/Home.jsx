import React, { useState } from "react";
import '../styles/home.css';
import heroImg from "../assets/1.jpg";     // зурагтай бол солиорой

const mockRooms = [
  { id: 1, name: "Хурлын заал 216", capacity: 40, location: "Хичээлийн I байр", tag: "хурлын" },
  { id: 2, name: "Лекцийн танхим 320", capacity: 80, location: "Хичээлийн I байр", tag: "лекц" },
  { id: 3, name: "Хурлын заал 204", capacity: 25, location: "Хичээлийн II байр", tag: "хурлын" },
  { id: 4, name: "Дугуй заал", capacity: 120, location: "Төв байр", tag: "хурлын" },
  { id: 5, name: "Хурлын заал 402", capacity: 20, location: "Лаборатори төв", tag: "хурлын" },
  { id: 6, name: "Хурлын заал 403", capacity: 30, location: "Хичээлийн III байр", tag: "хурлын" },
];

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

export default function Home() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("бүгд");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = mockRooms.filter(r => {
    const passTab = tab === "бүгд" ? true : r.tag === tab;
    const passQ = [r.name, r.location].join(" ").toLowerCase().includes(q.toLowerCase());
    return passTab && passQ;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="home">
      {/* Header-like бар (хэрэв Navbar тусдаа байвал үүнийг аваарай) */}
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
                🔔
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
                👤
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
                    <a href="/profile" className="menu-item">
                      📊 Миний профайл
                    </a>
                    <a href="/bookings" className="menu-item">
                      📅 Миний захиалгууд
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

      {/* Hero + хайлт */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero__layer">
          <h1>Өрөө захиалгаа хялбараар</h1>
          <div className="searchbar">
            <div className="tabs">
              {["бүгд", "хурлын", "лекц"].map(t => (
                <button
                  key={t}
                  className={`tab ${tab === t ? "active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="search">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Өрөөний нэр, байрлалаар хайх..."
              />
              <button>Хайх</button>
            </div>
          </div>
        </div>
      </section>

      {/* Секция 1: Онцлох өрөөнүүд */}
      <section className="section">
        <h2>Онцлох өрөөнүүд</h2>
        <div className="grid">
          {filtered.slice(0, 20).map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </section>

      {/* Доод хэсэг – холбоо барих */}
      <section className="section contact">
        <h2>Холбоо барих</h2>
        <ul>
          <li>📍 Төв байр, МУИС</li>
          <li>📞 11-123456</li>
          <li>✉️ rooms@num.edu.mn</li>
        </ul>
      </section>
    </div>
  );
}

function RoomCard({ room }) {
  return (
    <article className="card">
      <div className="card__thumb" />
      <div className="card__body">
        <h3>{room.name}</h3>
        <p className="muted">{room.location}</p>
        <div className="meta">
          <span>👥 {room.capacity}</span>
          <span className="tag">{room.tag}</span>
        </div>
        <a className="btn" href={`/rooms/${room.id}`}>Дэлгэрэнгүй</a>
      </div>
    </article>
  );
}
