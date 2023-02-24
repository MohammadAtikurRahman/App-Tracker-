const { exec } = require('child_process');
const fs = require('fs');

// execute the ps command with options to list the Chrome processes of the user "atik"
exec(`ps aux -u atik | grep chrome`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing ps command: ${err}`);
    return;
  }

  // parse the output of the ps command into an array of objects
  const processes = stdout.trim().split('\n').slice(1).map((line) => {
    const [user, pid, cpu, mem, vsz, rss, tty, stat, start, time, command] = line.trim().split(/\s+/);
    const columns = { User: user, PID: pid, CPU: cpu, Memory: mem, VSZ: vsz, RSS: rss, TTY: tty, STAT: stat, Start: start, Time: time, Command: command };
    return columns;
  }).filter((process) => process.User === 'atik' && process.Command.includes('chrome'));

  // calculate the total time spent on Chrome processes
  let totalTime = 0;
  processes.forEach((process) => {
    const timeParts = process.Time.split(':').map(Number);
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2];
    totalTime += hours * 3600 + minutes * 60 + seconds;
  });

  // get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().slice(0, 10);

  // create a CSV string from the array of objects
  const csv = processes.map((process) => {
    return Object.values(process).join(',');
  }).join('\n');

  // write the CSV data to a file named atik_chrome_processes_{date}.csv
  const filename = `atik_chrome_processes_${currentDate}.csv`;
  fs.writeFile(filename, Object.keys(processes[0]).join(',') + '\n' + csv, (err) => {
    if (err) {
      console.error(`Error writing to file ${filename}: ${err}`);
      return;
    }
    console.log(`Data written to file ${filename}`);

    // log the CSV data and total time spent on Chrome processes to the console
    console.log(csv);
    console.log(`Total time spent on Chrome processes: ${totalTime} seconds (${(totalTime / 3600).toFixed(2)} hours)`);
  });
});
