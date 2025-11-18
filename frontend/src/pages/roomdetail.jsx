import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/roomdetail.css";
import Header from "../components/header";
import Footer from "../components/footer";
import RoomSchedule from "../components/roomschedule";

// Жишээ дата (API-тай холбоход устгаарай)
const demoRoom = {
  id: 216,
  name: "Хурлын заал 216",
  location: "Хичээлийн I байр",
  capacity: 60,
  open: "08:00",
  close: "18:00",
  items: ["Проектор", "Самбар", "Микрофон", "Wi-Fi"],
  images: ["/placeholder1.jpg", "/placeholder2.jpg", "/placeholder3.jpg"],
  description:
    "Хурал, уулзалт, сургалт зохион байгуулахад тохиромжтой. Дуу тусгаарлалт сайн, проектор, дэлгэцтэй.",
};

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);

  // API — `/api/rooms/:id`
  useEffect(() => {
    // fetch(`${import.meta.env.VITE_API_URL}/api/rooms/${id}`)
    //   .then(r => r.json()).then(setRoom);
    setRoom(demoRoom); // demo
  }, [id]);

  const next = () => setImgIdx((i) => (i + 1) % (room?.images.length || 1));
  const prev = () => setImgIdx((i) => (i - 1 + (room?.images.length || 1)) % (room?.images.length || 1));

  if (!room) return <div className="page-wrap">Уншиж байна...</div>;

  return (
  <div>
    <Header/>
    <div className="page-wrap">
      {/* Толгой хэсэг */}
      <header className="rd__header">
        <div>
          <h1 className="rd__title">{room.name}</h1>
          <div className="rd__meta">
            <span>📍 {room.location}</span>
            <span>⏰ {room.open}–{room.close}</span>
            <span>👥 {room.capacity} хүн</span>
          </div>
        </div>
        <button className="icon-btn" onClick={() => navigate(-1)} title="Буцах">✕</button>
      </header>

      {/* Зураг карусель + баруун талын жагсаалт */}
      <section className="rd__hero">
        <div className="rd__carousel">
          <button className="nav prev" onClick={prev}>‹</button>
          <img src={room.images[imgIdx]} alt="" />
          <button className="nav next" onClick={next}>›</button>
        </div>

        <aside className="rd__side">
          <div className="rd__side-title">Тоног төхөөрөмж</div>
          <ul className="rd__chip-list">
            {room.items.map((it) => (
              <li key={it} className="chip">{it}</li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Текст тайлбар */}
      <section className="rd__section">
        <h3>Үйл ажиллагааны чиглэл</h3>
        <p className="rd__desc">{room.description}</p>
      </section>

      {/* Хуваарь + захиалга */}
      <section className="rd__section">
        <h3>Хуваарь</h3>
        <RoomSchedule/>
          {/* Энд календарь/цагийн сонголт харагдана (доорх BookingForm сонгоно) */}
          <BookingForm roomId={room.id} open={room.open} close={room.close} />
      </section>

      {/* Доод холбоо барих блок */}
      <Footer/>
    </div>
  </div>
  );
}

function BookingForm({ roomId, open = "08:00", close = "18:00" }) {
  const [purpose, setPurpose] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    // давхцал шалгах бол энд API руу илгээнэ
    const payload = {
      room_id: roomId,
      purpose,
    };
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    // if(!res.ok) return alert('Давхцал/алдаа гарлаа');
    alert("Захиалгын хүсэлт илгээлээ (Pending) ✅");
  };

  return (
    <form className="book" onSubmit={submit}>

      <div className="field">
        <label>Зорилго</label>
        <textarea rows="3" placeholder="Арга хэмжээний товч тайлбар..." value={purpose} onChange={(e)=>setPurpose(e.target.value)} />
      </div>

      <div className="book__actions">
        <div className="hint">⏱️ Ажиллах цаг: {open}–{close}</div>
        <button className="primary" type="submit">Захиалах</button>
      </div>
    </form>
  );
}
