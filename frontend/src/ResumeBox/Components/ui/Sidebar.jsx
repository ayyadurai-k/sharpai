import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userid');

  const links = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, page: 'Dashboard' },
    { label: 'Candidates Resume', icon: <Users size={20} />, page: 'Candiateresume' },
    { label: 'Settings', icon: <Settings size={20} />, page: 'Setting' },
  ];

  const handleLinkClick = (page) => {
    setActivePage(page);
    const newHash = `#${page}-${userId}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }

    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/Recuriterlogin');
  };

  return (
    <div>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-50 shadow p-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">Sharp AI Recruiter</p>
        <button onClick={toggleSidebar} className="bg-gray-100 p-2 rounded">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 bg-white text-[#383838] border-r transition-all duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
          ${collapsed ? 'w-20' : 'w-64'} h-screen`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-6">
            {!collapsed && <span className="text-xl font-bold">Sharp AI Recruiter</span>}
            <button onClick={toggleCollapse}>
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex flex-col flex-1">
            <div className="flex flex-col space-y-2">
              {links.map(({ label, icon, page }) => (
                <button
                  key={page}
                  onClick={() => handleLinkClick(page)}
                  className={`flex items-center gap-3 w-full py-2 px-4 rounded ${
                    activePage === page
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  {icon}
                  {!collapsed && <span>{label}</span>}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-[#e63946] bg-red-50 py-2 px-4 w-full mt-auto"
              >
                <LogOut size={20} />
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
