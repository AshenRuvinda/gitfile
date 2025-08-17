import React from 'react';
import { usePlayer } from '../context/PlayerContext.js';

const MiniPlayer = () => {
  const { isPlaying, setIsPlaying, currentTrack } = usePlayer();

  return (
    <div className="bg-gray-800 h-full flex items-center justify-center p-4">
      <div className="text-center text-white">
        <p className="text-sm mb-2">Mini Player</p>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-blue-600 hover:bg-blue-700 rounded-full p-2"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;