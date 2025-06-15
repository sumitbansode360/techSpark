import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function EventDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    async function getEventDetail() {
      try {
        const res = await api.get(`/api/events/${id}/`);
        setEvent(res.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    }

    getEventDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/events/${id}/`);
      navigate('/'); 
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="delete-container">
      <div className="delete-card">
        <div className="delete-icon">
          <div className="warning-icon">⚠️</div>
        </div>

        <div className="delete-content">
          <h1>Delete Event</h1>
          <p>Are you sure you want to delete this event? This action cannot be undone.</p>

          <div className="event-summary">
            <div className="event-preview">
              <img
                src={event.thumbnail}
                alt={event.name}
                height={100}
                width={150}
              />
              <div className="event-details">
                <h3>{event.name}</h3>
                <p className="event-date">{new Date(event.date).toDateString()}</p>
                <p className="event-location">{event.location}</p>
                <p className="event-id">Event ID: #{event.id}</p>
              </div>
            </div>
          </div>

          <div className="delete-warning">
            <h4>What will happen:</h4>
            <ul>
              <li>The event will be permanently removed from the platform</li>
              <li>All registered attendees will be notified of the cancellation</li>
              <li>Refunds will be processed automatically within 5-7 business days</li>
              <li>Event analytics and data will be archived</li>
              <li>This action cannot be reversed</li>
            </ul>
          </div>

          <div className="confirmation-section">
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  required
                />
                I understand that this action is permanent and cannot be undone
              </label>
            </div>
          </div>

          <div className="delete-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button
              type="button"
              className="btn-danger"
              onClick={handleDelete}
              disabled={!isConfirmed}
            >
              Delete Event Permanently
            </button>
          </div>

          <div className="delete-note">
            <p>
              <strong>Need help?</strong> If you're having issues or need to postpone instead of delete, <a href="#support">contact our support team</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDelete;
