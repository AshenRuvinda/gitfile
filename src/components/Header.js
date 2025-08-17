import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">🎵 Music Player</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">⚙️</button>
          <button className="text-gray-300 hover:text-white">👤</button>
        </div>
      </div>
    </header>
  );
};

export default Header;