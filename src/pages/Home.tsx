import React from 'react';
import { Link } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { ArrowRight, Shield, Zap, ArrowUpRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  // 3D-like "Coin" stats to match the reference style
  const stats = [
    { 
      label: 'Total APIs', 
      value: API_CATALOG.length, 
      icon: DatabaseIcon, // Custom component below
      color: 'bg-blue-500',
      shadow: 'shadow-blue-500/40',
      angle: 'rotate-[-10deg]'
    },
    { 
      label: 'M-PESA Ready', 
      value: 'Daraja', 
      icon: SmartphoneIcon, // Custom component below
      color: 'bg-orange-500', // Bitcoin-ish orange from reference
      shadow: 'shadow-orange-500/40',
      angle: 'rotate-[10deg]'
    },
    { 
      label: 'Uptime', 
      value: '99.9%', 
      icon: ActivityIcon, // Custom component below
      color: 'bg-indigo-500', // Purple/Blue from reference
      shadow: 'shadow-indigo-500/40',
      angle: 'rotate-[-5deg]'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-12 pb-24 relative"
      >
        {/* Decorative Wave/Track Background (Abstract) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent -z-10 blur-3xl" />

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
        >
          <Zap className="w-4 h-4 text-[#ff4d6d] mr-2" />
          <span className="text-sm font-semibold text-slate-600">Kenya's Premier API Platform</span>
        </motion.div>
        
        {/* Main Title - Pure Black, heavy weight */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hero-title text-5xl md:text-7xl lg:text-8xl mb-6 text-slate-900 tracking-tight"
        >
          WHERE
          <br />
          <span className="text-slate-900">DEVELOPERS</span>
          <br />
          BUILD
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          KRA? M-PESA? eCitizen? It doesn't matter. You can integrate
          whatever, whenever, wherever. You do you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center relative z-10"
        >
          <Link to="/api/mpesa-express" className="btn-coral inline-flex items-center text-lg px-8 py-4">
            Get started
          </Link>
          <Link to="/settings" className="btn-outline inline-flex items-center bg-white hover:bg-slate-50 text-lg px-8 py-4">
            <Shield className="w-4 h-4 mr-2" />
            Configure Keys
          </Link>
        </motion.div>

        {/* Floating "Coins" Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
           {stats.map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 + (i * 0.1), type: "spring", stiffness: 100 }}
               className={`relative ${stat.angle} floating`}
               style={{ animationDelay: `${i * 1.2}s` }}
             >
                <div className={`aspect-square rounded-full ${stat.color} ${stat.shadow} p-1 shadow-2xl flex flex-col items-center justify-center text-white border-4 border-white/20 backdrop-blur-sm relative overflow-hidden group hover:scale-105 transition-transform duration-300 w-48 h-48 mx-auto ring-1 ring-black/5`}>
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                  
                  <stat.icon className="w-12 h-12 mb-2 relative z-10 drop-shadow-md" />
                  <span className="text-3xl font-bold relative z-10 drop-shadow-md">{stat.value}</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/90 relative z-10">{stat.label}</span>
                </div>
             </motion.div>
           ))}
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="mb-24 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Popular Services</h2>
          <Link 
            to="/api/pin-checker" 
            className="text-sm font-bold text-[#ff4d6d] hover:text-[#ff758f] flex items-center bg-red-50 px-4 py-2 rounded-full transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        
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
                className="card-modern group block p-8 h-full bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem]"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="badge-method uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                    {api.method}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#ff4d6d] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#ff4d6d] transition-colors leading-tight">
                  {api.name}
                </h3>
                <p className="text-base text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                  {api.description}
                </p>
                
                {/* Footer */}
                <div className="pt-6 border-t border-slate-50 flex items-center text-slate-400 font-mono text-xs">
                  <Globe className="w-3 h-3 mr-2" />
                  <span className="truncate">{api.endpoint}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Custom Icons for the "Coins"
const DatabaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const SmartphoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default Home;
