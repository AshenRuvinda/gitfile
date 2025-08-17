import React, { useEffect, useState } from 'react';
import * as fileManager from '../services/fileManager';
import * as metadata from '../services/metadata';

const LibraryView = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const loadLibrary = async () => {
      const files = await fileManager.getLocalFiles();
      const tracks = await Promise.all(files.map(async (file) => ({
        ...await metadata.extractMetadata(file),
        path: file,
      })));
      setLibrary(tracks);
    };
    loadLibrary();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {library.map((track, index) => (
        <div key={index} className="p-2 border">
          <img src={track.albumArt || 'default.jpg'} alt="album" />
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>
      ))}
    </div>
  );
};

export default LibraryView;