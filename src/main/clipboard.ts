import { clipboard } from 'electron';
import { glob } from 'glob';
import plugins from './plugins';
import { createPIP } from './pip';
import { DRM } from '../@types/drm';

let lastText = clipboard.readText();
setInterval(() => {
  const text = clipboard.readText();
  if (text !== lastText) {
    lastText = text;
    console.log(text);
    decision(text);
  }
}, 1000);

async function decision(text: string) {
  const find = plugins.find((plugin) => plugin.validate(text));
  if (find) {
    if (find.drmType) {
      const videoWithDRM = await find.videoWithDrm(text);
      const drm: DRM = {
        drmType: find.drmType,
        licenseUri: videoWithDRM.licenseUri,
        token: videoWithDRM.token,
      };
      console.log(videoWithDRM);

      const pip = createPIP(find.id, videoWithDRM.source);

      pip.on('ready-to-show', () => {
        console.log('send drm', drm);
        pip.webContents.send('pip.drm', drm);
      });
    } else {
      const pip = createPIP(find.id, await find.videoUrl(text));
    }
  }
}
