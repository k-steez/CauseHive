export default function PhotoCard({ photo, onLike }) {
  // Defensive: provide defaults for missing fields
  const tags = Array.isArray(photo.tags) ? photo.tags : [];
  const likes = typeof photo.likes === 'number' ? photo.likes : 0;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={photo.url} 
        alt={photo.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
        <p className="text-gray-600 mb-2">{photo.description || ''}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button 
            onClick={() => onLike && onLike(photo.id)}
            className="text-red-500 hover:text-red-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {likes}
          </button>
        </div>
      </div>
    </div>
  );
}
