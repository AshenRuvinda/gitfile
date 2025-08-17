import { useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';

export const useAudioPlayer = () => {
  const context = useContext(PlayerContext);
  // Add custom logic if needed
  return context;
};