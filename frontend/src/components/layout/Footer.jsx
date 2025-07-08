import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer-custom mt-auto">
    <div className="container py-4">
      <div className="row mb-3">
        <div className="col-md-4 mb-3 mb-md-0">
          <h3 className="fw-bold mb-3">Cause<span style={{ color: '#10b981' }}>Hive</span></h3>
          <p>Empowering communities through shared moments and causes.</p>
        </div>
        <div className="col-md-2 mb-3 mb-md-0">
          <h5 className="mb-3">Pages</h5>
          <ul className="list-unstyled">
            <li><Link className="text-decoration-none text-dark" to="/">Home</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/causes">Causes</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/events">Events</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/about">About</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="col-md-3 mb-3 mb-md-0">
          <h5 className="mb-3">Get Involved</h5>
          <ul className="list-unstyled">
            <li><Link className="text-decoration-none text-dark" to="/register">Sign Up</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/login">Login</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/causes">Support a Cause</Link></li>
            <li><Link className="text-decoration-none text-dark" to="/start-campaign">Start a Campaign</Link></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-3">Contact</h5>
          <ul className="list-unstyled">
            <li>Email: <a href="mailto:info@causehive.com" className="text-decoration-none text-dark">info@causehive.com</a></li>
            <li>Twitter: <a href="https://twitter.com/causehive" className="text-decoration-none text-dark">@causehive</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center small mt-4">
        &copy; {new Date().getFullYear()} CauseHive. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
