import { PlayerType, PropType } from './Base';
import videojs from 'videojs-contrib-eme';
import { useEffect } from 'react';

const VideoPlayer: PlayerType = (props: PropType) => {
  useEffect(() => {
    if (props.drm && props.source) {
      const player = videojs('video');

      // player.ready(() => {
      player.eme();
      const config = {
        src: props.source,
        type: 'application/dash+xml',
        keySystems: {
          'com.widevine.alpha': {
            url: props.drm!.licenseUri,
            licenseHeaders: {
              'pallycon-customdata-v2': props.drm!.token,
            },
            persistentState: 'required',
          },
        },
      };
      player.src(config);
      player.play();
      // });
    }
  });
  return <div id="video"></div>;
};

export default VideoPlayer;
