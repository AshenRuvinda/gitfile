import React from 'react';
import useVisualizer from '../hooks/useVisualizer.js';

const Visualizer = () => {
  useVisualizer();

  return (
    <div className="p-4">
      <h2>Visualizer</h2>
      <canvas id="visualizerCanvas"></canvas>
    </div>
  );
};

export default Visualizer;