const { app, BrowserWindow, Tray, Menu, ipcMain, globalShortcut, nativeImage } = require('electron');
const path = require('path');
const Store = require('electron-store');
const remote = require('@electron/remote/main');

remote.initialize();

let mainWindow, tray, miniWindow;

// Function to check if dev server is running
async function isDevServerRunning() {
  return new Promise((resolve) => {
    const http = require('http');
    const req = http.request({
      hostname: 'localhost',
      port: 8080,
      path: '/',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      resolve(true);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'public/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true
    },
    show: false // Don't show until content is loaded
  });

  // Set CSP headers for development
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:8080; style-src 'self' 'unsafe-inline' http://localhost:8080; connect-src 'self' http://localhost:8080 ws://localhost:8080 https://api.genius.com;",
        ],
      },
    });
  });

  // Load the appropriate URL
  loadAppContent();

  remote.enable(mainWindow.webContents);
  
  // Only open dev tools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  // Show window once it's ready
  mainWindow.once('ready-to-show', () => {
    console.log('Main window is ready to show');
    mainWindow.show();
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  // Force show window after timeout if not shown
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      console.log('Forcing window to show after timeout');
      mainWindow.show();
      mainWindow.focus();
    }
  }, 5000);

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Main window finished loading');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load window:', errorCode, errorDescription, validatedURL);
    // Try fallback if dev server fails
    if (validatedURL.includes('localhost:8080')) {
      console.log('Dev server failed, trying fallback...');
      loadFallbackContent();
    }
  });

  mainWindow.webContents.on('render-process-gone', (event, details) => {
    console.error('Renderer process crashed:', details);
  });

  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`Renderer console [${level}]: ${message} (Source: ${sourceId}:${line})`);
  });
}

async function loadAppContent() {
  console.log('loadAppContent: Starting to load app content');
  const devServerRunning = await isDevServerRunning();
  console.log('loadAppContent: Dev server running:', devServerRunning);
  
  if (devServerRunning) {
    console.log('Dev server detected, loading from localhost:8080');
    try {
      await mainWindow.loadURL('http://localhost:8080');
      console.log('Successfully loaded Webpack dev server');
    } catch (err) {
      console.error('Failed to load Webpack dev server:', err.message);
      loadFallbackContent();
    }
  } else {
    console.log('Dev server not running, loading from file');
    loadFallbackContent();
  }
}

