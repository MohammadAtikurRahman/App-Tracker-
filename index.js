const os = require('os');
const fs = require('fs');

// Get the system uptime in seconds
const uptimeInSeconds = os.uptime();

// Calculate the boot time by subtracting the uptime from the current time
const bootTime = Date.now() - uptimeInSeconds * 1000;

// Convert the boot time to a Date object
const bootTimeDate = new Date(bootTime);

// Format the date with a GMT+6 timezone offset
const options = {
  timeZone: 'Asia/Dhaka',
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
  timeZoneName: 'short',
  localeMatcher: 'best fit',
  formatMatcher: 'best fit'
};

// Format the boot time date
const formattedBootTime = bootTimeDate.toLocaleString('en-GB', options);

// Get the current time and format it
const now = new Date();
const currentTime = now.toLocaleTimeString();

// Calculate the duration since boot time in seconds
const durationInSeconds = Math.floor((now - bootTime) / 1000);

// Convert the duration to hours, minutes, and seconds
const hours = Math.floor(durationInSeconds / 3600);
const minutes = Math.floor((durationInSeconds % 3600) / 60);
const seconds = durationInSeconds % 60;

// Format the duration as a string
const durationString = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;

// Create a string with the boot time, current time, and duration in CSV format
const csvString = `Operating System Boot Time,${formattedBootTime}Current Time,${currentTime}Duration since boot time,${durationString}\n`;

// Append the CSV string to the file
fs.appendFile('boot_time.csv', csvString, (err) => {
  if (err) throw err;
  console.log('Boot time, current time, and duration saved to boot_time.csv');
});

// Log the duration to the console
console.log(`Duration since boot time: ${durationString}`);
