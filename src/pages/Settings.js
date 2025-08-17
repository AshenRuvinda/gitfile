import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-4">Appearance</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-2">Theme</label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-4">Audio</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-2">Volume</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="50" 
                className="w-full"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="crossfade" className="mr-2" />
              <label htmlFor="crossfade" className="text-sm">Enable crossfade</label>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-4">Library</h3>
          <div className="space-y-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Scan for music files
            </button>
            <p className="text-gray-400 text-sm">Automatically find music files on your computer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;