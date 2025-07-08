
// EditCausePage.jsx - Final polish for dark/modern style, circling loader, and lively mock content
import React, { useState } from "react";
import "../global.css";

const mockCause = {
  title: "Clean Water for All",
  description:
    "Help us bring clean, safe water to remote villages. Your donation funds wells, filtration systems, and community education.",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  goal: 10000,
  raised: 7200,
  organizer: "AquaHope Foundation",
  location: "Kisumu, Kenya",
  date: "2025-08-15",
};

function EditCausePage() {
  const [form, setForm] = useState({
    title: mockCause.title,
    description: mockCause.description,
    image: mockCause.image,
    goal: mockCause.goal,
    location: mockCause.location,
    date: mockCause.date,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center dark-bg-gradient py-5">
      <div className="edit-cause-card p-4 rounded-4 shadow-lg bg-dark text-light w-100" style={{ maxWidth: 540 }}>
        <h2 className="fw-bold mb-3 text-center text-accent">Edit Cause</h2>
        <div className="text-center mb-4">
          <img
            src={form.image}
            alt="Cause"
            className="rounded-3 shadow cause-img mb-2"
            style={{ width: "100%", maxHeight: 220, objectFit: "cover" }}
          />
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-accent"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control bg-dark text-light border-accent"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control bg-dark text-light border-accent"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Goal Amount ($)</label>
              <input
                type="number"
                className="form-control bg-dark text-light border-accent"
                name="goal"
                value={form.goal}
                onChange={handleChange}
                min={1}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-accent"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Event Date</label>
            <input
              type="date"
              className="form-control bg-dark text-light border-accent"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <button
              type="submit"
              className="btn btn-accent px-4 py-2 fw-bold position-relative"
              disabled={loading}
            >
              {loading ? (
                <span className="circling-loader-sm"></span>
              ) : (
                "Save Changes"
              )}
            </button>
            {success && (
              <span className="text-success ms-3 fw-semibold">Saved!</span>
            )}
          </div>
        </form>
        <div className="mt-4">
          <h5 className="mb-2 text-accent">Organizer</h5>
          <div className="d-flex align-items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Organizer"
              className="rounded-circle border border-accent"
              style={{ width: 48, height: 48, objectFit: "cover" }}
            />
            <div>
              <div className="fw-bold">{mockCause.organizer}</div>
              <div className="small text-secondary">Verified Organizer</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="mb-2 text-accent">Progress</h5>
          <div className="progress bg-secondary" style={{ height: 12 }}>
            <div
              className="progress-bar bg-accent"
              role="progressbar"
              style={{ width: `${(mockCause.raised / mockCause.goal) * 100}%` }}
              aria-valuenow={mockCause.raised}
              aria-valuemin={0}
              aria-valuemax={mockCause.goal}
            ></div>
          </div>
          <div className="d-flex justify-content-between mt-1 small">
            <span>${mockCause.raised.toLocaleString()} raised</span>
            <span>Goal: ${mockCause.goal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCausePage;
