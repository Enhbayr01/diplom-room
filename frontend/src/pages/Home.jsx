import React, { useState } from "react";
import '../styles/home.css';
import heroImg from "../assets/1.jpg"; 
import Footer from "../components/footer";
import Header from "../components/header";
import RoomCard from "../components/roomcard";


const mockRooms = [
  { id: 1, name: "Хурлын заал 216", capacity: 40, location: "Хичээлийн I байр", tag: "хурлын" },
  { id: 2, name: "Лекцийн танхим 320", capacity: 80, location: "Хичээлийн I байр", tag: "лекц" },
  { id: 3, name: "Хурлын заал 204", capacity: 25, location: "Хичээлийн II байр", tag: "хурлын" },
  { id: 4, name: "Дугуй заал", capacity: 120, location: "Төв байр", tag: "хурлын" },
  { id: 5, name: "Хурлын заал 402", capacity: 20, location: "Лаборатори төв", tag: "хурлын" },
  { id: 6, name: "Хурлын заал 403", capacity: 30, location: "Хичээлийн III байр", tag: "хурлын" },
];

export default function Home() {
   const [q, setQ] = useState("");
  const [tab, setTab] = useState("бүгд");
  const filtered = mockRooms.filter(r => {
    const passTab = tab === "бүгд" ? true : r.tag === tab;
    const passQ = [r.name, r.location].join(" ").toLowerCase().includes(q.toLowerCase());
    return passTab && passQ;
  });
  return (
    <div className="home">
      <Header/>

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
      <Footer/>
    </div>
  );
}
