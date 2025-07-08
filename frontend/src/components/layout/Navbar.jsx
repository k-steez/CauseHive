import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = null; // Auth temporarily disabled to fix crash
  const logout = () => {}; // Mock logout function
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/causes', label: 'Causes' },
    { to: '/events', label: 'Events' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-custom shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Cause<span style={{ color: '#10b981' }}>Hive</span>
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${isOpen ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.to}>
                <Link
                  className={`nav-link${location.pathname === link.to ? ' active fw-bold' : ''}`}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary ms-2" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-secondary ms-2" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary ms-2" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-2" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
