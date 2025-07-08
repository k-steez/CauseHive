import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <motion.div 
      className="hero-section position-relative text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.10 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: "url('https://images.unsplash.com/photo-1516575606242-7d117e6a3e80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat"
        }} />
      </div>
      <div className="position-relative mx-auto z-1" style={{ maxWidth: '900px' }}>
        <h1 className="section-title mb-4">Make an Impact with Every Moment</h1>
        <p className="lead mb-5" style={{ color: '#f3f4f6' }}>Share your photos, support causes, and build community through the power of shared experiences.</p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link to="/causes" className="btn btn-creative btn-lg">Explore Causes</Link>
          <Link to="/start-campaign" className="btn btn-outline-primary btn-lg">Start a Campaign</Link>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', height: '4rem', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}></div>
    </motion.div>
  );
}
