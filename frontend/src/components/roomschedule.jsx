import React, { useEffect, useMemo, useState } from "react";
import "../styles/roomschedule.css";

const HOURS = [
  "08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00"
];

function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function fmt(d,opt){ return d.toLocaleDateString("mn-MN", opt); }
function nextHour(h){ const [H,M]=h.split(":").map(Number); const d=new Date(); d.setHours(H+1,M,0,0); return d.toTimeString().slice(0,5); }

export default function ScheduleWeekMulti({ roomId, startDate = new Date() }) {
  const [weekStart, setWeekStart] = useState(startDate);
  const [data, setData] = useState(null);      // booked/free
  const [selected, setSelected] = useState([]); // {dateKey, start, end}

  const [form, setForm] = useState({
    purpose: "",
    people: "",
    note: ""
  });

  const days = useMemo(
    () => [...Array(7)].map((_,i)=>addDays(weekStart,i)),
    [weekStart]
  );

  // === 7 хоногийн өгөгдөл татах (одоохондоо mock) ===
  useEffect(() => {
    const mock = {};
    days.forEach(d=>{
      const key = d.toISOString().slice(0,10);
      mock[key] = {};
      HOURS.forEach(h=>{
        mock[key][h] = Math.random() < 0.4 ? "booked" : "free";
      });
    });
    setData(mock);
    setSelected([]); // шинэ долоо хоног болгонд сонголтоо цэвэрлэнэ
  }, [roomId, days]);

  const prevWeek = () => setWeekStart(addDays(weekStart,-7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));

  const isSelected = (dateKey, hour) =>
    selected.some(s => s.dateKey === dateKey && s.start === hour);

  const toggleSlot = (dateKey, hour) => {
    if (!data || data[dateKey][hour] !== "free") return;

    setSelected(prev => {
      const exists = prev.some(s => s.dateKey === dateKey && s.start === hour);
      if (exists) {
        return prev.filter(s => !(s.dateKey === dateKey && s.start === hour));
      } else {
        return [...prev, { dateKey, start: hour, end: nextHour(hour) }];
      }
    });
  };
  
  const submitBooking = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      alert("Ядаж нэг цагийн хэсэг сонгоно уу.");
      return;
    }
    if (!form.purpose.trim()) {
      alert("Үйл ажиллагааны зорилгыг заавал бөглөнө.");
      return;
    }

    // Энд API руу илгээнэ
    const payload = {
      room_id: roomId,
      slots: selected, // [{dateKey,start,end}, ...]
      purpose: form.purpose,
      people: form.people,
      note: form.note
    };

    console.log("Захиалгын хүсэлт:", payload);

    // Жишээ mock амжилт:
    alert("Захиалгын хүсэлтийг илгээлээ (PENDING).");
    setSelected([]);
    setForm({ purpose:"", people:"", note:"" });
  };

  if (!data) return <div className="sw-wrap">Уншиж байна…</div>;

  return (
    <div className="sw-wrap">
      {/* HEADER */}
      <div className="sw-header">
        <button className="nav" onClick={prevWeek}>‹</button>
        {days.map((d,i)=>(
          <div key={i} className={`day ${i===2?"active":""}`}>
            <div className="day-date">
              {fmt(d,{ month:"long", day:"numeric"})}
            </div>
            <div className="day-name">
              {fmt(d,{ weekday:"long"})}
            </div>
          </div>
        ))}
        <button className="nav" onClick={nextWeek}>›</button>
      </div>

      {/* GRID */}
      <div className="sw-grid">
        {HOURS.map((hRow) => (
          <div className="sw-row" key={hRow}>
            <div className="time-col">
              {hRow}-{nextHour(hRow)}
            </div>

            {days.map((d) => {
              const dateKey = d.toISOString().slice(0,10);
              const st = data[dateKey][hRow]; // booked | free
              const sel = isSelected(dateKey, hRow);

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => toggleSlot(dateKey, hRow)}
                  className={
                    "cell " +
                    (st === "booked" ? "booked" : "free") +
                    (sel ? " selected" : "")
                  }
                  disabled={st === "booked"}
                >
                  {st === "booked"
                    ? "захиалсан"
                    : sel
                      ? "сонгосон"
                      : "захиалаагүй"}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* FORM + СОНГОГДСОН ЦАГУУД */}
      <form className="booking-form" onSubmit={submitBooking}>
        <h3>Сонгосон цагийн хэсгүүд</h3>
        {selected.length === 0 ? (
          <p className="muted">Одоогоор сонгосон цаг алга. Хуваарийн хүснэгтээс “захиалаагүй” нүднүүд дээр дарж сонгоно.</p>
        ) : (
          <ul className="slot-list">
            {selected
              .sort((a,b)=>a.dateKey.localeCompare(b.dateKey) || a.start.localeCompare(b.start))
              .map((s,i)=>(
                <li key={i}>
                  {s.dateKey} – {s.start}-{s.end}
                </li>
              ))}
          </ul>
        )}
      </form>
    </div>
  );
}
