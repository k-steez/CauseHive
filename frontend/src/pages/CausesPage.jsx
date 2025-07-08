import { useState } from 'react';
import { Link } from 'react-router-dom';

const mockCauses = [
  {
    id: 1,
    title: 'Clean Water for All',
    description: 'Help us build wells and provide clean water to rural communities.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'community',
  },
  {
    id: 2,
    title: 'Education for Every Child',
    description: 'Support children with books, uniforms, and school supplies.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'education',
  },
  {
    id: 3,
    title: 'Food Relief Program',
    description: 'Delivering nutritious meals to families in need.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'humanitarian',
  },
  {
    id: 4,
    title: 'Disaster Response',
    description: 'Rapid aid for communities after natural disasters.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    category: 'community',
  },
  {
    id: 5,
    title: 'Women Empowerment',
    description: 'Supporting women-led businesses and education.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'community',
  },
  {
    id: 6,
    title: 'Medical Aid',
    description: 'Providing essential healthcare and supplies.',
    image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=crop&w=400&q=80',
    category: 'health',
  },
  {
    id: 7,
    title: 'Youth Sports',
    description: 'Building confidence and teamwork through sports.',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    category: 'community',
  },
  {
    id: 8,
    title: 'Green Earth',
    description: 'Tree planting and environmental action.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'environment',
  },
  {
    id: 9,
    title: 'Animal Rescue',
    description: 'Saving and caring for animals in need.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'animals',
  },
  {
    id: 10,
    title: 'Refugee Support',
    description: 'Providing shelter and resources for displaced families.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'humanitarian',
  },
  {
    id: 11,
    title: 'Tech for Good',
    description: 'Bringing technology and internet access to remote schools.',
    image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=crop&w=400&q=80',
    category: 'education',
  },
  {
    id: 12,
    title: 'Elderly Care',
    description: 'Supporting the elderly with companionship and care.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'community',
  },
];

export default function CausesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredCauses = mockCauses.filter(cause =>
    (category === '' || cause.category === category) &&
    (search === '' || cause.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="causes-bg">
      <div className="causes-header">
        <h1>Explore Causes</h1>
        <p>Discover and support a wide range of impactful projects and events.</p>
      </div>
      <div className="causes-filters">
        <input
          type="text"
          className="causes-search"
          placeholder="Search causes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="causes-select" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="health">Health</option>
          <option value="animals">Animal Welfare</option>
          <option value="humanitarian">Humanitarian</option>
          <option value="community">Community</option>
        </select>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', margin: '4rem 0' }}>
          <span className="causes-loader" />
        </div>
      ) : (
        <div className="causes-grid">
          {filteredCauses.map(cause => (
            <div className="causes-card" key={cause.id}>
              <img src={cause.image} alt={cause.title} />
              <div className="causes-card-body">
                <h3>{cause.title}</h3>
                <p>{cause.description}</p>
                <div className="causes-card-footer">
                  <span className="badge">{cause.category}</span>
                  <Link to={`/causes/${cause.id}`} className="btn">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
