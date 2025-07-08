import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { getEventsByOrganizer, createEvent, updateEvent, deleteEvent } from '../services/eventService';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const organizerId = 'current-user-id'; 
      const data = await getEventsByOrganizer(organizerId);
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (eventData) => {
    try {
      await createEvent(eventData);
      fetchEvents();
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create event', err);
    }
  };

  const handleUpdate = async (eventId, eventData) => {
    try {
      await updateEvent(eventId, eventData);
      fetchEvents();
      setSelectedEvent(null);
    } catch (err) {
      console.error('Failed to update event', err);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      fetchEvents();
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: '#1a237e' }}>Organizer Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-warning fw-bold"
        >
          <i className="bi bi-plus-circle me-2"></i> Create New Event
        </button>
      </div>
      {showForm && (
        <div className="mb-4 p-4 bg-light rounded shadow-sm">
          <h2 className="fw-bold mb-3">{selectedEvent ? 'Edit Event' : 'Create New Event'}</h2>
          <EventForm 
            onSubmit={selectedEvent ? (data) => handleUpdate(selectedEvent.id, data) : handleCreate} 
            initialData={selectedEvent}
          />
        </div>
      )}
      <div>
        <h2 className="fw-bold mb-3">My Events</h2>
        {events.length === 0 ? (
          <div className="alert alert-info">No events created yet. Start by creating your first event!</div>
        ) : (
          <div className="row g-3">
            {events.map(event => (
              <div key={event.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{event.title}</h5>
                    <p className="card-text mb-1"><i className="bi bi-calendar-event me-1"></i> {event.date}</p>
                    <p className="card-text mb-2"><i className="bi bi-geo-alt me-1"></i> {event.location}</p>
                    <div className="d-flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowForm(true);
                        }}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-5 text-center">
        <img src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80" alt="Organizer Inspiration" className="rounded shadow" style={{ maxHeight: 120 }} />
        <div className="small text-muted mt-2">Organize, inspire, and make a difference with every event!</div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
