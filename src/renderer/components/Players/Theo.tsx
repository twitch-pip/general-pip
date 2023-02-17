import { PlayerType, PropType } from './Base';
import * as THEOplyaer from 'theoplayer';
import { useEffect } from 'react';

const TheoPlayer: PlayerType = (props: PropType) => {
  useEffect(() => {
    if (props.drm && props.source) {
      let drmConfigurations: any = {
        widevine: {
          headers: {
            'pallycon-customdata-v2': props.drm!.token,
          },
          licenseAcquisitionURL: props.drm!.licenseUri,
        },
      };
      console.log(drmConfigurations);

      const video = document.querySelector('video');
      const player = new THEOplyaer.Player(video as HTMLVideoElement);
      player.source = {
        sources: {
          src: props.source,
          type: 'application/dash+xml',
          contentProtection: drmConfigurations,
        },
      };
    }
  });

  return <video controls autoPlay={true}></video>;
};

export default TheoPlayer;
