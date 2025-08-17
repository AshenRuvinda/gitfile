// src/pages/NowPlaying.js
import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const NowPlaying = () => {
  const { currentTrack, isPlaying } = usePlayer();

  return (
    <div className="p-6 text-white h-full flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-6xl">🎵</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {currentTrack ? currentTrack.title : 'No track playing'}
        </h2>
        <p className="text-gray-400 mb-4">
          {currentTrack ? currentTrack.artist : 'Select a track to start playing'}
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="text-2xl">⏮️</button>
          <button className="text-4xl bg-blue-600 rounded-full p-3">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="text-2xl">⏭️</button>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;