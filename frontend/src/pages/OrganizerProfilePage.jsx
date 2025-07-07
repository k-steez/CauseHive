import React from 'react';

const OrganizerProfilePage = ({ organizer }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{organizer.organization}'s Organizer Profile</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">About Our Organization</h2>
        <p className="text-gray-700">{organizer.mission}</p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Our Causes</h2>
        {/* Causes list will go here */}
        <div className="text-gray-500">No causes created yet</div>
      </div>
    </div>
  );
};

export default OrganizerProfilePage;
