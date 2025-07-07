import React, { useState } from 'react';

const UpgradeModal = ({ onUpgrade, onClose }) => {
  const [organization, setOrganization] = useState('');
  const [mission, setMission] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpgrade({ organization, mission });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Become an Organizer</h2>
        <p className="text-gray-600 mb-4">
          As an organizer, you'll be able to create and manage causes and events. 
          Please provide the following information:
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Organization Name</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mission Statement</label>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upgrade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpgradeModal;
