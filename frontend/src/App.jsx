import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import CausesPage from './pages/CausesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import CauseDetailPage from './pages/CauseDetailPage';
import CreateCausePage from './pages/CreateCausePage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import EditCausePage from './pages/EditCausePage';
import { useAuth } from './context/AuthContext';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '2rem', backgroundColor: '#FEE2E2', color: '#B91C1C' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Something went wrong</h2>
      <pre style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{error.message}</pre>
      <pre style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
        {error.stack}
      </pre>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#B91C1C',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}

function AppContent() {
  const { currentUser, logout, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #3B82F6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }}></div>
          <p style={{ color: '#4B5563' }}>Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#1F2937',
          color: 'white',
          padding: '1rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>CauseHive</Link>
            </h1>
            <nav>
              <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
                <li><Link to="/causes" style={{ color: 'white', textDecoration: 'none' }}>Causes</Link></li>
                
                {currentUser ? (
                  <>
                    <li><Link to="/upload" style={{ color: 'white', textDecoration: 'none' }}>Upload</Link></li>
                    <li><Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link></li>
                    <li>
                      <button 
                        onClick={() => logout()} 
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          padding: 0,
                          fontSize: '1rem'
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
                    <li><Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link></li>
                  </>
                )}
                
                <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
                <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          flexGrow: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '1rem'
        }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/causes" element={<CausesPage />} />
              <Route path="/upload" element={currentUser ? <UploadPage /> : <Navigate to="/login" />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/photos/:id" element={<PhotoDetailPage />} />
              <Route path="/causes/:id" element={<CauseDetailPage />} />
              <Route path="/start-campaign" element={currentUser ? <CreateCausePage /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={currentUser ? <OrganizerDashboardPage /> : <Navigate to="/login" />} />
              <Route path="/causes/:id/edit" element={currentUser ? <EditCausePage /> : <Navigate to="/login" />} />
            </Routes>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#1F2937',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p>&copy; 2025 CauseHive. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
