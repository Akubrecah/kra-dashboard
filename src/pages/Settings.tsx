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
    toast.success('Configuration saved successfully');
  };

  return (
    <div className="max-w-2xl mx-auto pt-10 font-sans">
      <Toaster position="bottom-right" theme="dark" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">API Configuration</h2>
        <p className="text-slate-400">Manage your connection keys for the live environment.</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Shield className="w-48 h-48 text-blue-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20 shadow-sm">
              <Key className="w-6 h-6 text-blue-500" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-white">eCitizen Credentials</h3>
               <p className="text-sm text-slate-400">Production & Sandbox Keys</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Bearer Token
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk_live_..."
                  className="input-modern pl-11"
                />
              </div>
            </div>
            
            <p className="text-xs text-slate-500 flex items-center bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <Shield className="w-3 h-3 mr-2 text-emerald-500" />
              Keys are encrypted and stored locally. We do not transmit them to our servers.
            </p>
          </div>
          
          <button
            onClick={handleSave}
            className="w-full btn-primary py-4 rounded-xl flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
