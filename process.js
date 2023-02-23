const { exec } = require('child_process');
const fs = require('fs');

// execute the ps command with options to list all processes
exec('ps aux', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing ps command: ${err}`);
    return;
  }

  // parse the output of the ps command into an array of objects
  const processes = stdout.trim().split('\n').slice(1).map((line) => {
    const [user, pid, cpu, mem, vsz, rss, tty, stat, start, time, command] = line.trim().split(/\s+/);
    let columns = { User: user, PID: pid, CPU: cpu, Memory: mem, VSZ: vsz, RSS: rss, TTY: tty, STAT: stat, Start: start, Time: time, Command: command };

    // rename the columns based on the process being executed
    if (command.includes('node')) {
      columns = { User: user, PID: pid, CPU: cpu, Memory: mem, VSZ: vsz, RSS: rss, TTY: tty, STAT: stat, Start: start, Time: time, NodeCommand: command };
    } else if (command.includes('java')) {
      columns = { User: user, PID: pid, CPU: cpu, Memory: mem, VSZ: vsz, RSS: rss, TTY: tty, STAT: stat, Start: start, Time: time, JavaCommand: command };
    } else if (command.includes('python')) {
      columns = { User: user, PID: pid, CPU: cpu, Memory: mem, VSZ: vsz, RSS: rss, TTY: tty, STAT: stat, Start: start, Time: time, PythonCommand: command };
    }

    return columns;
  });

  // get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().slice(0, 10);

  // create a CSV string from the array of objects
  const csv = processes.map((process) => {
    return Object.values(process).join(',');
  }).join('\n');

  // write the CSV data to a file named processes_{date}.csv
  const filename = `processes_${currentDate}.csv`;
  fs.writeFile(filename, Object.keys(processes[0]).join(',') + '\n' + csv, (err) => {
    if (err) {
      console.error(`Error writing to file ${filename}: ${err}`);
      return;
    }
    console.log(`Data written to file ${filename}`);
    console.log(csv); // log the CSV data to the console
  });
});
