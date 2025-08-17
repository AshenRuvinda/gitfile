import * as musicMetadata from 'music-metadata-browser';

export const extractMetadata = async (filePath) => {
  const buffer = window.electronAPI.readFile(filePath); // Accessed via preload.js
  const metadata = await musicMetadata.parseBuffer(buffer);
  return {
    title: metadata.common.title,
    artist: metadata.common.artist,
    albumArt: metadata.common.picture
      ? URL.createObjectURL(new Blob([metadata.common.picture[0].data]))
      : null,
  };
};