import React from 'react';
import { usePlayer } from '../context/PlayerContext.js';

const Equalizer = () => {
  const { currentTrack } = usePlayer();

  return (
    <div className="p-4">
      <h2>Equalizer</h2>
      <p>{currentTrack ? `Adjusting for ${currentTrack.title}` : 'No track selected'}</p>
    </div>
  );
};

export default Equalizer;