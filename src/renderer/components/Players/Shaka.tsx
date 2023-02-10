import { useEffect } from 'react';
import shaka from 'shaka-player';
import { PlayerType, PropType } from './Base';

const ShakaPlayer: PlayerType = function (props: PropType) {
  useEffect(() => {
    shaka.polyfill.installAll();

    (async () => {
      const video = document.querySelector('video');
      if (video && props.source) {
        const player = new shaka.Player(video);

        player.addEventListener('error', (event) => {
          console.error(event);
        });

        player.load(props.source).catch((e) => {
          console.error(e);
        });
      }
    })();
  }, [props.source]);
  return <video id="video" width="640" controls autoPlay></video>;
};

export default ShakaPlayer;
