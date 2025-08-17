import React from 'react';

const Home = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Welcome Home</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-2">Recently Played</h3>
          <p className="text-gray-400">Your recently played tracks will appear here.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-2">Your Library</h3>
          <p className="text-gray-400">Browse your music library.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-2">Discover</h3>
          <p className="text-gray-400">Find new music to enjoy.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;