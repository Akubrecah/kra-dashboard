import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, CreditCard, FileText, Settings, Menu, X, Shield, Activity, Smartphone, Zap } from 'lucide-react';
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
      case 'Checkers': return 'text-blue-600 bg-blue-50';
      case 'Payments': return 'text-purple-600 bg-purple-50';
      case 'Tax Returns': return 'text-amber-600 bg-amber-50';
      case 'M-PESA': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans antialiased bg-white">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-50 border-r border-slate-100 lg:static flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 bg-white border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4d6d] to-[#ff758f] flex items-center justify-center shadow-lg shadow-red-200">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900">GovAPI</span>
              <span className="text-xl font-bold text-[#ff4d6d]">.ke</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors">
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
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                isActive 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
              )}
            >
              <LayoutDashboard className="w-5 h-5 mr-3 text-slate-400 group-hover:text-[#ff4d6d]" />
              Dashboard
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => clsx(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                isActive 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
              )}
            >
              <Settings className="w-5 h-5 mr-3 text-slate-400 group-hover:text-[#ff4d6d]" />
              Settings
            </NavLink>
          </div>

          {/* API List */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
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
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all group",
                      isActive 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
                    )}
                  >
                    <span className={clsx(
                      "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
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
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-[#ff4d6d]/10 to-[#ff758f]/10 p-4 rounded-xl border border-[#ff4d6d]/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-[#ff4d6d]" />
              <span className="text-xs font-semibold text-slate-600">Environment</span>
            </div>
            <span className={clsx(
              "text-sm font-bold",
              isMock ? "text-green-600" : "text-red-500"
            )}>
              {isMock ? '🧪 Sandbox Mode' : '🔴 Production'}
            </span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-20 px-6 bg-white/80 backdrop-blur-xl border-b border-slate-100">
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/api/pin-checker" className="nav-link">Services</NavLink>
            <NavLink to="/settings" className="nav-link">Settings</NavLink>
          </nav>
          
          <div className="flex items-center space-x-3">
            {/* Environment Toggle */}
            <div className="flex items-center p-1 rounded-full bg-slate-100">
              <button
                onClick={() => setIsMock(true)}
                className={clsx(
                  "px-4 py-2 text-xs font-semibold rounded-full transition-all",
                  isMock 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Mock
              </button>
              <button
                onClick={() => setIsMock(false)}
                className={clsx(
                  "px-4 py-2 text-xs font-semibold rounded-full transition-all",
                  !isMock 
                    ? "bg-white text-red-500 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Live
              </button>
            </div>
            
            {/* CTA Button */}
            <button className="btn-coral hidden sm:block">
              Get started
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 custom-scrollbar bg-white">
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
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
