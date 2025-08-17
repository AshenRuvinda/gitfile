import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import './styles/globals.css';
import './styles/themes.css';
import { PlayerProvider } from './context/PlayerContext.js';
import { ThemeProvider } from './context/ThemeContext.js';

console.log('Starting React app initialization...');

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
            React Application Error
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
          {this.state.errorInfo && (
            <pre style={{ 
              marginTop: '20px', 
              padding: '20px', 
              background: '#333', 
              borderRadius: '8px',
              maxWidth: '80vw',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.errorInfo.componentStack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

const RootApp = () => {
  useEffect(() => {
    console.log('RootApp: Component mounted');
    
    // Check if we're in Electron
    const isElectron = typeof window !== 'undefined' && window.electronAPI;
    console.log('RootApp: Running in Electron:', isElectron);
    
    // Hide splash screen after a short delay
    const timer = setTimeout(() => {
      try {
        console.log('RootApp: Attempting to hide splash screen');
        const splash = document.getElementById('splash');
        const root = document.getElementById('root');
        
        if (splash) {
          console.log('RootApp: Hiding splash screen');
          splash.style.display = 'none';
        } else {
          console.log('RootApp: Splash element not found');
        }
        
        if (root) {
          console.log('RootApp: Showing root element');
          root.style.display = 'block';
          root.style.height = '100vh';
          root.style.width = '100%';
        } else {
          console.log('RootApp: Root element not found');
        }
      } catch (error) {
        console.error('RootApp: Error managing splash screen:', error);
      }
    }, 500);

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

// Wait for DOM to be ready
const initializeApp = () => {
  console.log('Initializing React app...');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found in DOM');
    
    // Create root element if it doesn't exist
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    newRoot.style.width = '100%';
    newRoot.style.height = '100vh';
    document.body.appendChild(newRoot);
    console.log('Created root element');
    
    // Try again
    setTimeout(() => initializeApp(), 100);
    return;
  }

  try {
    console.log('Creating React root...');
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('Rendering RootApp...');
    root.render(<RootApp />);
    
    console.log('React app initialized successfully');
  } catch (error) {
    console.error('Failed to initialize React app:', error);
    
    // Show fallback UI
    document.body.innerHTML = `
      <div style="
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 100vh; 
        background: #1a1a1a; 
        color: white; 
        font-family: Arial, sans-serif;
        flex-direction: column;
      ">
        <h1 style="color: #ff6b6b; margin-bottom: 20px;">Failed to Load React App</h1>
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