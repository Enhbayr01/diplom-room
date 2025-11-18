// src/page/rooms/MyBookings.jsx
import React, { useState, useMemo } from "react";
import "../styles/mybooking.css";
import Header from "../components/header";
import Footer from "../components/footer";

const TABS = [
  { key: "pending", label: "Захиалсан" },
  { key: "approved", label: "Баталгаажсан" },
  { key: "cancelled", label: "Цуцлагдсан" },
];

// Одоохондоо жишээ өгөгдөл – дараа нь API-аас авна
const MOCK_BOOKINGS = [
  {
    id: 1,
    roomName: "Хурлын заал 320",
    date: "2025-11-18",
    time: "14:00–16:00",
    status: "pending",
    purpose: "Танилцуулга, уулзалт",
  },
  {
    id: 2,
    roomName: "Дугуй заал 216",
    date: "2025-11-20",
    time: "09:00–12:00",
    status: "approved",
    purpose: "Семинар",
  },
  {
    id: 3,
    roomName: "Хурлын өрөө 402",
    date: "2025-11-10",
    time: "18:00–20:00",
    status: "cancelled",
    purpose: "Дотоод уулзалт",
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredBookings = useMemo(
    () => MOCK_BOOKINGS.filter((b) => b.status === activeTab),
    [activeTab]
  );

  const getStatusLabel = (status) => {
    if (status === "pending") return "Хүлээгдэж байна";
    if (status === "approved") return "Баталгаажсан";
    if (status === "cancelled") return "Цуцлагдсан";
    return status;
  };

  // Цуцлах функц
  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?")) {
      console.log("Захиалга цуцлагдлаа:", bookingId);
      // Энд API дуудалт хийх болно
    }
  };

  // Хаах функц - өмнөх хуудас руу буцах
  const handleClose = () => {
    window.location.href = "/home";
  };

  return (
    <div className="my-bookings-page">
      <Header/>

      <main className="mb-content">
        <div className="mb-title-row">
          <h1 className="mb-title">Миний захиалгууд</h1>
          <button 
            className="close-btn"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        {/* TAB-ууд */}
        <div className="mb-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={
                "mb-tab" + (activeTab === tab.key ? " mb-tab--active" : "")
              }
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Картууд байрлах хайрцаг */}
        <div className="mb-card-container">
          {filteredBookings.length === 0 ? (
            <div className="mb-empty">
              Энэ ангилалд захиалга алга байна.
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div key={b.id} className="mb-card">
                <div className="mb-card-header">
                  <h2 className="mb-room-name">{b.roomName}</h2>
                  <span className={`mb-status mb-status--${b.status}`}>
                    {getStatusLabel(b.status)}
                  </span>
                </div>

                <div className="mb-card-body">
                  <div className="mb-row">
                    <span className="mb-label">Огноо</span>
                    <span>{formatDate(b.date)}</span>
                  </div>
                  <div className="mb-row">
                    <span className="mb-label">Цаг</span>
                    <span>{b.time}</span>
                  </div>
                  <div className="mb-row">
                    <span className="mb-label">Зорилго</span>
                    <span>{b.purpose}</span>
                  </div>
                </div>

                <div className="mb-card-footer">
                  {b.status === "pending" && (
                    <button 
                      className="mb-link-btn mb-link-btn--danger"
                      onClick={() => handleCancelBooking(b.id)}
                    >
                      Цуцлах
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default MyBookings;