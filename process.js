const { exec } = require('child_process');

// execute the ps command with options to list all processes
exec('ps aux', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing ps command: ${err}`);
    return;
  }

  // parse the output of the ps command into an array of objects
  const processes = stdout.trim().split('\n').slice(1).map((line) => {
    const [user, pid, cpu, mem, vsz, rss, tty, stat, start, time, command] = line.trim().split(/\s+/);
    return { user, pid, cpu, mem, vsz, rss, tty, stat, start, time, command };
  });

  // print out the list of processes
  console.log(processes);
});
