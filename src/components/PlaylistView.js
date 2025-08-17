import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const PlaylistView = ({ playlist }) => {
  const { playTrack } = useContext(PlayerContext);

  return (
    <ul className="space-y-2">
      {playlist.map((track, index) => (
        <li key={index} className="flex justify-between" onClick={() => playTrack(track)}>
          <span>{track.title}</span>
          <span>{track.artist}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistView;