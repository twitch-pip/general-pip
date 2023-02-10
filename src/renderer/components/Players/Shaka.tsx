import { useEffect } from 'react';
import shaka from 'shaka-player';
import { PlayerType, PropType } from './Base';

function arrayBufferToString(buffer: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint16Array(buffer)));
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

        player.addEventListener('error', (event) => {
          console.error(event);
        });

        player.load(props.source).catch((e) => {
          console.error(e);
        });

        player
          .getNetworkingEngine()
          ?.registerRequestFilter(function (type, request) {
            // Only add headers to license requests:
            if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
              console.log('request :' + request.body);
              request.headers['pallycon-customdata-v2'] = 'WidevineToken'; // TODO
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

        player
          .load(props.source)
          .then(() => {
            console.log('The video has now been loaded!');
          })
          .catch((e) => console.error(e));

        player.configure({
          dmr: {
            servers: {
              'com.widevine.alpha': 'LicenseUri', // TODO
            },
          },
        });
      }
    })();
  }, [props.source]);
  return <video controls autoPlay></video>;
};

export default ShakaPlayer;
