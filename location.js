const { exec } = require('child_process');

const findVlcProcess = () => {
  return new Promise((resolve, reject) => {
    exec('ps -ax | grep vlc', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        const lines = stdout.split('\n').filter(line => line.includes('vlc'));

        if (lines.length > 0) {
          const parts = lines[0].split(' ').filter(part => part !== '');
          const pid = parts[0];
          const fileName = parts[4];
          const fileLocation = parts.slice(5).join(' ');

          resolve({ pid, fileName, fileLocation });
        } else {
          resolve(null);
        }
      }
    });
  });
};
findVlcProcess()
  .then(processInfo => {
    if (processInfo) {
      console.log(`VLC process found with PID ${processInfo.pid}.`);
      console.log(`Playing file '${processInfo.fileName}' located at '${processInfo.fileLocation}'.`);
    } else {
      console.log('No VLC process found.');
    }
  })
  .catch(error => {
    console.error(`Error finding VLC process: ${error.message}`);
  });
