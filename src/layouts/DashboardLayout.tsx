import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, CreditCard, FileText, Settings, Menu, X, Shield, Activity, Smartphone, Zap } from 'lucide-react';
import { API_CATALOG } from '../data/api-definitions';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMock, setIsMock] = useState(true);
  const location = useLocation();

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
      {/* Sidebar - Only render if NOT on landing page */}
      {location.pathname !== '/' && (
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-72 sidebar-modern lg:static flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-24 px-8">
          <div className="flex items-center space-x-3">
             {/* Simplified Logo for Dashboard */}
            <div className="text-2xl font-black text-slate-900 tracking-tighter">
              Ballo<span className="text-[#ff4d6d]">.</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Main Links */}
          <div className="space-y-1 px-4">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => clsx("nav-item-modern", isActive && "active")}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => clsx("nav-item-modern", isActive && "active")}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </NavLink>
          </div>

          {/* API List */}
          <div className="mt-8 px-4">
            <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              API Catalog
            </h3>
            <div className="space-y-1">
              {API_CATALOG.map((api, index) => (
                <NavLink
                  key={api.id}
                  to={`/api/${api.id}`}
                  className={({ isActive }) => clsx("nav-item-modern", isActive && "active")}
                >
                  <span className={clsx(
                    "w-6 h-6 rounded-md flex items-center justify-center mr-3 text-xs font-bold",
                     // Use subtle colored backgrounds for icons based on category
                    getCategoryColor(api.category).replace('text-', 'bg-').replace('bg-', 'text-white bg-opacity-90 ')
                  )}>
                    {/* Just use first letter or icon for cleaner look */}
                    <Activity className="w-3.5 h-3.5" />
                  </span>
                  <span className="truncate flex-1">{api.name}</span>
                </NavLink>
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
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 bg-white ${location.pathname === '/' ? 'w-full' : ''}`}>
        {/* Top Header - Conditional Render for Home vs Dashboard */}
        {location.pathname === '/' ? (
           // Landing Page Header - Semantic CSS
           <header className="landing-header">
             {/* Landing Logo */}
             <div className="landing-logo">
               Ballo<span>.</span>
             </div>

             {/* Center Nav */}
             <nav className="landing-nav">
               <NavLink to="/" className="landing-nav-link">Home</NavLink>
               <NavLink to="/api/mpesa-express" className="landing-nav-link">M-PESA</NavLink>
               <NavLink to="/api/pin-checker" className="landing-nav-link">Checkers</NavLink>
               <NavLink to="/api/customs-status" className="landing-nav-link">Customs</NavLink>
             </nav>

             {/* Right Action */}
             <div className="landing-actions">
               <button className="btn-coral landing-header-btn">
                 Get started
               </button>
             </div>
           </header>
        ) : (
          // Dashboard Header
          <header className="sticky top-0 z-40 flex items-center justify-between h-20 px-6 bg-white/80 backdrop-blur-xl border-b border-slate-100">
             {/* ... existing dashboard header content ... */}
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
              </div>
          </header>
        )}
        
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
