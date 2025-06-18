import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../api";


function EventHistoryCard({ event_id }) {

  const [event, setEvent] = useState({})

  useEffect(() => {
    async function getEventDetail() {
      try {
        const res = await api.get(`api/events/${event_id}`);
        setEvent(res.data);
        console.log(res.data);

      } catch (error) {
        
        console.error("Failed to fetch event:", error);
      }
    }

    getEventDetail();
  }, []);

    return (
      <div className="booking-item upcoming" data-category="upcoming">
        <div className="booking-status">
          <span className="status-badge upcoming">Upcoming</span>
        </div>
        <div className="booking-image">
          <img
            src={event.thumbnail}
            alt="thumbnail"
          />
        </div>
        <div className="booking-details">
          <h3>{event.name}</h3>
          <div className="booking-meta">
            <div className="meta-row">
              <span className="meta-label">Date:</span>
              <span className="meta-value">{new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Location:</span>
              <span className="meta-value">
                {event.location}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Booking ID:</span>
              <span className="meta-value">#TC2025-{event.id}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Amount:</span>
              <span className="meta-value">{event.price}</span>
            </div>
          </div>
        </div>
        <div className="booking-actions">
          <Link to={`/event/${event.id}`} className="btn-secondary">
            View Event
          </Link>
          <Link to={`/event/booking/${event.id}`}>
            <button className="btn-primary">
              Show Ticket
            </button>
          </Link>
        </div>
      </div>
  );
}

export default EventHistoryCard;
