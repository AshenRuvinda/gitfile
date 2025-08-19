const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getTheme: () => ipcRenderer.invoke('get-theme'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // Music player controls
  playPause: () => ipcRenderer.send('play-pause'),
  nextTrack: () => ipcRenderer.send('next'),
  previousTrack: () => ipcRenderer.send('previous'),
  
  // Playlist management
  getPlaylists: () => ipcRenderer.send('get-playlists'),
  onPlaylistsUpdate: (callback) => ipcRenderer.on('playlists', callback),
  removePlaylistsListener: (callback) => ipcRenderer.removeListener('playlists', callback),
  
  // History and favorites
  addToHistory: (track) => ipcRenderer.send('add-to-history', track),
  addToFavorites: (track) => ipcRenderer.send('add-to-favorites', track),
  
  // Theme management
  setTheme: (theme) => ipcRenderer.send('set-theme', theme),
  
  // Mini player
  toggleMiniPlayer: () => ipcRenderer.send('toggle-mini'),
  
  // File system (for music library)
  selectMusicFolder: () => ipcRenderer.invoke('select-music-folder'),
  readMusicFiles: (folderPath) => ipcRenderer.invoke('read-music-files', folderPath),
  
  // Notifications and dialogs
  showNotification: (options) => ipcRenderer.send('show-notification', options),
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // Media controls listeners
  onPlayPause: (callback) => ipcRenderer.on('play-pause', callback),
  onNext: (callback) => ipcRenderer.on('next', callback),
  onPrevious: (callback) => ipcRenderer.on('previous', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  
  // Development helpers
  openDevTools: () => ipcRenderer.send('open-dev-tools'),
  reloadApp: () => ipcRenderer.send('reload-app'),
  
  // Error reporting
  sendError: (error) => ipcRenderer.send('renderer-error', error),
  
  // System info
  getPlatform: () => process.platform,
  getNodeVersion: () => process.versions.node,
  getElectronVersion: () => process.versions.electron,
  
  // Audio device management (if needed)
  getAudioDevices: () => ipcRenderer.invoke('get-audio-devices'),
  setAudioDevice: (deviceId) => ipcRenderer.send('set-audio-device', deviceId)
});

// Expose some Node.js APIs safely for development
if (process.env.NODE_ENV === 'development') {
  contextBridge.exposeInMainWorld('devAPI', {
    require: (module) => {
      // Only allow specific safe modules
      const allowedModules = ['path', 'os'];
      if (allowedModules.includes(module)) {
        return require(module);
      }
      throw new Error(`Module ${module} is not allowed`);
    },
    process: {
      platform: process.platform,
      versions: process.versions,
      env: {
        NODE_ENV: process.env.NODE_ENV
      }
    }
  });
}

// Global error handler for the preload script
window.addEventListener('error', (event) => {
  console.error('Preload script error:', event.error);
  ipcRenderer.send('renderer-error', {
    message: event.error.message,
    stack: event.error.stack,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection in preload:', event.reason);
  ipcRenderer.send('renderer-error', {
    message: 'Unhandled promise rejection',
    reason: event.reason,
    stack: event.reason?.stack
  });
});

// Ensure DOM is ready before exposing additional APIs
document.addEventListener('DOMContentLoaded', () => {
  // Add any DOM-ready specific APIs here
  console.log('Preload script: DOM ready');
});

console.log('Preload script loaded successfully');