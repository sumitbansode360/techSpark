import React, { useEffect, useState } from "react";
import api from "../api";
import "../style/style.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.get("api/user/whoami/");
        const data = res.data
        setUser(data.id)
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getEventDetail() {
      try {
        const res = await api.get(`api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    }

    getEventDetail();
  }, [id]); // ✅ Use `id`, not `event`, in dependency array

  if (!event) return <p>Loading...</p>;

  return (
    
    <>
      <Navbar />
      <main className="main-content">
        <div className="event-detail-container">
          {/* === DYNAMIC CAROUSEL === */}
          <div className="carousel-container">
            <div className="carousel">
              <div className="carousel-slides">
                {event.images.map((img, index) => (
                  <div className="slide" key={img.id}>
                    <img src={img.image} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </div>

              <div className="carousel-controls">
                {event.images.map((_, index) => (
                  <button
                    key={index}
                    className="carousel-dot"
                    onClick={() => {
                      const slides = document.querySelectorAll(".slide");
                      slides.forEach((slide) => (slide.style.display = "none"));
                      slides[index].style.display = "block";
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          <div className="event-info">
            {user == event.author ? (
              <div className="event-actions">
                <Link to={`/event/delete/${event.id}`}>
                  <button className="icon-button-delete" title="Delete Event">
                    🗑️
                  </button>
                </Link>
                <button
                  className="icon-button"
                  onClick={() => navigate(`/event/update/${event.id}`)}
                  title="Edit Event"
                >
                  ✏️
                </button>
              </div>
            ) : (
              <div></div>
            )}

            <div className="container">
              <div className="event-header">
                <h1>{event.name}</h1>
                <div className="event-meta">
                  <div className="meta-item">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="meta-item">
                    <strong>Location:</strong> {event.location}
                  </div>
                  <div className="meta-item">
                    <strong>Capacity:</strong> {event.capacity}
                  </div>
                </div>
              </div>

              <div className="event-description">
                <h2>About This Event</h2>
                <p>{event.description}</p>
              </div>

              <div className="booking-section">
                <div className="price-info">
                  <span className="price">₹{event.price}</span>
                  <span className="price-note">Limited seats</span>
                </div>
                <button className="btn-primary btn-large">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
