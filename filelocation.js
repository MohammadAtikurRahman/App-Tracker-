const fs = require('fs');
const path = require('path');

// Get path to the Recent folder for the current user
const recentFolderPath = path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Recent');

// Read the contents of the Recent folder
fs.readdir(recentFolderPath, (err, files) => {
  if (err) {
    console.error(`Error reading the directory: ${err.message}`);
    return;
  }

  // Filter out non-video files and extract the file paths
  const recentVideoFiles = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.mp4' || ext === '.avi' || ext === '.mkv' || ext === '.lnk';
    })
    .map(file => path.join(recentFolderPath, file));

  if (recentVideoFiles.length > 0) {
    console.log(`Most recently accessed video file: ${recentVideoFiles[0]}`);
  } else {
    console.log('No recent video files found.');
  }
});