function loadFallbackContent() {
  const htmlPath = path.join(__dirname, 'public/index.html');
  console.log('Loading fallback content from:', htmlPath);
  
  mainWindow.loadFile(htmlPath)
    .then(() => {
      console.log('Successfully loaded public/index.html');
    })
    .catch((err) => {
      console.error('Failed to load public/index.html:', err.message);
      // Create a basic error page
      const errorHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Music Player - Error</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background: #1a1a1a; 
              color: white; 
              padding: 40px; 
              text-align: center; 
            }
            .error { color: #ff6b6b; }
          </style>
        </head>
        <body>
          <h1>Music Player</h1>
          <p class="error">Unable to load the application</p>
          <p>Please make sure the application files are properly installed.</p>
          <button onclick="location.reload()">Retry</button>
        </body>
        </html>
      `;
      mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
    });
}

function createMiniPlayer() {
  miniWindow = new BrowserWindow({
    width: 300,
    height: 100,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  // Load mini player content
  const loadMiniPlayer = async () => {
    const devServerRunning = await isDevServerRunning();
    
    if (devServerRunning) {
      try {
        await miniWindow.loadURL('http://localhost:8080#mini');
        console.log('Successfully loaded mini player from dev server');
      } catch (err) {
        console.error('Failed to load mini player from dev server:', err.message);
        miniWindow.loadFile(path.join(__dirname, 'public/index.html'));
      }
    } else {
      miniWindow.loadFile(path.join(__dirname, 'public/index.html'));
    }
  };

  loadMiniPlayer();
  remote.enable(miniWindow.webContents);
}

function createTray() {
  try {
    const iconPath = path.join(__dirname, 'public/icon.png');
    const icon = nativeImage.createFromPath(iconPath);
    
    if (icon.isEmpty()) {
      console.warn('Tray icon not found at:', iconPath);
    }
    
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Show App', 
        click: () => {
          if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.show();
            mainWindow.focus();
          }
        }
      },
      { type: 'separator' },
      { label: 'Play/Pause', click: () => mainWindow?.webContents.send('play-pause') },
      { label: 'Next', click: () => mainWindow?.webContents.send('next') },
      { label: 'Previous', click: () => mainWindow?.webContents.send('previous') },
      { type: 'separator' },
      { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } },
    ]);
    
    tray.setToolTip('Music Player');
    tray.setContextMenu(contextMenu);
    
    tray.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    });
  } catch (error) {
    console.error('Failed to create tray:', error);
  }
}

// Database setup
const store = new Store();
let db;

function initializeDatabase() {
  try {
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.join(__dirname, 'database/musicPlayer.db');
    
    // Ensure database directory exists
    const fs = require('fs');
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Failed to open database:', err.message);
        db = null;
        return;
      }
      console.log('Connected to SQLite database at:', dbPath);
    });

    if (db) {
      db.serialize(() => {
        const tables = [
          `CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT UNIQUE NOT NULL, 
            tracks TEXT DEFAULT '[]'
          )`,
          `CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            track TEXT NOT NULL, 
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            track TEXT UNIQUE NOT NULL
          )`,
          `CREATE TABLE IF NOT EXISTS preferences (
            key TEXT PRIMARY KEY, 
            value TEXT
          )`
        ];

        tables.forEach((sql, index) => {
          db.run(sql, (err) => {
            if (err) {
              console.error(`Error creating table ${index + 1}:`, err.message);
            } else {
              console.log(`Table ${index + 1} ready`);
            }
          });
        });
      });
    }
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    db = null;
  }
}

// IPC handlers
ipcMain.on('get-playlists', (event) => {
  if (!db) {
    console.warn('Database unavailable, returning empty playlists');
    event.sender.send('playlists', []);
    return;
  }
  
  db.all('SELECT * FROM playlists', (err, rows) => {
    if (err) {
      console.error('Error fetching playlists:', err.message);
      event.sender.send('playlists', []);
      return;
    }
    
    const playlists = rows.map(row => {
      try {
        return { 
          id: row.id,
          name: row.name, 
          tracks: JSON.parse(row.tracks || '[]') 
        };
      } catch (parseErr) {
        console.error('Error parsing playlist tracks:', parseErr);
        return { id: row.id, name: row.name, tracks: [] };
      }
    });
    
    event.sender.send('playlists', playlists);
  });
});

ipcMain.on('add-to-history', (event, track) => {
  if (!db) {
    console.warn('Database unavailable, skipping history update');
    return;
  }
  
  const trackJson = JSON.stringify(track);
  db.run('INSERT INTO history (track) VALUES (?)', [trackJson], (err) => {
    if (err) {
      console.error('Error adding to history:', err.message);
    } else {
      console.log('Added track to history');
    }
  });
});

ipcMain.on('set-theme', (event, theme) => {
  try {
    store.set('theme', theme);
    console.log('Theme saved:', theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
});

ipcMain.on('toggle-mini', () => {
  if (miniWindow) {
    if (miniWindow.isVisible()) {
      miniWindow.hide();
    } else {
      miniWindow.show();
    }
  } else {
    createMiniPlayer();
  }
});

// App event handlers
app.whenReady().then(() => {
  console.log('App is ready');
  
  // Initialize database first
  initializeDatabase();
  
  // Create main window and tray
  createWindow();
  createTray();
  
  // Register global shortcuts
  try {
    globalShortcut.register('MediaPlayPause', () => {
      mainWindow?.webContents.send('play-pause');
    });
    globalShortcut.register('MediaNextTrack', () => {
      mainWindow?.webContents.send('next');
    });
    globalShortcut.register('MediaPreviousTrack', () => {
      mainWindow?.webContents.send('previous');
    });
    
    // Optional: Register space key for play/pause (be careful with this)
    // globalShortcut.register('Space', () => {
    //   mainWindow?.webContents.send('play-pause');
    // });
    
    console.log('Global shortcuts registered');
  } catch (error) {
    console.error('Error registering global shortcuts:', error);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
  
  // Close database connection
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
});

// Unregister global shortcuts when app is quitting
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});