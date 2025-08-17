import React from 'react';
import { usePlayer } from '../context/PlayerContext.js';

const VolumeControl = () => {
  const { currentTrack } = usePlayer();

  return (
    <div className="p-2">
      <p>Volume: {currentTrack ? 'Adjustable' : 'N/A'}</p>
    </div>
  );
};

export default VolumeControl;