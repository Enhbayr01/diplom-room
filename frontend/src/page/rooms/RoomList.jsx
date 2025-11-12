import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Өрөөнүүд татахад алдаа:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Өрөөнүүд ачааллаж байна...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Өрөөнүүдийн жагсаалт</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {rooms.map(room => (
          <div 
            key={room.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <h3>{room.room_number}</h3>
            <p><strong>Байршил:</strong> {room.location}</p>
            <p><strong>Хүний багтаамж:</strong> {room.capacity}</p>
            <p><strong>Тайлбар:</strong> {room.description}</p>
            <p><strong>Төлөв:</strong> {room.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;