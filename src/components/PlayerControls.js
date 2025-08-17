import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const PlayerControls = () => {
  const { isPlaying, setIsPlaying, currentTrack } = usePlayer();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-800 p-4 border-t border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white text-sm">
            {currentTrack ? currentTrack.title : 'No track selected'}
          </p>
          <p className="text-gray-400 text-xs">
            {currentTrack ? currentTrack.artist : ''}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">⏮️</button>
          <button 
            onClick={togglePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="text-gray-300 hover:text-white">⏭️</button>
        </div>
        
        <div className="flex-1 flex justify-end">
          <button className="text-gray-300 hover:text-white">🔊</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;