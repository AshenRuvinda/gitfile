import React from 'react';
import { Search, Settings, User, Minimize2, Square, X } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-b border-gray-700 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MusicPro
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for music, artists, albums..."
              className="w-full bg-gray-800 border border-gray-600 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </button>
          
          {/* Window controls */}
          <div className="flex items-center space-x-1 ml-4">
            <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
              <Minimize2 className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
              <Square className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;