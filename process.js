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

  // get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().slice(0, 10);

  // create a CSV string from the array of objects
  const csv = processes.map((process) => {
    return Object.values(process).join(',');
  }).join('\n');

  // write the CSV data to a file named chrome_processes_{date}.csv
  const filename = `atik_chrome_processes_${currentDate}.csv`;
  fs.writeFile(filename, Object.keys(processes[0]).join(',') + '\n' + csv, (err) => {
    if (err) {
      console.error(`Error writing to file ${filename}: ${err}`);
      return;
    }
    console.log(`Data written to file ${filename}`);
    console.log(csv); // log the CSV data to the console
  });
});

