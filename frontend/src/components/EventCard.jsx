import React from 'react'
import "../style/style.css";
import { Link } from 'react-router-dom';

function EventCard({ id, name, description, location, date, thumbnail }) {
  return (
    <div className="event-card">
        <div className="event-image">
            <img src={thumbnail} alt="thumbnail" />
        </div>
        <div className="event-content">
            <h3>{name}</h3>
            <p className="event-date">{new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
</p>
            <p className="event-location">{location}</p>
            <p className="event-description">{description.length > 60 ? description.slice(0, 60) + '…' : description}</p>
            <Link to={`/event/${id}`} className="btn-secondary">View Details</Link>
        </div>
    </div>
  )
}

export default EventCard