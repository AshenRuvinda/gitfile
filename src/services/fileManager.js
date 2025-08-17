export const importFiles = async () => {
    const { dialog } = window.electronAPI ? require('@electron/remote') : {};
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3', 'wav'] }],
    });
    return filePaths;
  };
  
  export const getLocalFiles = async () => {
    // Retrieve from DB or directory (implement as needed)
    return [];
  };