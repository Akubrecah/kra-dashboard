import React from 'react';
import { Link } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { ArrowRight, Server, Activity } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          eCitizen Developer <span className="text-green-500">Hub</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Unified access to Government of Kenya services. Test, integrate, and deploy with confidence using our comprehensive sandbox environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-900/50 to-gray-800 p-6 rounded-xl border border-blue-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-100">Total APIs</h3>
            <Server className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-white mb-1">{API_CATALOG.length}</p>
          <p className="text-sm text-blue-200/60">Services Integrated</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-gray-800 p-6 rounded-xl border border-green-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-100">Uptime</h3>
            <Activity className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white mb-1">99.9%</p>
          <p className="text-sm text-green-200/60">System Availability</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Explore Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {API_CATALOG.slice(0, 6).map((api) => (
          <Link 
            key={api.id}
            to={`/api/${api.id}`}
            className="group block bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-200 shadow-lg hover:shadow-blue-900/20"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-900 text-gray-300 border border-gray-700">
                {api.method}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transform transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {api.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {api.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
