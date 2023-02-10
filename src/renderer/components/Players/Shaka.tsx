import { useEffect } from 'react';
import shaka from 'shaka-player';
import { PlayerType } from './Base';

const ShakaPlayer: PlayerType = function () {
  const manifestUri =
    'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd';

  useEffect(() => {
    shaka.polyfill.installAll();

    (async () => {
      const video = document.querySelector('video');
      console.log(video);
      const player = new shaka.Player(video);
      player.addEventListener('error', (event) => {
        console.error(event);
      });

      try {
        await player.load(manifestUri);
      } catch (e) {
        console.error(e);
      }
    })();
  });
  return <video id="video" width="640" controls autoPlay></video>;
};

export default ShakaPlayer;
