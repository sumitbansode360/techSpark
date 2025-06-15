import { useState, useEffect } from "react";
import "./style/style.css";
import EventCard from "./components/EventCard";
import Navbar from "./components/Navbar";
import api from "./api";

function App() {
  const [count, setCount] = useState(0);
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function getEvent() {
      try {
        const res = await api.get("api/events/");
        const data = await res.data;
        setEvent(data);
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
        <section className="hero">
          <div className="hero-content">
            <h1>Discover Amazing Tech Events</h1>
            <p>
              Join the most exciting technology conferences, workshops, and
              meetups
            </p>
          </div>
        </section>

        <section className="events-section">
          <div className="container">
            <h2>Featured Events</h2>
            <div className="events-grid">
              {
                event.map((event, index)=>{
                  return(
                    <EventCard key={index} id={event.id} name={event.name} description={event.description} location={event.location} date={event.date} thumbnail={event.thumbnail} />
                  )
                })
              }
              
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
