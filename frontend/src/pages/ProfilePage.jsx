import React, { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import { getPhotosByUser } from '../services/photoService';
import { getCurrentUser } from '../services/mockAuthService';
import EditProfileModal from '../components/EditProfileModal';
import UpgradeModal from '../components/UpgradeModal';

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
    <div className="max-w-6xl mx-auto p-4">
      {/* User Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
            <button 
              onClick={() => setShowEditModal(true)}
              className="text-blue-600 hover:text-blue-800 text-sm md:text-base"
            >
              Edit
            </button>
          </div>
          <p className="text-gray-600 mt-2 text-sm md:text-base">{user.bio}</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 md:flex gap-4 md:gap-8 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{photoCount}</div>
              <div className="text-gray-500">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalLikes}</div>
              <div className="text-gray-500">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalComments}</div>
              <div className="text-gray-500">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">42</div>
              <div className="text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">28</div>
              <div className="text-gray-500">Following</div>
            </div>
          </div>
        </div>
      </div>
      
      {user.role === 'organizer' && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">About My Organization</h2>
          <p className="text-gray-700">{user.bio || 'No bio provided'}</p>
          
          <h2 className="text-xl font-bold mt-4 mb-2">Contact Information</h2>
          <ul>
            <li>Email: {user.contactEmail || 'Not provided'}</li>
            <li>Phone: {user.contactPhone || 'Not provided'}</li>
            <li>Website: {user.website ? (
              <a href={user.website} className="text-blue-500 hover:underline">{user.website}</a>
            ) : 'Not provided'}</li>
          </ul>
        </div>
      )}
      
      {user.role === 'user' && (
        <div className="mb-6">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Become an Organizer
          </button>
        </div>
      )}
      
      {/* Photos Section */}
      <h2 className="text-2xl font-bold mb-6">My Photos</h2>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map(photo => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
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
  );
};

export default ProfilePage;
