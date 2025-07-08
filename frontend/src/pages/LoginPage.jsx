import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../global.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100" style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(120deg, #181c24 0%, #232526 100%)' }}>
      <div style={{ width: '100%', maxWidth: 420, borderRadius: 22, padding: '2.5rem 2rem', background: 'transparent', boxShadow: 'none' }}>
        <div className="text-center mb-4">
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=96&q=80" alt="Login CauseHive" className="rounded-circle mb-2" width={64} height={64} />
          <h2 className="fw-bold" style={{ color: '#00bcd4', letterSpacing: 1 }}>Welcome Back!</h2>
          <p style={{ color: '#b2ebf2' }} className="mb-0">Log in to support your favorite causes and track your impact.</p>
        </div>
        {error && <div className="alert alert-danger text-center py-2">{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#fff' }}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control login-input-dark"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ color: '#fff' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#fff' }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control login-input-dark"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ color: '#fff' }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-100 fw-bold py-2 login-btn-dark" style={{ fontSize: '1.1rem' }}>
            {loading ? <span className="circle-loader" style={{ verticalAlign: 'middle', marginRight: 8 }} /> : null}
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <small style={{ color: '#b2ebf2' }}>Don't have an account? <a href="/signup" className="text-decoration-none" style={{ color: '#00bcd4' }}>Sign up</a></small>
        </div>
        <div className="mt-3 text-center">
          <span className="badge bg-warning text-dark">Demo: Try <span style={{ color: '#fff' }}>demo@causehive.org</span> / <span style={{ color: '#fff' }}>password123</span></span>
        </div>
      </div>
    </div>
  );
}
