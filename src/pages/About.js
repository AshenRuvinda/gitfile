import React from 'react';

const About = () => {
  return (
    <div className="p-6 text-white h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎵</div>
        <h2 className="text-3xl font-bold mb-4">Music Player</h2>
        <p className="text-gray-400 mb-6">
          A modern music player built with React and Electron. 
          Enjoy your favorite music with a beautiful, intuitive interface.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Version:</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Built with:</span>
              <span>React + Electron</span>
            </div>
            <div className="flex justify-between">
              <span>Platform:</span>
              <span>{navigator.platform}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;