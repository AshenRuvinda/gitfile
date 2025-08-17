import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/now-playing', label: '▶️ Now Playing', icon: '▶️' },
    { path: '/playlists', label: '📋 Playlists', icon: '📋' },
    { path: '/settings', label: '⚙️ Settings', icon: '⚙️' },
    { path: '/about', label: 'ℹ️ About', icon: 'ℹ️' },
  ];

  return (
    <aside className="bg-gray-900 w-64 p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;