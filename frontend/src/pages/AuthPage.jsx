import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode = 'login' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [organization, setOrganization] = useState('');
  const [mission, setMission] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        const userData = {
          email,
          password,
          name,
          role: isOrganizer ? 'organizer' : 'user',
          ...(isOrganizer && { organization, mission })
        };
        await signup(userData);
      }
    } catch (err) {
      setError('Failed to authenticate: ' + err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 auth-bg">
      <div className="card shadow-lg p-4" style={{ maxWidth: 420, width: '100%', borderRadius: 18 }}>
        <div className="text-center mb-4">
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=96&q=80" alt="Welcome to CauseHive" className="rounded-circle mb-2" width={64} height={64} />
          <h2 className="fw-bold" style={{ color: '#1a237e' }}>{mode === 'login' ? 'Welcome Back!' : 'Sign Up for CauseHive'}</h2>
          <p className="text-muted mb-0">{mode === 'login' ? 'Log in to support or organize a cause.' : 'Create your account and start making a difference!'}</p>
        </div>
        {error && <div className="alert alert-danger text-center py-2">{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          {mode === 'signup' && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          {mode === 'signup' && (
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isOrganizer}
                onChange={(e) => setIsOrganizer(e.target.checked)}
                id="organizerCheck"
              />
              <label className="form-check-label" htmlFor="organizerCheck">
                Sign up as an <span className="fw-semibold">Organizer</span>
              </label>
            </div>
          )}
          {mode === 'signup' && isOrganizer && (
            <>
              <div className="mb-3">
                <label htmlFor="organization" className="form-label">Organization Name</label>
                <input
                  id="organization"
                  type="text"
                  className="form-control"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mission" className="form-label">Mission Statement</label>
                <textarea
                  id="mission"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  className="form-control"
                  rows="3"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2"
            disabled={loading}
            style={{ background: 'linear-gradient(90deg, #ff9800 0%, #f44336 100%)', border: 'none' }}
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <small className="text-muted">Don't have an account? <a href="/signup" className="text-decoration-none" style={{ color: '#f44336' }}>Sign Up</a></small>
          ) : (
            <small className="text-muted">Already have an account? <a href="/login" className="text-decoration-none" style={{ color: '#f44336' }}>Login</a></small>
          )}
        </div>
        <div className="mt-3 text-center">
          <span className="badge bg-warning text-dark">Demo: Try logging in as "donor@email.com" to explore the app!</span>
        </div>
      </div>
      {/* Creative background for auth page */}
      <style>{`
        .auth-bg {
          background: linear-gradient(120deg, #e3f2fd 0%, #fffde7 100%);
        }
      `}</style>
    </div>
  );
}
