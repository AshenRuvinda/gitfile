import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import contexts first (we know these work)
import { usePlayer } from './context/PlayerContext.js';
import { useTheme } from './context/ThemeContext.js';

// Try importing components one by one - comment out the ones that fail
let Home, NowPlaying, Playlists, Settings, About;
let MiniPlayer, Header, Sidebar, PlayerControls;

// Import pages with error handling
try {
  Home = require('./pages/Home.js').default;
  console.log('✅ Home imported successfully');
} catch (error) {
  console.error('❌ Failed to import Home:', error.message);
  Home = () => <div className="p-4 text-white">Home component failed to load: {error.message}</div>;
}

try {
  NowPlaying = require('./pages/NowPlaying.js').default;
  console.log('✅ NowPlaying imported successfully');
} catch (error) {
  console.error('❌ Failed to import NowPlaying:', error.message);
  NowPlaying = () => <div className="p-4 text-white">NowPlaying component failed to load: {error.message}</div>;
}

try {
  Playlists = require('./pages/Playlists.js').default;
  console.log('✅ Playlists imported successfully');
} catch (error) {
  console.error('❌ Failed to import Playlists:', error.message);
  Playlists = () => <div className="p-4 text-white">Playlists component failed to load: {error.message}</div>;
}

try {
  Settings = require('./pages/Settings.js').default;
  console.log('✅ Settings imported successfully');
} catch (error) {
  console.error('❌ Failed to import Settings:', error.message);
  Settings = () => <div className="p-4 text-white">Settings component failed to load: {error.message}</div>;
}

try {
  About = require('./pages/About.js').default;
  console.log('✅ About imported successfully');
} catch (error) {
  console.error('❌ Failed to import About:', error.message);
  About = () => <div className="p-4 text-white">About component failed to load: {error.message}</div>;
}

// Import components with error handling
try {
  MiniPlayer = require('./components/MiniPlayer.js').default;
  console.log('✅ MiniPlayer imported successfully');
} catch (error) {
  console.error('❌ Failed to import MiniPlayer:', error.message);
  MiniPlayer = () => <div className="p-4 text-white">Mini Player Mode</div>;
}

try {
  Header = require('./components/Header.js').default;
  console.log('✅ Header imported successfully');
} catch (error) {
  console.error('❌ Failed to import Header:', error.message);
  Header = () => <div className="bg-gray-800 p-4 text-white">🎵 Music Player (Header failed to load)</div>;
}

try {
  Sidebar = require('./components/Sidebar.js').default;
  console.log('✅ Sidebar imported successfully');
} catch (error) {
  console.error('❌ Failed to import Sidebar:', error.message);
  Sidebar = () => <div className="bg-gray-900 w-64 p-4 text-white">Navigation (Sidebar failed to load)</div>;
}

try {
  PlayerControls = require('./components/PlayerControls.js').default;
  console.log('✅ PlayerControls imported successfully');
} catch (error) {
  console.error('❌ Failed to import PlayerControls:', error.message);
  PlayerControls = () => <div className="bg-gray-800 p-4 text-white">Player Controls (Component failed to load)</div>;
}

const App = () => {
  console.log('App: Rendering App component');
  
  const { isMini } = usePlayer();
  const { theme } = useTheme();

  console.log('App: isMini:', isMini, 'theme:', theme);

  useEffect(() => {
    // Signal that React app has loaded
    console.log('App: React app has mounted successfully');
    
    // Hide splash screen
    setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.style.display = 'none';
        console.log('App: Splash screen hidden');
      }
      
      const root = document.getElementById('root');
      if (root) {
        root.style.display = 'block';
        console.log('App: Root element shown');
      }
    }, 500);
  }, []);

  if (isMini) {
    console.log('App: Rendering MiniPlayer');
    return <MiniPlayer />;
  }

  return (
    <div className={`flex flex-col h-screen ${theme}`} style={{ background: '#1a1a1a' }}>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
      <PlayerControls />
    </div>
  );
};

export default App;