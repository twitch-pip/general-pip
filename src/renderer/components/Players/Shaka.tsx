import { useEffect } from 'react';
import shaka from 'shaka-player';
import { PlayerType, PropType } from './Base';

function arrayBufferToString(buffer) {
  var arr = new Uint8Array(buffer);
  var str = String.fromCharCode.apply(String, arr);
  // if(/[\u0080-\uffff]/.test(str)){
  //     throw new Error("this string seems to contain (still encoded) multibytes");
  // }
  return str;
}

function parsingResponse(response: shaka.extern.Response) {
  let responseText = arrayBufferToString(response.data as ArrayBuffer);
  // Trim whitespace.
  responseText = responseText.trim();

  console.log('responseText :: ', responseText);

  try {
    const pallyconObj = JSON.parse(responseText);
    if (pallyconObj && pallyconObj.errorCode && pallyconObj.message) {
      if ('8002' != pallyconObj.errorCode) {
        alert(
          'PallyCon Error : ' +
            pallyconObj.message +
            '(' +
            pallyconObj.errorCode +
            ')'
        );
      } else {
        var errorObj = JSON.parse(pallyconObj.message);
        alert('Error : ' + errorObj.MESSAGE + '(' + errorObj.ERROR + ')');
      }
    }
  } catch (e) {}
}

const ShakaPlayer: PlayerType = function (props: PropType) {
  useEffect(() => {
    shaka.polyfill.installAll();

    (async () => {
      const video = document.querySelector('video');
      if (video && props.source) {
        const player = new shaka.Player(video);

        let playerConfig: any = {
          // abr: {
          //   enabled: !0,
          //   switchInterval: 8,
          //   defaultBandwidthEstimate: 6024523,
          // },
          // streaming: {
          //   bufferingGoal: 45,
          //   bufferBehind: 45,
          // },
        };
        if (props.drm) {
          playerConfig.drm = {
            servers: {
              'com.widevine.alpha': props.drm?.licenseUri,
              // 'https://cwip-shaka-proxy.appspot.com/header_auth',
            },
            // advanced: {
            //   'com.widevine.alpha': {
            //     videoRobustness: '',
            //     audioRobustness: '',
            //   },
            // },
          };

          player
            .getNetworkingEngine()
            ?.registerRequestFilter(function (type, request) {
              // Only add headers to license requests:
              if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
                // request.headers['CWIP-Auth-Header'] = 'VGhpc0lzQVRlc3QK';
                request.headers['pallycon-customdata-v2'] = props.drm!.token; // TODO
              }
            });

          player
            .getNetworkingEngine()
            ?.registerResponseFilter(function (type, response) {
              // Alias some utilities provided by the library.
              if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
                parsingResponse(response);
              }
            });
        }

        player.configure(playerConfig);

        player
          .load(
            props.source
            // 'https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd'
          )
          .then(() => {
            console.log('The video has now been loaded!');
          })
          .catch((e) => console.error(e));
      }
    })();
  }, [props.source]);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      if (props.paused) {
        video.pause();
      } else {
        video.play()?.catch(() => void 0);
      }
    }
  }, [props.paused]);
  useEffect(() => {
    const video = document.querySelector('video');
    if (video && props.currentTime) {
      video.currentTime = props.currentTime;
    }
  }, [props.currentTime]);
  useEffect(() => {
    const video = document.querySelector('video');
    if (video && props.volume) {
      video.volume = props.volume;
    }
  }, [props.volume]);

  return (
    <video
      autoPlay={props.autoPlay}
      onTimeUpdate={(event) => {
        props.onCurrentTimeUpdate?.(
          (event.target as HTMLVideoElement).currentTime
        );
      }}
      onDurationChange={(event) => {
        props.onDurationChange?.((event.target as HTMLVideoElement).duration);
      }}
    ></video>
  );
};

export default ShakaPlayer;
