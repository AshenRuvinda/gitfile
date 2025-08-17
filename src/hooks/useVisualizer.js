import { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext.js';

const useVisualizer = () => {
  const { currentTrack } = usePlayer();

  useEffect(() => {
    if (currentTrack) {
      console.log('Visualizing:', currentTrack.title);
    }
  }, [currentTrack]);

  return null;
};

export default useVisualizer;