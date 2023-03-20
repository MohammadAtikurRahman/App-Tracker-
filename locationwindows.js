const { exec } = require('child_process');

const findVlcProcess = () => {
  return new Promise((resolve, reject) => {
    exec('powershell.exe Get-Process | Where-Object {$_.ProcessName -eq "vlc"}', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        const lines = stdout.split('\n').filter(line => line.includes('vlc'));

        if (lines.length > 0) {
          const parts = lines[0].split(' ').filter(part => part !== '');
          const pid = parts[1];
          const fileName = parts[0];
          const fileLocation = ''; // Windows does not provide the full file path in the process information

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
      console.log(`Playing file '${processInfo.fileName}'.`);
    } else {
      console.log('No VLC process found.');
    }
  })
  .catch(error => {
    console.error(`Error finding VLC process: ${error.message}`);
  });
