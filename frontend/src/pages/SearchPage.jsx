import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import { searchPhotos } from '../services/photoService';
import Navbar from '../components/Navbar';
import '../global.css';

const mockResults = [
  {
    title: 'Clean Water for All',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Help us build wells and provide clean water to rural communities.',
  },
  {
    title: 'Education for Every Child',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Support our mission to supply books and resources to children in need.',
  },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');
  const [results, setResults] = useState(mockResults);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(12);
  const debounceRef = useRef(null);
  
  useEffect(() => {
    // Clear any existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Set new timeout
    debounceRef.current = setTimeout(() => {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const photos = await searchPhotos(query, tag);
          setResults(Array.isArray(photos) ? photos : []);
        } catch (err) {
          console.error('Search failed', err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      
      fetchResults();
    }, 300);
    
    // Cleanup timeout on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, tag]);
  
  // Get current results
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query, tag });
  };
  
  return (
    <>
      <Navbar />
      <section style={{ maxWidth: 800, margin: '3rem auto', background: '#181818', borderRadius: 16, padding: '2.5rem 2rem', color: '#fff', boxShadow: '0 4px 32px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: '#00bcd4', marginBottom: 16 }}>Search Causes</h1>
        <input
          type="text"
          placeholder="Search for a cause..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', background: '#222', color: '#fff', marginBottom: 24 }}
        />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {results.map((cause, idx) => (
            <div key={idx} style={{ background: '#222', borderRadius: 12, width: 300, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', marginBottom: 24, overflow: 'hidden' }}>
              <img src={cause.image} alt={cause.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 18 }}>
                <h2 style={{ color: '#00bcd4', fontSize: 22, marginBottom: 8 }}>{cause.title}</h2>
                <p style={{ color: '#ccc', marginBottom: 12 }}>{cause.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SearchPage;
