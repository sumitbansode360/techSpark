import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import "../style/style.css";

export default function EventUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState("");
  const [gallery, setGallery] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await api.get(`/api/events/${id}`);
        const data = res.data;

        setName(data.name);
        setDescription(data.description);
        setLocation(data.location);
        setDate(data.date.slice(0, 10)); // Format to YYYY-MM-DD
        setPrice(data.price);
        setCapacity(data.capacity);
        setExistingThumbnailUrl(data.thumbnail);
        setExistingGallery(data.images || []);
      } catch (err) {
        console.error("Failed to fetch event data:", err);
      }
    }

    fetchEvent();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('updating event');
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("price", price);
    formData.append("capacity", capacity);
    
    
    
    // Only append if a new file is selected
    if (thumbnail && thumbnail instanceof File) {
      formData.append("thumbnail", thumbnail);
    }

    gallery.forEach((file) => {
      formData.append("uploaded_images", file);
    });
    try {
      const res = await api.patch(`/api/events/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event updated:", res.data);
      navigate(`/event/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="form-container">
          <div className="container">
            <div className="form-header">
              <h1>Update Event</h1>
              <p>Modify event details below</p>
            </div>

            <form className="event-form" onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div className="form-section">
                <h2>Basic Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Title *</label>
                    <input
                      type="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      rows="4"
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Location & Date */}
              <div className="form-section">
                <h2>Location & Time</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={location}
                      required
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={date}
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Price & Capacity */}
              <div className="form-section">
                <h2>Pricing & Capacity</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ticket Price *</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">₹</span>
                      <input
                        type="number"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Capacity *</label>
                    <input
                      type="number"
                      value={capacity}
                      required
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="form-section">
                <h2>Previous Thumbnail Image</h2>
                {existingThumbnailUrl && (
                  <div className="form-row">
                    <img
                      src={existingThumbnailUrl}
                      alt="Current Thumbnail"
                      className="thumbnail-preview"
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                )}
                <div className="form-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div className="form-section">
                <h2>Previous Gallery Images</h2>
                <div className="gallary-flex">
                  {existingGallery.map((img, index) => (
                    <div key={img.id} className="gallery-preview">
                      <img
                        src={img.image}
                        alt={`gallery-${index}`}
                        style={{ height: "70px", width: "70px" }}
                      />
                    </div>
                  ))}
                </div>
                {/* New Uploaded Images (Preview) */}
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
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
