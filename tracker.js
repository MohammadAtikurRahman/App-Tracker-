function detectVideoPlayer() {
    const userAgent = navigator.userAgent.toLowerCase();
  
    if (userAgent.indexOf('vlc') !== -1) {
      return 'VLC Media Player';
    } else if (userAgent.indexOf('windows media player') !== -1) {
      return 'Windows Media Player';
    } else if (userAgent.indexOf('quicktime') !== -1) {
      return 'QuickTime Player';
    } else if (userAgent.indexOf('realplayer') !== -1) {
      return 'RealPlayer';
    } else {
      return 'Unknown';
    }
  }
  
  console.log(detectVideoPlayer());
  