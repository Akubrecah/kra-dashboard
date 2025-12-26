import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Menu, X, Zap, Shield, ChevronRight } from 'lucide-react';
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
    <div className="flex h-screen overflow-hidden bg-[#1c1d26] text-white font-sans">
      
      {/* Sidebar - "Section 1" on the left */}
      {/* On Desktop: It is a flex item, occupying real space. No Fixed positioning. */}
      {/* On Mobile: It is an absolute overlay. */}
      <AnimatePresence mode="wait">
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Mobile Overlay Backdrop */}
            <div 
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)} 
            />
            
            <motion.aside 
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={clsx(
                "z-50 w-[280px] bg-[#1a1b23] border-r border-[#272933] flex flex-col shadow-2xl flex-shrink-0",
                "fixed inset-y-0 left-0 lg:relative lg:translate-x-0" 
              )}
            >
              {/* Logo */}
              <div className="h-20 flex items-center px-8 border-b border-[#272933] bg-[#181920]">
                 <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                   <div className="w-10 h-10 rounded-full bg-landed-accent flex items-center justify-center shadow-lg">
                     <Shield className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <h1 className="text-lg font-normal text-white tracking-widest leading-none">AKUBRECAH<span className="text-landed-accent font-bold">.ENT</span></h1>
                   </div>
                 </div>
                 <button onClick={toggleSidebar} className="lg:hidden ml-auto text-slate-500 hover:text-white">
                   <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto bg-[#1a1b23]">
                <div>
                  <div className="px-4 text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Main Menu</div>
                  <div className="space-y-1">
                    <NavLink 
                      to="/" 
                      end
                      className={({ isActive }) => clsx(
                        "flex items-center px-4 py-3 rounded text-sm font-medium transition-all group",
                        isActive 
                          ? "bg-landed-accent text-white shadow-md" 
                          : "text-white/60 hover:bg-[#272933] hover:text-white"
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          <LayoutDashboard className={clsx("w-5 h-5 mr-3 transition-colors", isActive ? "text-white" : "text-white/40 group-hover:text-white" )} />
                          Dashboard
                        </>
                      )}
                    </NavLink>
                    <NavLink 
                      to="/settings" 
                      className={({ isActive }) => clsx(
                        "flex items-center px-4 py-3 rounded text-sm font-medium transition-all group",
                        isActive 
                          ? "bg-landed-accent text-white shadow-md" 
                          : "text-white/60 hover:bg-[#272933] hover:text-white"
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          <Settings className={clsx("w-5 h-5 mr-3 transition-colors", isActive ? "text-white" : "text-white/40 group-hover:text-white")} />
                          Settings
                        </>
                      )}
                    </NavLink>
                  </div>
                </div>

                <div>
                   <div className="px-4 text-xs font-bold text-white/40 uppercase tracking-widest mb-4">API Catalog</div>
                   <div className="space-y-1">
                     {API_CATALOG.map((api) => (
                       <NavLink
                         key={api.id}
                         to={`/api/${api.id}`}
                         className={({ isActive }) => clsx(
                           "flex items-center px-4 py-2.5 rounded text-sm transition-all relative overflow-hidden",
                           isActive 
                             ? "bg-[#272933] text-white border-l-4 border-landed-accent" 
                             : "text-white/60 hover:text-white hover:bg-[#272933]"
                         )}
                       >
                         {() => (
                           <>
                              <span className="truncate">{api.name}</span>
                           </>
                         )}
                       </NavLink>
                     ))}
                   </div>
                </div>
              </nav>

              {/* User / Status */}
              <div className="p-4 border-t border-[#272933] bg-[#181920]">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#272933] flex items-center justify-center text-xs font-bold text-white border border-white/10">
                      AK
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium text-white truncate">Authorized User</p>
                      <p className="text-xs text-white/40 truncate">Pro Account</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                 </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - "Section 2" on the right */}
      {/* flex-1 takes remaining space. No left padding needed because Sidebar pushes it. */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#1c1d26] sticky top-0 z-40 border-b border-[#272933]">
             <div className="flex items-center gap-4">
                <button 
                  onClick={toggleSidebar} 
                  className="p-2 -ml-2 rounded text-white/60 hover:bg-[#272933] hover:text-white transition-colors lg:hidden"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="hidden lg:block">
                  {/* Desktop Toggle to collapse/expand sidebar if desired, currently hidden as sidebar is persistent */}
                </div>
                
                {/* Breadcrumbish */}
                <div className="md:flex items-center text-sm text-white/40 font-light">
                  <span className="hover:text-white cursor-pointer tracking-wider">CONSOLE</span>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span className="text-white font-medium capitalize tracking-wider">{location.pathname === '/' ? 'OVERVIEW' : location.pathname.split('/')[1].toUpperCase()}</span>
                </div>
             </div>

             <div className="flex items-center gap-4">
               {/* Environment Toggle */}
               <button 
                 onClick={() => setIsMock(!isMock)}
                 className={clsx(
                   "flex items-center px-4 py-2 rounded-full text-xs font-bold transition-all border uppercase tracking-widest",
                   isMock 
                     ? "bg-transparent text-emerald-500 border-emerald-500" 
                     : "bg-transparent text-amber-500 border-amber-500"
                 )}
               >
                 <Zap className="w-3 h-3 mr-2" />
                 {isMock ? 'MOCK MODE' : 'LIVE'}
               </button>
             </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#1c1d26] p-0 w-full">
           <div className={clsx("min-h-full", location.pathname === '/' ? '' : 'p-8 max-w-7xl mx-auto')}>
             <Outlet context={{ isMock }} />
           </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
