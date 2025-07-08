import React from 'react';
import Navbar from '../components/Navbar';
import '../global.css';

const OrganizerProfilePage = () => (
  <>
    <Navbar />
    <section style={{ maxWidth: 600, margin: '3rem auto', background: '#181818', borderRadius: 16, padding: '2.5rem 2rem', color: '#fff', boxShadow: '0 4px 32px rgba(0,0,0,0.2)' }}>
      <h1 style={{ color: '#00bcd4', marginBottom: 16 }}>Organizer Profile</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
        <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Organizer" style={{ width: 80, borderRadius: '50%' }} />
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>Sam Lee</div>
          <div style={{ color: '#00bcd4', fontSize: 15 }}>Project Organizer</div>
        </div>
      </div>
      <h2 style={{ color: '#00bcd4', marginTop: 32, marginBottom: 12 }}>Projects Managed</h2>
      <ul style={{ color: '#bbb', fontSize: 16, marginLeft: 24 }}>
        <li>Clean Water for All</li>
        <li>Education for Every Child</li>
      </ul>
      <h2 style={{ color: '#00bcd4', marginTop: 32, marginBottom: 12 }}>Contact</h2>
      <div style={{ color: '#ccc', fontSize: 16 }}>
        Email: sam.lee@email.com<br />
        Member since: Feb 2025
      </div>
    </section>
  </>
);

export default OrganizerProfilePage;
