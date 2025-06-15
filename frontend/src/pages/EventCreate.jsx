import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../style/style.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function EventCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [capacity, setCapacity] = useState("");
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(
      (file) =>
        !gallery.some((g) => g.name === file.name && g.size === file.size)
    );
    setGallery((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const createEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("thumbnail", thumbnail);

    gallery.forEach((file) => {
      formData.append("uploaded_images", file);
    });

    try {
      const res = await api.post("/api/events/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event created successfully:", res.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="main-content">
        <div className="form-container">
          <div className="container">
            <div className="form-header">
              <h1>Create New Event</h1>
              <p>Fill in the details to create an amazing tech event</p>
            </div>

            <form className="event-form" onSubmit={createEvent}>
              {/* Basic Info */}
              <div className="form-section">
                <h2>Basic Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="event-title">Event Title *</label>
                    <input
                      type="text"
                      id="event-title"
                      required
                      placeholder="e.g., AI Conference 2024"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="event-description">Description *</label>
                    <textarea
                      id="event-description"
                      rows="4"
                      required
                      placeholder="Describe your event..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="form-section">
                <h2>Location & Venue</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="venue-name">Address *</label>
                    <input
                      type="text"
                      id="venue-name"
                      required
                      placeholder="e.g., R.J Nagar, Mumbai, 400047"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="form-section">
                <h2>Date & Time</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="start-date">Date *</label>
                    <input
                      type="date"
                      id="start-date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="form-section">
                <h2>Pricing & Capacity</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ticket-price">Ticket Price *</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input
                        type="number"
                        id="ticket-price"
                        min="0"
                        step="0.01"
                        required
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="max-capacity">Maximum Capacity *</label>
                    <input
                      type="number"
                      id="max-capacity"
                      min="1"
                      required
                      placeholder="e.g., 500"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="form-section">
                <h2>Event Images</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="main-image">Main Event Image *</label>
                    <input
                      type="file"
                      id="main-image"
                      accept="image/*"
                      required
                      onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gallery-images">
                      Gallery Images{" "}
                      {gallery.length > 0 && `(${gallery.length})`}
                    </label>
                    <input
                      type="file"
                      id="gallery-images"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {gallery.length > 0 && (
                  <div className="gallery-preview">
                    {gallery.map((file, index) => (
                      <div key={index} className="preview-image-wrapper">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`gallery-${index}`}
                          className="preview-image"
                        />
                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={() => removeImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventCreate;
