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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        {mode === 'signup' && (
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isOrganizer}
                onChange={(e) => setIsOrganizer(e.target.checked)}
                className="mr-2"
              />
              Sign up as an Organizer
            </label>
          </div>
        )}
        
        {mode === 'signup' && isOrganizer && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="organization">
                Organization Name
              </label>
              <input
                id="organization"
                type="text"
                className="w-full p-2 border rounded"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="mission">
                Mission Statement
              </label>
              <textarea
                id="mission"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>
          </>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up')}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
