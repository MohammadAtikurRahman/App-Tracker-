const os = require("os");
const fs = require("fs");

// Get the system uptime in seconds
const uptimeInSeconds = os.uptime();

// Calculate the boot time by subtracting the uptime from the current time
const bootTime = Date.now() - uptimeInSeconds * 1000;

// Convert the boot time to a Date object
const bootTimeDate = new Date(bootTime);

// Format the date with a GMT+6 timezone offset
const options = {
  timeZone: "Asia/Dhaka",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

// Format the boot time date
const formattedBootTime = bootTimeDate
  .toLocaleString("en-GB", options)
  .replace(",", "") // remove the comma
  .replace(" at", ","); // replace "at" with a comma
// Get the current time and format it
const now = new Date();

const currentTime = now
  .toLocaleTimeString("en-GB", options)
  .replace(",", "") // remove the comma
  .replace(" at", ","); // replace "at" with a comma
// Get the current time and format it

// Calculate the duration since boot time in seconds
const durationInSeconds = Math.floor((now - bootTime) / 1000);

// Convert the duration to hours, minutes, and seconds
const hours = Math.floor(durationInSeconds / 3600);
const minutes = Math.floor((durationInSeconds % 3600) / 60);
const seconds = durationInSeconds % 60;

// Format the duration as a string

const user_pc = os.userInfo().username;

const durationString = `${hours} hours ${minutes} minutes ${seconds} seconds`;

// Create a string with the boot time, current time, and duration in CSV format

// console.log(formattedBootTime);
// console.log(currentTime);
const csvData = `${formattedBootTime},${currentTime},${durationString},${user_pc}\n`;
const csvString = fs.existsSync("boot_time.csv") ? csvData : `start_date,start_time,end_date,end_time,total_hours_used,pc_user\n${csvData}`;

fs.appendFile("boot_time.csv", csvString, (err) => {
  if (err) throw err;
  console.log("Boot time, current time, and duration saved to boot_time.csv");
})

// Log the duration to the console

// console.log("Who used this PC", user_pc);
console.log(`Duration since boot time: ${durationString}`);









