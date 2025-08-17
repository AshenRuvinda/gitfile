export const getPlaylists = () => new Promise((resolve) => {
    window.electronAPI.send('get-playlists');
    window.electronAPI.on('playlists', (playlists) => resolve(playlists));
  });
  
  export const addToHistory = (track) => {
    window.electronAPI.send('add-to-history', track);
  };