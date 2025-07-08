import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'organizer' : 'user') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    setError('');
    try {
      const user = await signup(formData);
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 signup-card-dark" style={{ maxWidth: 440, width: '100%', borderRadius: 22 }}>
        <div className="text-center mb-4">
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=96&q=80" alt="Join CauseHive" className="rounded-circle mb-2" width={72} height={72} />
          <h2 className="fw-bold" style={{ color: '#00bcd4', letterSpacing: 1 }}>Join CauseHive</h2>
          <p className="text-muted mb-0">Create your account and start making a difference!</p>
        </div>
        {error && <div className="alert alert-danger text-center py-2">{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control signup-input-dark"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control signup-input-dark"
              placeholder="jane@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control signup-input-dark"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control signup-input-dark"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="role"
              id="organizerCheck"
              checked={formData.role === 'organizer'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="organizerCheck">
              Sign up as an <span className="fw-semibold">Organizer</span>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2 signup-btn-dark"
            disabled={loading}
            style={{ background: 'linear-gradient(90deg, #ff9800 0%, #00bcd4 100%)', border: 'none', fontSize: '1.1rem' }}
          >
            {loading ? <span className="circle-loader" style={{ verticalAlign: 'middle', marginRight: 8 }} /> : null}
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <small className="text-muted">Already have an account? <a href="/login" className="text-decoration-none" style={{ color: '#00bcd4' }}>Log in</a></small>
        </div>
        <div className="mt-3 text-center">
          <span className="badge bg-warning text-dark">Demo: Try signing up as "Jane Doe" to see how easy it is to join a cause!</span>
        </div>
      </div>
      {/* Creative background for signup page */}
      <style>{`
        .signup-bg {
          background: linear-gradient(120deg, #181c24 0%, #232526 100%);
        }
      `}</style>
    </div>
  );
}
