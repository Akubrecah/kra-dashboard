import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, CreditCard, FileText, Settings, Menu, X, Shield, Activity, Globe } from 'lucide-react';
import { API_CATALOG } from '../data/api-definitions';
import clsx from 'clsx';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMock, setIsMock] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans antialiased">
      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="text-xl font-bold tracking-tight text-white">GovAPI<span className="text-green-500">.ke</span></span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="space-y-1">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => clsx(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => clsx(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </NavLink>
          </div>

          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">APIs</h3>
            <div className="space-y-1">
              {API_CATALOG.map(api => (
                <NavLink
                  key={api.id}
                  to={`/api/${api.id}`}
                  className={({ isActive }) => clsx(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors group",
                    isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  {api.category === 'Checkers' && <CheckCircle className="w-4 h-4 mr-3 text-blue-500 group-hover:text-blue-400" />}
                  {api.category === 'Payments' && <CreditCard className="w-4 h-4 mr-3 text-purple-500 group-hover:text-purple-400" />}
                  {api.category === 'Tax Returns' && <FileText className="w-4 h-4 mr-3 text-yellow-500 group-hover:text-yellow-400" />}
                  {(api.category === 'Customs' || !['Checkers', 'Payments', 'Tax Returns'].includes(api.category)) && 
                    <Activity className="w-4 h-4 mr-3 text-teal-500 group-hover:text-teal-400" />
                  }
                  <span className="truncate">{api.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-900">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700 shadow-sm">
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center ml-auto space-x-4">
           {/* Environment Toggle */}
           <div className="flex items-center bg-gray-900 rounded-lg p-1 border border-gray-700">
             <button
               onClick={() => setIsMock(true)}
               className={clsx(
                 "px-3 py-1 text-xs font-medium rounded-md transition-all",
                 isMock ? "bg-gray-700 text-white shadow-sm" : "text-gray-400 hover:text-white"
               )}
             >
               MOCK
             </button>
             <button
               onClick={() => setIsMock(false)}
               className={clsx(
                 "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center",
                 !isMock ? "bg-red-900 text-red-100 shadow-sm" : "text-gray-400 hover:text-white"
               )}
             >
               <Globe className="w-3 h-3 mr-1" />
               LIVE
             </button>
           </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 scroll-smooth">
          <Outlet context={{ isMock }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
