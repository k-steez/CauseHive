import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import { searchPhotos } from '../services/photoService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');
  const [results, setResults] = useState([]);
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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Photos</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, description, or tags"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Tags</option>
              <option value="environment">Environment</option>
              <option value="community">Community</option>
              <option value="ocean">Ocean</option>
              <option value="hunger">Hunger</option>
              <option value="animals">Animals</option>
              <option value="welfare">Welfare</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </form>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : currentResults.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentResults.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No photos found. Try a different search.
        </div>
      )}
    </div>
  );
};

export default SearchPage;
