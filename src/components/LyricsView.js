import React, { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext.js';
import { fetchLyrics } from '../services/lyricsAPI.js';

const LyricsView = () => {
  const { currentTrack } = usePlayer();
  const [lyrics, setLyrics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentTrack) {
      console.log('LyricsView: Fetching lyrics for', currentTrack.title);
      fetchLyrics(currentTrack.title, currentTrack.artist)
        .then((data) => {
          setLyrics(data);
          setError(null);
        })
        .catch((err) => {
          console.error('LyricsView: Failed to fetch lyrics:', err);
          setError('Failed to load lyrics');
          setLyrics(null);
        });
    }
  }, [currentTrack]);

  return (
    <div className="p-4">
      <h2>Lyrics</h2>
      {error && <p className="text-red-500">{error}</p>}
      {lyrics ? <p>{lyrics}</p> : <p>No lyrics available</p>}
    </div>
  );
};

export default LyricsView;