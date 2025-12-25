import React from 'react';
import { Link } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { ArrowRight, Server, Activity, Smartphone, Zap, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  const stats = [
    { 
      label: 'Total APIs', 
      value: API_CATALOG.length, 
      suffix: '', 
      description: `Across ${new Set(API_CATALOG.map(a => a.category)).size} Categories`,
      icon: Server,
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'glow-blue'
    },
    { 
      label: 'M-PESA Ready', 
      value: 'Daraja', 
      suffix: '', 
      description: 'STK Push, B2C, C2B',
      icon: Smartphone,
      gradient: 'from-green-500 to-emerald-500',
      glow: 'glow-green'
    },
    { 
      label: 'Uptime', 
      value: '99.9', 
      suffix: '%', 
      description: 'System Operational',
      icon: Activity,
      gradient: 'from-purple-500 to-pink-500',
      glow: 'glow-purple'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center lg:text-left"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-6 border border-white/10"
        >
          <Zap className="w-4 h-4 text-yellow-400 mr-2" />
          <span className="text-sm text-white/70">Kenya's Premier API Testing Platform</span>
        </motion.div>
        
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="text-white">Government </span>
          <span className="gradient-text">Developer</span>
          <br />
          <span className="text-white">Hub</span>
        </h1>
        
        <p className="text-lg lg:text-xl text-white/50 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
          Unified access to <span className="text-white/80 font-medium">eCitizen</span>, 
          <span className="text-white/80 font-medium"> KRA</span>, and 
          <span className="text-green-400 font-medium"> Safaricom Daraja</span> APIs. 
          Test, integrate, and deploy with confidence.
        </p>

        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link 
            to="/api/pin-checker" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/settings" 
            className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all flex items-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>Configure Keys</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.label}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-8 relative overflow-hidden group cursor-default"
          >
            {/* Background Icon */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <stat.icon className="w-32 h-32" />
            </div>
            
            {/* Glow Effect on Hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.glow}`} style={{ filter: 'blur(60px)' }} />
            
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">
                {stat.label}
              </h3>
              
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-bold text-white animate-count">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-2xl font-bold text-white/70 ml-1">{stat.suffix}</span>
                )}
              </div>
              
              <p className="text-sm text-white/40">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Section Header */}
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-blue-400" />
          Popular Services
        </h2>
        <div className="h-px bg-gradient-to-r from-white/10 to-transparent flex-1 ml-6" />
        <Link 
          to="/api/pin-checker" 
          className="text-sm text-white/40 hover:text-white transition-colors flex items-center"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      {/* API Cards Grid */}
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
              className="group glass-card block p-6 h-full flex flex-col hover:border-blue-500/30"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-gradient-to-r from-white/5 to-white/10 text-white/50 border border-white/5 font-mono">
                  {api.method}
                </span>
                <motion.div 
                  whileHover={{ rotate: -45, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 text-white/40 group-hover:text-white"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {api.name}
              </h3>
              <p className="text-sm text-white/40 line-clamp-2 mb-4 flex-1">
                {api.description}
              </p>
              
              {/* Footer */}
              <div className="flex items-center pt-4 border-t border-white/5">
                <code className="text-xs text-white/30 font-mono truncate">
                  {api.endpoint}
                </code>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
