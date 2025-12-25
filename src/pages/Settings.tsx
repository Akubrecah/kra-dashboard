import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('kra_api_key');
    if (stored) setApiKey(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem('kra_api_key', apiKey);
    alert('API Key Saved (Local Storage)');
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl">
        <label className="block text-sm font-medium mb-2 text-gray-300">
          eCitizen / KRA Sandbox API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Bearer Token or API Key"
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded focus:border-blue-500 focus:outline-none mb-4 text-white"
        />
        <p className="text-xs text-gray-400 mb-6">
          This key is stored locally in your browser and used for "Real Mode" API calls.
        </p>
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold text-white transition"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default Settings;
