import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Fix global issues
if (typeof global === 'undefined') {
    window.global = window;
}

console.log('Starting Music Player React app...');

// Context Providers
import { PlayerProvider } from './context/PlayerContext.js';
import { ThemeProvider } from './context/ThemeContext.js';

// Main App Component
import App from './App.js';

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught error:', error);
    return { error: error.message };
  }

  componentDidCatch(error, info) {
    console.error('Error in React app:', error, info);
    this.setState({ error: error.message, errorInfo: info });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ 
          color: 'white', 
          padding: '40px', 
          background: '#1a1a1a', 
          fontFamily: 'Arial, sans-serif',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#ff6b6b', marginBottom: '20px' }}>
            🎵 Music Player Error
          </h1>
          <p style={{ marginBottom: '20px' }}>
            {this.state.error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const RootApp = () => {
  React.useEffect(() => {
    console.log('RootApp: Music Player mounted');
    
    // Hide splash screen after successful mount
    const timer = setTimeout(() => {
      try {
        const splash = document.getElementById('splash');
        const root = document.getElementById('root');
        
        if (splash) {
          splash.style.display = 'none';
          console.log('Splash screen hidden');
        }
        
        if (root) {
          root.style.display = 'block';
        }
        
        // Signal successful load
        window.dispatchEvent(new CustomEvent('react-loaded'));
        
      } catch (error) {
        console.error('Error managing splash screen:', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

// Initialize the app
const initializeApp = () => {
  console.log('Initializing Music Player...');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<RootApp />);
    console.log('Music Player initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Music Player:', error);
    
    // Show error in root element
    rootElement.innerHTML = `
      <div style="
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 100vh; 
        background: #1a1a1a; 
        color: white; 
        font-family: Arial, sans-serif;
        flex-direction: column;
        text-align: center;
      ">
        <h1 style="color: #ff6b6b; margin-bottom: 20px;">🎵 Music Player</h1>
        <h2 style="color: #ff6b6b; margin-bottom: 20px;">Failed to Load</h2>
        <p style="margin-bottom: 20px;">Error: ${error.message}</p>
        <button onclick="location.reload()" style="
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        ">Reload</button>
      </div>
    `;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}