import { useState, useEffect } from 'react';
import * as lyricsAPI from '../services/lyricsAPI';

export const useLyrics = (title, artist) => {
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    if (title && artist) {
      lyricsAPI.fetchLyrics(title, artist).then(setLyrics);
    }
  }, [title, artist]);

  return lyrics;
};