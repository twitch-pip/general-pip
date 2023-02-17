import { useEffect, useRef } from 'react';
import { PlayerType, PropType } from './Base';
import { Player } from 'bitmovin-player';
import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';
import DashModule from 'bitmovin-player/modules/bitmovinplayer-dash';
import EngineBitmovinModule from 'bitmovin-player/modules/bitmovinplayer-engine-bitmovin';
import PolyfillModule from 'bitmovin-player/modules/bitmovinplayer-polyfill';
import XmlModule from 'bitmovin-player/modules/bitmovinplayer-xml';
import ContainerTSModule from 'bitmovin-player/modules/bitmovinplayer-container-ts';
import 'bitmovin-player/bitmovinplayer-ui.css';

const BitmovinPlayer: PlayerType = (props: PropType) => {
  const playerDiv = useRef<any>(null);

  const config = {
    key: '1586bd1e-149d-4cfa-9876-6a88c1c05ca2',
  };

  useEffect(() => {
    if (props.drm && props.source) {
      const source = {
        // dash: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
        // poster:
        //   'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
        dash: props.source,
        drm: {
          widevine: {
            LA_URL: props.drm!.licenseUri,
            headers: {
              'pallycon-customdata-v2': props.drm!.token,
            },
          },
          mediaKeySystemConfig: {
            persistentState: 'required',
          },
        },
      };
      console.log(source);
      Player.addModule(EngineBitmovinModule);
      Player.addModule(XmlModule);
      Player.addModule(XmlModule);
      Player.addModule(ContainerTSModule);
      Player.addModule(DashModule);
      const player = new Player(playerDiv.current, config);
      UIFactory.buildDefaultUI(player);
      player
        .load(source)
        .then(() => {
          console.log(player);
        })
        .catch((error) => {
          console.error('Error while creating Bitmovin Player instance', error);
        });
    }
  }, []);

  return <div ref={playerDiv} />;
};

export default BitmovinPlayer;
