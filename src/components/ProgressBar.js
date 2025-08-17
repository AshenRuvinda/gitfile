import React from 'react';
import { usePlayer } from '../context/PlayerContext.js';

const ProgressBar = () => {
  const { currentTrack } = usePlayer();

  return (
    <div className="p-2">
      <p>Progress: {currentTrack ? 'Playing' : 'Stopped'}</p>
    </div>
  );
};

export default ProgressBar;