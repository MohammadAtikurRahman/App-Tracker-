const os = require('os');
const fs = require('fs');

// Get the system uptime in seconds
const uptimeInSeconds = os.uptime();

// Calculate the boot time by subtracting the uptime from the current time
const bootTime = Date.now() - uptimeInSeconds * 1000;

// Save the boot time to a file
fs.writeFile('boot_time.txt', bootTime.toString(), (err) => {
  if (err) throw err;
  console.log('Boot time saved to boot_time.txt');
});

// Read the boot time from the file at startup
fs.readFile('boot_time.txt', 'utf8', (err, data) => {
  if (err) throw err;

  // Convert the boot time to a number
  const bootTime = parseInt(data, 10);

  // Calculate the elapsed time by subtracting the boot time from the current time
  const elapsedTimeInSeconds = (Date.now() - bootTime) / 1000;

  // Convert the elapsed time to a human-readable format
  const elapsedTime = formatTime(elapsedTimeInSeconds);

  console.log(`You have spent ${elapsedTime} on your operating system since the last boot.`);
});

// Helper function to format time in a human-readable way
function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

