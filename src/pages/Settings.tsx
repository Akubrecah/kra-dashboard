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
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Security & Connections</h2>
        <p className="text-slate-500 font-medium">Manage your API credentials for live environments.</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Shield className="w-48 h-48 text-[#ff4d6d]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mr-4 border border-slate-100 shadow-sm">
              <Key className="w-6 h-6 text-[#ff4d6d]" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-900">eCitizen / KRA Sandbox</h3>
               <p className="text-sm text-slate-500 font-medium">Live environment authentication</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
              Bearer Token / API Key
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-[#ff4d6d] transition-colors" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk_live_..."
                className="input-modern w-full pl-11"
              />
            </div>
            <p className="text-xs text-slate-500 flex items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
              <Shield className="w-3 h-3 mr-2 text-green-500" />
              Credentials are stored locally in your browser and never sent to our servers.
            </p>
          </div>
          
          <button
            onClick={handleSave}
            className="w-full btn-coral flex items-center justify-center space-x-2 py-4 rounded-full shadow-lg"
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
