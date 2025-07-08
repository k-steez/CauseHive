import React from 'react';
import '../global.css';

const HeroSection = () => {
  return (
    <section className="hero hero-dark-bg">
      <div className="hero-content">
        <h1 className="hero-title">SUPPORT A CAUSE</h1>
        <p className="hero-subtitle">Every action counts. Every donation matters.</p>
        <p className="hero-description">Join us in making a difference for communities in need. Explore projects, donate, and see your impact in real time.</p>
        <div className="hero-cta-row">
          <a href="/causes" className="btn btn-lg btn-primary hero-cta">Explore Causes</a>
          <a href="/signup" className="btn btn-lg btn-outline-light hero-cta">Join Now</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
