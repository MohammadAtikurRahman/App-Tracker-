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

  // Extract the file paths of all files in the Recent folder
  const recentFiles = files.map(file => path.join(recentFolderPath, file));

  if (recentFiles.length > 0) {
    console.log(`Recently accessed files:`);
    recentFiles.forEach(file => {
      console.log(file);
    });
  } else {
    console.log('No recent files found.');
  }
});
