const { exec } = require('child_process');

// execute the ps command with options to list all running processes
exec(`ps aux`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing ps command: ${err}`);
    return;
  }

  // parse the output of the ps command into an array of objects
  const processes = stdout.trim().split('\n').slice(1).map((line) => {
    const [user, pid, cpu, mem, vsz, rss, tty, stat, start, time, command] = line.trim().split(/\s+/);
    const columns = { User: user, PID: pid, CPU: cpu, Memory: mem, VSZ: vsz, RSS: rss, TTY: tty, STAT: stat, Start: start, Time: time, Command: command };
    return columns;
  });

  // find any video player processes
  const videoPlayers = processes.filter((process) => process.Command.includes('vlc') || process.Command.includes('mpv') || process.Command.includes('mplayer'));

  // if there are video player processes, log them to the console
  if (videoPlayers.length > 0) {
    console.log('Video player processes:');
    console.table(videoPlayers);
  } else {
    console.log('No video player processes found.');
  }
});
