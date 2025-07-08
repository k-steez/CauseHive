import React from 'react';
import '../global.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">CauseHive</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Projects</li>
        <li>About</li>
        <li>Donate</li>
        <li>Contact</li>
      </ul>
      <div className="icons">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
      </div>
    </nav>
  );
};

export default Navbar;
