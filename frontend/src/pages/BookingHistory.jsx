import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventHistoryCard from "../components/EventHistoryCard";
import Navbar from "../components/Navbar";
import api from "../api";

function BookingHistory() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function getEvent() {
      try {
        const res = await api.get("api/events/book/history/");
        setEvent(res.data); 
      } catch (error) {
        console.log(error);
      }
    }
    getEvent();
  }, []);
  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="history-container">
          <div className="container">
            <div className="history-header">
              <h1>My Booking History</h1>
              <p>Track all your past and upcoming event bookings</p>
            </div>
            <div className="bookings-list">
              {event.map((event, index) => {
                return (
                  <EventHistoryCard
                    key={index}
                    event_id={event.event}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default BookingHistory;
