import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import contexts
import { usePlayer } from './context/PlayerContext.js';
import { useTheme } from './context/ThemeContext.js';

// Import components
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import PlayerControls from './components/PlayerControls.js';
import MiniPlayer from './components/MiniPlayer.js';

// Import pages
import Home from './pages/Home.js';
import NowPlaying from './pages/NowPlaying.js';
import Playlists from './pages/Playlists.js';
import Settings from './pages/Settings.js';
import About from './pages/About.js';

const App = () => {
  console.log('App: Rendering Music Player App');
  
  const { isMini } = usePlayer();
  const { theme } = useTheme();

  useEffect(() => {
    console.log('App: Music Player App mounted successfully');
  }, []);

  // Mini player mode
  if (isMini) {
    return <MiniPlayer />;
  }

  // Main application layout with inline styles
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      <Header />
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden' 
      }}>
        <Sidebar />
        <main style={{ 
          flex: 1, 
          overflowY: 'auto',
          background: '#1a1a1a'
        }}>
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