import React from 'react';
import { Link } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { ArrowRight, Server, Activity, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center lg:text-left"
      >
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
          eCitizen Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Hub</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
          Unified access to Government of Kenya services and Safaricom Daraja APIs. 
          Test, integrate, and deploy with confidence using our next-gen sandbox.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <motion.div variants={item} className="bg-gradient-to-br from-blue-900/40 to-slate-900 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server className="w-24 h-24 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">Total APIs</h3>
          <p className="text-5xl font-bold text-white mb-2">{API_CATALOG.length}</p>
          <p className="text-sm text-blue-300/60">Across {new Set(API_CATALOG.map(a => a.category)).size} Categories</p>
        </motion.div>

        <motion.div variants={item} className="bg-gradient-to-br from-green-900/40 to-slate-900 p-8 rounded-2xl border border-green-500/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
             <Smartphone className="w-24 h-24 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-green-200 mb-1">Integrations</h3>
          <p className="text-5xl font-bold text-white mb-2">M-PESA</p>
          <p className="text-sm text-green-300/60">Daraja API Ready</p>
        </motion.div>

        <motion.div variants={item} className="bg-gradient-to-br from-purple-900/40 to-slate-900 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-purple-200 mb-1">System Status</h3>
          <p className="text-5xl font-bold text-white mb-2">99.9%</p>
          <p className="text-sm text-purple-300/60">Operational</p>
        </motion.div>
      </motion.div>

      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3">Popular Services</span>
        <div className="h-px bg-gray-800 flex-1" />
      </h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {API_CATALOG.slice(0, 6).map((api) => (
          <motion.div key={api.id} variants={item}>
            <Link 
              to={`/api/${api.id}`}
              className="group block bg-[#1e1e1e] hover:bg-[#252526] border border-white/5 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-blue-900/20 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-black/40 text-gray-400 border border-white/5 font-mono">
                  {api.method}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors text-gray-500">
                  <ArrowRight className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-300" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                {api.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
                {api.description}
              </p>
              
              <div className="flex items-center text-xs font-medium text-gray-600 group-hover:text-gray-500 transition-colors">
                 <span className="truncate">{api.endpoint}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
