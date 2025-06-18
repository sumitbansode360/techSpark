import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BookingSuccess() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const ticketRef = useRef(); // ref to capture the ticket

  useEffect(() => {
    async function getEventDetail() {
      try {
        const res = await api.get(`api/events/${id}/`);
        setEvent(res.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    }

    getEventDetail();
  }, []);

  const handleDownload = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Ticket-${event.name || "Event"}-${id}.pdf`);
  };

  if (!event || !event.name) return <p>Loading booking details...</p>;
  return (
    <div className="success-container">
      <div className="success-card" ref={ticketRef}>
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>

        <div className="success-content">
          <h1>Booking Confirmed!</h1>
          <p>
            Your registration for {event.name} has been successfully confirmed.
          </p>

          <div className="booking-summary">
            <h3>Booking Details</h3>
            <div className="summary-item">
              <strong>Event:</strong> {event.name}
            </div>
            <div className="summary-item">
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className="summary-item">
              <strong>Location:</strong> {event.location}
            </div>
            <div className="summary-item">
              <strong>Confirmation ID:</strong> #TC2025-{id}
            </div>
            <div className="summary-item">
              <strong>Amount Paid:</strong> ₹{event.price}
            </div>
          </div>

          <div className="success-actions">
            <Link to={"/"}>
              <button className="btn-primary">Back to Home</button>
            </Link>
            <button className="btn-secondary" onClick={handleDownload}>
              Download Ticket
            </button>
          </div>

          <div className="success-note">
            <p>
              A confirmation email has been sent to your registered email
              address with your ticket and event details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;
