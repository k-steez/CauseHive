import React from 'react';
import '../global.css';

const albumData = [
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Clean Water Project',
    desc: 'Bringing safe water to rural villages.'
  },
  {
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Education for All',
    desc: 'Supplying books and resources to children.'
  },
  {
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'Food Relief',
    desc: 'Delivering meals to families in need.'
  },
  {
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    title: 'Disaster Response',
    desc: 'Rapid aid for communities after natural disasters.'
  },
  {
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    title: 'Women Empowerment',
    desc: 'Supporting women-led businesses and education.'
  },
  {
    img: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=crop&w=400&q=80',
    title: 'Medical Aid',
    desc: 'Providing essential healthcare and supplies.'
  },
  {
    img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    title: 'Youth Sports',
    desc: 'Building confidence and teamwork through sports.'
  },
  {
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Green Earth',
    desc: 'Tree planting and environmental action.'
  },
  {
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'Animal Rescue',
    desc: 'Saving and caring for animals in need.'
  },
];

const AlbumGrid = () => {
  return (
    <div className="album-grid">
      {albumData.map((item, idx) => (
        <div className="album-card" key={idx}>
          <img src={item.img} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumGrid;
