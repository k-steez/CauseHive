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
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Event
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            {selectedEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <EventForm 
            onSubmit={selectedEvent ? (data) => handleUpdate(selectedEvent.id, data) : handleCreate} 
            initialData={selectedEvent}
          />
        </div>
      )}
      
      <div>
        <h2 className="text-2xl font-bold mb-4">My Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No events created yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
