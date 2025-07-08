import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AlbumGrid from '../components/AlbumGrid';
import ChatWidget from '../components/ChatWidget';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // Optional: Animate carousel on mount
  }, []);
  return (
    <div className="homepage-dark-bg">
      <Navbar />
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-track">
            {/* Infinite carousel slides */}
            {[1,2,3,4,5,6].map((i) => (
              <div className="carousel-slide" key={i}>
                <img src={`https://source.unsplash.com/1200x500/?donation,community,volunteer,${i}`} alt="Donation Event" />
                <div className="carousel-caption">
                  <h2>{[
                    'Together We Can Change Lives',
                    'Support Education for All',
                    'Clean Water for Every Village',
                    'Feed a Family, Feed a Future',
                    'Empower Women, Empower Communities',
                    'Join the Movement for Good',
                  ][i-1]}</h2>
                  <p>{[
                    'Your donation helps us reach more people in need.',
                    'Every child deserves a chance to learn and grow.',
                    'Safe water is a right, not a privilege.',
                    'No one should go to bed hungry.',
                    'Support women-led projects and see the impact.',
                    'Be part of a global community of changemakers.',
                  ][i-1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HeroSection />
      <section className="info-panels-section">
        <div className="info-panels">
          <div className="info-panel">
            <h3>Why Donate with CauseHive?</h3>
            <ul>
              <li>Verified projects & transparent impact</li>
              <li>Track your donations in real time</li>
              <li>Connect with a global community</li>
              <li>100% of donations go to causes</li>
            </ul>
          </div>
          <div className="info-panel">
            <h3>For Organizers</h3>
            <ul>
              <li>Launch and manage campaigns easily</li>
              <li>Engage donors with updates & photos</li>
              <li>Access analytics and donor insights</li>
              <li>Grow your impact with our tools</li>
            </ul>
          </div>
          <div className="info-panel">
            <h3>For Volunteers</h3>
            <ul>
              <li>Find local and global opportunities</li>
              <li>Join events and make new friends</li>
              <li>Earn badges and recognition</li>
              <li>Share your story and inspire others</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Embed project photos below info section */}
      <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        <AlbumGrid />
      </div>
      <section className="impact-section">
        <div className="impact-stats">
          <div className="impact-stat">
            <h4>12,000+</h4>
            <span>Donors</span>
          </div>
          <div className="impact-stat">
            <h4>350+</h4>
            <span>Projects Funded</span>
          </div>
          <div className="impact-stat">
            <h4>40</h4>
            <span>Countries Reached</span>
          </div>
          <div className="impact-stat">
            <h4>1M+</h4>
            <span>Lives Impacted</span>
          </div>
        </div>
      </section>
      <ChatWidget />
    </div>
  );
};

export default HomePage;
