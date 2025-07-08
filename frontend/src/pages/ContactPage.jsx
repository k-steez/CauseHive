import React from 'react';
import Navbar from '../components/Navbar';
import '../global.css';

const ContactPage = () => (
  <>
    <Navbar />
    <section style={{ maxWidth: 600, margin: '3rem auto', background: '#181818', borderRadius: 16, padding: '2.5rem 2rem', color: '#fff', boxShadow: '0 4px 32px rgba(0,0,0,0.2)' }}>
      <h1 style={{ color: '#00bcd4', marginBottom: 16 }}>Contact Us</h1>
      <p style={{ color: '#ccc', fontSize: 18, marginBottom: 24 }}>
        Have a question, suggestion, or want to partner with CauseHive? Reach out to us!
      </p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <label style={{ color: '#fff', fontWeight: 500 }}>Name
          <input type="text" placeholder="Your Name" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', background: '#222', color: '#fff', marginTop: 6 }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>Email
          <input type="email" placeholder="you@email.com" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', background: '#222', color: '#fff', marginTop: 6 }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>Message
          <textarea placeholder="How can we help?" rows={4} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', background: '#222', color: '#fff', marginTop: 6 }} />
        </label>
        <button type="submit" style={{ background: '#00bcd4', color: '#fff', border: 'none', borderRadius: 6, padding: 12, fontWeight: 600, fontSize: 16, marginTop: 8, cursor: 'pointer', transition: 'background 0.2s' }}>Send Message</button>
      </form>
      <div style={{ marginTop: 32, color: '#888', fontSize: 13, textAlign: 'center' }}>
        Or email us at <a href="mailto:info@causehive.org" style={{ color: '#00bcd4', textDecoration: 'underline' }}>info@causehive.org</a>
      </div>
    </section>
  </>
);

export default ContactPage;
