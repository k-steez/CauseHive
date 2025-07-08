import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPhotoById, getComments, likePhoto } from '../services/mockPhotoService';
import Navbar from '../components/Navbar';
import '../global.css';

/**
 * Photo detail page component.
 * 
 * Displays a single photo with its metadata, comments, and a like button.
 */
export default function PhotoDetailPage() {
  // Get the photo ID from the URL parameter
  const { id } = useParams();
  
  // State variables to store the photo, comments, loading status, and error message
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Fetches the photo and comments data from the API.
   * 
   * This function is called when the component mounts or when the photo ID changes.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const photoData = await getPhotoById(id);
        if (!photoData) {
          setError('Photo not found');
          return;
        }
        
        const commentsData = await getComments(id);
        setPhoto(photoData);
        setComments(commentsData);
      } catch (err) {
        setError('Failed to load photo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  /**
   * Handles the like button click event.
   * 
   * Increments the photo's like count and updates the state.
   */
  const handleLike = async () => {
    if (!photo) return;
    
    try {
      await likePhoto(photo.id);
      setPhoto({ ...photo, likes: photo.likes + 1 });
    } catch (err) {
      console.error('Failed to like photo', err);
    }
  };

  // Display a loading message if the data is still being fetched
  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  // Display an error message if there was an error fetching the data
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <section style={{ maxWidth: 700, margin: '3rem auto', background: '#181818', borderRadius: 16, padding: '2.5rem 2rem', color: '#fff', boxShadow: '0 4px 32px rgba(0,0,0,0.2)' }}>
        <div className="mb-8">
          <img 
            src={photo.imageUrl} 
            alt={photo.title} 
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold" style={{ color: '#00bcd4', marginBottom: 16 }}>{photo.title}</h1>
          <button 
            onClick={handleLike}
            className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={photo.liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{photo.likes}</span>
          </button>
        </div>
        
        <p className="text-gray-700 mb-4" style={{ color: '#ccc', fontSize: 18, marginBottom: 18 }}>{photo.description}</p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {photo.tags.map(tag => (
              <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">User {comment.userId}</span>
                  <span className="text-gray-500 text-sm">{comment.createdAt}</span>
                </div>
                <p className="mt-1">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
