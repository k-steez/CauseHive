import React from 'react';
import Navbar from '../components/Navbar';
import PhotoUpload from '../components/PhotoUpload';
import '../global.css';

const UploadPage = () => {
  const handleUpload = (files) => {
    console.log('Uploading files:', files);
    // TODO: Implement actual upload logic
  };

  return (
    <>
      <Navbar />
      <section style={{ maxWidth: 600, margin: '3rem auto', background: '#181818', borderRadius: 16, padding: '2.5rem 2rem', color: '#fff', boxShadow: '0 4px 32px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: '#00bcd4', marginBottom: 16 }}>Share Your Impact</h1>
        <p style={{ color: '#ccc', fontSize: 18, marginBottom: 24 }}>
          Upload photos and stories from your volunteering or donation experience. Inspire others to join the cause!
        </p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label style={{ color: '#fff', fontWeight: 500 }}>Title
            <input type="text" placeholder="Photo Title" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', background: '#222', color: '#fff', marginTop: 6 }} />
          </label>
          <label style={{ color: '#fff', fontWeight: 500 }}>Photo
            <input type="file" style={{ width: '100%', marginTop: 6 }} />
          </label>
          <label style={{ color: '#fff', fontWeight: 500 }}>Story
            <textarea placeholder="Share your story..." rows={4} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', background: '#222', color: '#fff', marginTop: 6 }} />
          </label>
          <button type="submit" style={{ background: '#00bcd4', color: '#fff', border: 'none', borderRadius: 6, padding: 12, fontWeight: 600, fontSize: 16, marginTop: 8, cursor: 'pointer', transition: 'background 0.2s' }}>Upload</button>
        </form>
        <div style={{ marginTop: 32, color: '#888', fontSize: 13, textAlign: 'center' }}>
          Thank you for sharing your impact!
        </div>
      </section>
    </>
  );
};

export default UploadPage;
