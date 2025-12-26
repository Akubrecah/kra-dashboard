import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Menu, X, Zap, Shield, Globe, Terminal } from 'lucide-react';
import { API_CATALOG } from '../data/api-definitions';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMock, setIsMock] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden font-mono antialiased bg-[#020617] text-[#e2e8f0]">
      <div className="scanline-overlay"></div>
      
      {/* Sidebar - Tactical Panel */}
      {location.pathname !== '/' && (
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] border-r border-[#008f11] flex flex-col relative"
      >
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41]"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41]"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41]"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41]"></div>

        {/* Logo Area */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#008f11]/30 bg-[#0f172a]/50">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-[#00ff41]" />
            <div className="text-xl font-bold tracking-widest text-[#00ff41] uppercase">
             KRA<span className="text-white">.OS</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-[#008f11] hover:text-[#00ff41]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => clsx(
                "flex items-center px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border-l-2",
                isActive 
                  ? "border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] glow-text" 
                  : "border-transparent text-[#94a3b8] hover:text-[#00ff41] hover:bg-[#00ff41]/5"
              )}
            >
              <LayoutDashboard className="w-4 h-4 mr-3" />
              Command Center
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => clsx(
                "flex items-center px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border-l-2",
                isActive 
                  ? "border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] glow-text" 
                  : "border-transparent text-[#94a3b8] hover:text-[#00ff41] hover:bg-[#00ff41]/5"
              )}
            >
              <Settings className="w-4 h-4 mr-3" />
              System Config
            </NavLink>
          </div>

          {/* API List */}
          <div className="mt-8">
            <h3 className="px-4 text-xs font-bold text-[#008f11] uppercase tracking-[0.2em] mb-4 border-b border-[#008f11]/20 pb-2">
              &gt; Protocols
            </h3>
            <div className="space-y-1">
              {API_CATALOG.map((api) => (
                <NavLink
                  key={api.id}
                  to={`/api/${api.id}`}
                  className={({ isActive }) => clsx(
                    "flex items-center px-4 py-2 text-xs font-mono transition-all",
                    isActive 
                      ? "text-[#00f3ff] bg-[#00f3ff]/10" 
                      : "text-[#94a3b8] hover:text-[#00ff41]"
                  )}
                >
                  <span className="w-4 text-center mr-2 opacity-50">&gt;</span>
                  <span className="truncate">{api.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#008f11]/30 bg-[#0f172a]/30">
          <div className="flex items-center justify-between text-[10px] text-[#008f11] font-mono mb-2">
             <span>CPU: 12%</span>
             <span>MEM: 48%</span>
             <span>NET: ON</span>
          </div>
          <div className="w-full bg-[#1e293b] h-1 rounded-full overflow-hidden">
             <div className="bg-[#00ff41] w-[48%] h-full animate-pulse"></div>
          </div>
        </div>
      </motion.aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#020617] relative overflow-x-hidden ${location.pathname === '/' ? 'w-full' : ''}`}>
        
        {/* Unified Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-6 lg:px-8 bg-[#020617]/90 backdrop-blur-md border-b border-[#008f11] shadow-[0_4px_20px_rgba(0,255,65,0.05)]">
             <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleSidebar} 
                  className={clsx("lg:hidden text-[#00ff41] hover:text-white", location.pathname === '/' && "hidden")}
                >
                  <Menu className="w-6 h-6" />
                </button>

                <div className="text-xl font-bold tracking-widest text-white uppercase cursor-pointer flex items-center gap-2" onClick={() => (window.location.href = '/')}>
                  <Globe className="w-5 h-5 text-[#00f3ff] animate-pulse" />
                  <span>SECURE<span className="text-[#00ff41]">.NET</span></span>
                </div>
             </div>

             {/* Center Navigation - Desktop */}
             <nav className="hidden lg:flex items-center space-x-1">
               {[
                 {to: '/', label: 'OVERVIEW'},
                 {to: '/api/mpesa-express', label: 'M-PESA LINK'},
                 {to: '/api/pin-checker', label: 'IDENTITY'},
                 {to: '/api/customs-status', label: 'CUSTOMS'}
               ].map(item => (
                 <NavLink 
                    key={item.to}
                    to={item.to} 
                    className={({isActive}) => clsx(
                      "px-4 py-1 text-xs font-bold font-mono transition-all border border-transparent hover:border-[#00ff41]/50 hover:bg-[#00ff41]/10",
                      isActive ? "text-[#00ff41] border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_10px_rgba(0,255,65,0.2)]" : "text-[#94a3b8]"
                    )}
                  >
                   {item.label}
                 </NavLink>
               ))}
             </nav>

             {/* Right Actions */}
             <div className="flex items-center space-x-4">
               <button 
                 onClick={() => setIsMock(!isMock)}
                 className={clsx(
                   "hidden md:flex items-center px-3 py-1 border transition-all font-mono text-xs font-bold",
                   isMock ? "border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10" : "border-[#ff003c] text-[#ff003c] bg-[#ff003c]/10"
                 )}
               >
                 <Zap className="w-3 h-3 mr-2" />
                 {isMock ? 'SANDBOX: ACTIVE' : 'LIVE GRID: DANGER'}
               </button>

               <button 
                 onClick={() => navigate('/api/mpesa-express')}
                 className="flex items-center px-4 py-2 bg-[#00ff41] text-black text-xs font-bold font-mono hover:bg-[#00cc33] transition-all clip-path-polygon"
                 style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
               >
                 <Terminal className="w-3 h-3 mr-2" />
                 TERMINAL
               </button>
             </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 pt-16 overflow-y-auto custom-scrollbar relative z-0 bg-cyber-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
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
            className="lg:hidden fixed inset-0 bg-[#000000]/80 backdrop-blur-sm z-40 border-l border-[#00ff41]"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
