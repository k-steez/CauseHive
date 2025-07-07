import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import { useAuth } from './context/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-8 bg-red-100">
      <p className="text-red-700 font-bold text-xl">Something went wrong:</p>
      <pre className="text-red-500">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}

export default function App() {
  const { currentUser, logout } = useAuth();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                <Link to="/">CauseHive</Link>
              </h1>
              <nav>
                <ul className="flex space-x-4">
                  <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                  <li><Link to="/upload" className="hover:text-gray-300">Upload</Link></li>
                  <li><Link to="/search" className="hover:text-gray-300">Search</Link></li>
                  
                  {currentUser ? (
                    <>
                      <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
                      <li>
                        <button 
                          onClick={() => logout()} 
                          className="hover:text-gray-300"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                      <li><Link to="/signup" className="hover:text-gray-300">Sign Up</Link></li>
                    </>
                  )}
                  
                  <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
                  <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={currentUser ? <UploadPage /> : <Navigate to="/login" />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/photos/:id" element={<PhotoDetailPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 CauseHive. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
