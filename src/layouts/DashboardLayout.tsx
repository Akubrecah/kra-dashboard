import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, CreditCard, FileText, Settings, Menu, X, Shield, Activity, Globe, Smartphone, ChevronRight } from 'lucide-react';
import { API_CATALOG } from '../data/api-definitions';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMock, setIsMock] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const getApiIcon = (category: string) => {
    switch(category) {
      case 'Checkers': return <CheckCircle className="w-4 h-4" />;
      case 'Payments': return <CreditCard className="w-4 h-4" />;
      case 'Tax Returns': return <FileText className="w-4 h-4" />;
      case 'M-PESA': return <Smartphone className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Checkers': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Payments': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'Tax Returns': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'M-PESA': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans antialiased relative">
      {/* Animated Background */}
      <div className="gradient-orbs" />
      <div className="absolute inset-0 animated-grid-bg" />
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-72 glass-card border-r border-white/5 lg:static flex flex-col"
        style={{ background: 'rgba(10, 10, 15, 0.95)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg glow-blue">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">GovAPI</span>
              <span className="text-lg font-bold gradient-text">.ke</span>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Developer Hub</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Main Links */}
          <div className="space-y-1">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => clsx(
                "sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                isActive 
                  ? "active bg-white/5 text-white" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <LayoutDashboard className="w-5 h-5 mr-3 group-hover:text-blue-400 transition-colors" />
              Dashboard
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => clsx(
                "sidebar-link flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                isActive 
                  ? "active bg-white/5 text-white" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <Settings className="w-5 h-5 mr-3 group-hover:text-purple-400 transition-colors" />
              Settings
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          </div>

          {/* API List */}
          <div>
            <h3 className="px-4 text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
              API Catalog
            </h3>
            <div className="space-y-1">
              {API_CATALOG.map((api, index) => (
                <motion.div
                  key={api.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <NavLink
                    to={`/api/${api.id}`}
                    className={({ isActive }) => clsx(
                      "sidebar-link flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all group",
                      isActive 
                        ? "active bg-white/5 text-white" 
                        : "text-white/40 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span className={clsx(
                      "w-7 h-7 rounded-lg flex items-center justify-center mr-3 border transition-colors",
                      getCategoryColor(api.category)
                    )}>
                      {getApiIcon(api.category)}
                    </span>
                    <span className="truncate flex-1">{api.name}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="glass-card p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <p className="text-xs text-white/60 mb-2">Environment</p>
            <div className="flex items-center justify-between">
              <span className={clsx(
                "text-sm font-semibold",
                isMock ? "text-green-400" : "text-red-400"
              )}>
                {isMock ? '🧪 Sandbox' : '🔴 Production'}
              </span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-20 px-6 glass-card border-b border-white/5 backdrop-blur-xl"
          style={{ background: 'rgba(10, 10, 15, 0.8)' }}
        >
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center ml-auto space-x-4">
            {/* Environment Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/5">
              <button
                onClick={() => setIsMock(true)}
                className={clsx(
                  "px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2",
                  isMock 
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 shadow-lg" 
                    : "text-white/40 hover:text-white/60"
                )}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>MOCK</span>
              </button>
              <button
                onClick={() => setIsMock(false)}
                className={clsx(
                  "px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2",
                  !isMock 
                    ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 shadow-lg" 
                    : "text-white/40 hover:text-white/60"
                )}
              >
                <Globe className="w-3 h-3" />
                <span>LIVE</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet context={{ isMock }} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
