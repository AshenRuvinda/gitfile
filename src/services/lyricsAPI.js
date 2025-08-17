import { getLyrics } from 'genius-lyrics-api';

const options = {
  apiKey: process.env.GENIUS_API_KEY || null,
  title: '',
  artist: '',
  optimizeQuery: true,
};

export const fetchLyrics = async (title, artist) => {
  try {
    if (!options.apiKey || options.apiKey === 'placeholder') {
      console.warn('Genius API key missing or invalid, skipping lyrics fetch');
      return null;
    }
    console.log('Fetching lyrics for:', title, artist);
    options.title = title;
    options.artist = artist;
    const lyrics = await getLyrics(options);
    return lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error.message);
    return null;
  }
};