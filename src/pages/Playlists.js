import React from 'react';

const Playlists = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Sample playlists */}
        {['Favorites', 'Recently Added', 'Chill Vibes', 'Workout Mix'].map((playlist, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-full h-32 bg-gray-600 rounded mb-3 flex items-center justify-center">
              <span className="text-3xl">📀</span>
            </div>
            <h3 className="font-semibold">{playlist}</h3>
            <p className="text-gray-400 text-sm">0 songs</p>
          </div>
        ))}
        
        {/* Create new playlist button */}
        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer border-2 border-dashed border-gray-600">
          <div className="w-full h-32 rounded mb-3 flex items-center justify-center">
            <span className="text-3xl">➕</span>
          </div>
          <h3 className="font-semibold">Create Playlist</h3>
          <p className="text-gray-400 text-sm">Add a new playlist</p>
        </div>
      </div>
    </div>
  );
};

export default Playlists;