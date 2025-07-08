import React, { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import { getPhotosByUser } from '../services/photoService';
import { getCurrentUser } from '../services/mockAuthService';
import EditProfileModal from '../components/EditProfileModal';
import UpgradeModal from '../components/UpgradeModal';
import Navbar from '../components/Navbar';
import '../global.css';

const ProfilePage = () => {
  const [user, setUser] = useState(getCurrentUser());
  
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const userPhotos = await getPhotosByUser(user.id);
        setPhotos(userPhotos);
      } catch (err) {
        console.error('Failed to load photos', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhotos();
  }, [user.id]);
  
  // Calculate stats
  const photoCount = photos.length;
  const totalLikes = photos.reduce((sum, photo) => sum + photo.likes, 0);
  const totalComments = photos.reduce((sum, photo) => sum + (photo.comments ? photo.comments.length : 0), 0);
  
  const handleSaveProfile = (updatedProfile) => {
    setUser({
      ...user,
      name: updatedProfile.name,
      bio: updatedProfile.bio
    });
  };
  
  const handleUpgrade = (organizerInfo) => {
    // In a real app, this would call an API
    setUser({
      ...user,
      role: 'organizer',
      ...organizerInfo
    });
  };
  
  return (
    <>
      <Navbar />
      <div className="profile-bg">
        <div className="profile-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="profile-avatar" />
            <div className="profile-name">{user.name}</div>
            <div className="profile-role">{user.role === 'organizer' ? 'Organizer' : 'Donor'}</div>
            <button
              onClick={() => setShowEditModal(true)}
              className="profile-btn"
              style={{ marginTop: 8, marginBottom: 0 }}
            >Edit Profile</button>
          </div>
          <div className="profile-stats">
            <div className="profile-stat-card">
              <h4>{photoCount}</h4>
              <span>Photos</span>
            </div>
            <div className="profile-stat-card">
              <h4>{totalLikes}</h4>
              <span>Likes</span>
            </div>
            <div className="profile-stat-card">
              <h4>{totalComments}</h4>
              <span>Comments</span>
            </div>
          </div>
          {user.role === 'organizer' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="profile-section-title">About My Organization</div>
              <div className="profile-donations">{user.bio || 'No bio provided'}</div>
              <div className="profile-section-title">Contact Information</div>
              <div className="profile-account">
                <div>Email: {user.contactEmail || 'Not provided'}</div>
                <div>Phone: {user.contactPhone || 'Not provided'}</div>
                <div>Website: {user.website ? (
                  <a href={user.website} style={{ color: '#00bcd4', textDecoration: 'underline' }}>{user.website}</a>
                ) : 'Not provided'}</div>
              </div>
            </div>
          )}
          {user.role === 'user' && (
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="profile-btn"
              >Become an Organizer</button>
            </div>
          )}
          <div className="profile-section-title">Your Donations</div>
          <div className="profile-donations">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Clean Water for All - $100</li>
              <li>Education for Every Child - $50</li>
              <li>Food Relief Program - $75</li>
            </ul>
          </div>
          <div className="profile-section-title">Account Info</div>
          <div className="profile-account">
            Email: alex.kim@email.com<br />
            Member since: Jan 2025
          </div>
        </div>
        <div className="profile-section-title">My Photos</div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
            <div className="causes-loader" />
          </div>
        ) : photos.length > 0 ? (
          <div className="profile-photo-grid">
            {photos.map(photo => (
              <div className="profile-photo-card" key={photo.id}>
                <img src={photo.url} alt={photo.title} />
                <div className="profile-photo-card-body">
                  <h4>{photo.title}</h4>
                  <p>{photo.description || ''}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#b2ebf2' }}>
            No photos uploaded yet.
          </div>
        )}
        {showEditModal && (
          <EditProfileModal 
            user={user}
            onSave={handleSaveProfile}
            onClose={() => setShowEditModal(false)}
          />
        )}
        {showUpgradeModal && (
          <UpgradeModal 
            onUpgrade={handleUpgrade}
            onClose={() => setShowUpgradeModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
