import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext.js';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  MoreHorizontal,
  Maximize2,
  List
} from 'lucide-react';

const PlayerControls = () => {
  const { isPlaying, setIsPlaying, currentTrack } = usePlayer();
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(210); // 3:30 example
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [isLiked, setIsLiked] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const progressRef = useRef();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const cycleRepeat = () => {
    setRepeatMode((mode) => (mode + 1) % 3);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setProgress(percent * duration);
  };

  // Simulate progress for demo
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const currentTime = Math.floor(progress);
  const progressPercent = (progress / duration) * 100;

  return (
    <div className="bg-gradient-to-t from-gray-900 to-gray-800 border-t border-gray-700 shadow-2xl">
      {/* Progress Bar */}
      <div className="px-4 pt-2">
        <div 
          ref={progressRef}
          className="w-full h-1 bg-gray-600 rounded-full cursor-pointer hover:h-2 transition-all duration-200"
          onClick={handleProgressChange}
        >
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        {/* Track Info */}
        <div className="flex items-center min-w-0 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg mr-4 flex-shrink-0 shadow-lg">
            {currentTrack?.albumArt ? (
              <img src={currentTrack.albumArt} alt="Album Art" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold truncate">
              {currentTrack?.title || 'No track selected'}
            </h4>
            <p className="text-gray-400 text-sm truncate">
              {currentTrack?.artist || 'Unknown Artist'}
            </p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <button 
            onClick={toggleLike}
            className={`ml-3 p-2 rounded-full transition-colors ${
              isLiked 
                ? 'text-red-500 hover:text-red-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col items-center mx-8">
          <div className="flex items-center space-x-6">
            {/* Shuffle */}
            <button 
              onClick={toggleShuffle}
              className={`p-2 rounded-full transition-colors ${
                isShuffled 
                  ? 'text-purple-500 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous */}
            <button className="text-gray-300 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            {/* Next */}
            <button className="text-gray-300 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Repeat */}
            <button 
              onClick={cycleRepeat}
              className={`p-2 rounded-full transition-colors relative ${
                repeatMode > 0
                  ? 'text-purple-500 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Repeat className="w-4 h-4" />
              {repeatMode === 2 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 min-w-0 flex-1 justify-end">
          {/* Queue */}
          <button 
            onClick={() => setShowQueue(!showQueue)}
            className={`p-2 rounded-lg transition-colors ${
              showQueue 
                ? 'text-purple-500 bg-purple-500/10' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="w-20 h-1 bg-gray-600 rounded-full">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(e.target.value);
                  if (e.target.value > 0) setIsMuted(false);
                }}
                className="w-full h-1 bg-transparent appearance-none cursor-pointer slider"
              />
              <div 
                className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 w-8 text-right">{isMuted ? 0 : volume}</span>
          </div>

          {/* More Options */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Fullscreen */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PlayerControls;