import React, { useState, useEffect } from 'react';
import { Save, Shield, Key, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('kra_api_key');
    if (stored) setApiKey(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem('kra_api_key', apiKey);
    toast.success('Configuration saved securely');
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <Toaster position="bottom-right" theme="dark" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Security & Connections</h2>
        <p className="text-gray-400">Manage your API credentials for live environments.</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Shield className="w-48 h-48" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 border border-blue-500/30">
              <Key className="w-5 h-5 text-blue-400" />
            </div>
            <div>
               <h3 className="text-lg font-semibold text-white">eCitizen / KRA Sandbox</h3>
               <p className="text-sm text-gray-500">Live environment authentication</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">
              Bearer Token / API Key
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk_live_..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all outline-none font-mono"
              />
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              <Shield className="w-3 h-3 mr-1.5" />
              Credentials are stored locally in your browser and never sent to our servers.
            </p>
          </div>
          
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transform transition-all active:scale-[0.98]"
          >
            <Save className="w-5 h-5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
