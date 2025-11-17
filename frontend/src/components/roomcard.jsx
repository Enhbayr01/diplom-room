
export default function RoomCard({room}){
    return(
    <article className="card">
      <div className="card__thumb" />
        <div className="card__body">
            <h3>{room.name}</h3>
            <div className="meta">
            <span>👥 {room.capacity}</span>
            <p className="muted">{room.location}</p>
            <span className="tag">{room.tag}</span>
            </div>
            <a className="btn" href={`/rooms/${room.id}`}>Дэлгэрэнгүй</a>
      </div>
    </article>
    )
}