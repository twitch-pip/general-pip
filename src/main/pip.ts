import { BrowserWindow, app, protocol, screen, session } from 'electron';
import createWindow from './window';
import path, { join } from 'path';
import fs from 'fs';
import { URLSearchParams } from 'url';

// app.on('ready', () => {
//   session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//     if (details.url.includes('licenseManager.do'))
//       callback({
//         requestHeaders: {
//           ...details.requestHeaders,
//           origin: 'https://laftel.net',
//           Referer: 'https://laftel.net/',
//         },
//       });
//     else
//       callback({
//         requestHeaders: details.requestHeaders,
//       });
//   });
// });

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    const url = new URL(details.url);
    if (url.hash && new URLSearchParams(url.hash.slice(1)).get('sh') == '1') {
      const headers = new URLSearchParams(url.hash.slice(1));
      headers.delete('sh');

      callback({
        requestHeaders: {
          ...details.requestHeaders,
          ...Object.fromEntries(headers.entries()),
        },
      });
      return;
    }

    // Continue with the request if the host is not "tempfile"
    callback({});
  });
  // protocol.interceptFileProtocol('http', (request, callback) => {
  //   const url = new URL(request.url);
  //   console.log(url);
  //   if (url.host === 'tempfile') {
  //     fs.mkdirSync(path.join(app.getPath('temp'), 'general-pip'), {
  //       recursive: true,
  //     });

  //     callback({
  //       path: path.join(app.getPath('temp'), 'general-pip', url.pathname),
  //     });

  //     return true;
  //   }

  //   callback(request);
  //   // protocol.uninterceptProtocol('http');
  //   return false;
  // });
});

export function createPIP(path: string, url: string): BrowserWindow {
  const control = createWindow(
    {
      width: 640,
      height: 120,
      frame: false,
      hasShadow: false,
      movable: false,
      resizable: false,
      show: false,
    },
    '/control'
  );
  const pip = createWindow(
    {
      parent: control,
      width: 640,
      height: 360,
      frame: false,
      hasShadow: false,
      show: false,
      webPreferences: {
        contextIsolation: true,
        preload: app.isPackaged
          ? join(__dirname, 'preload.js')
          : join(__dirname, '../../.erb/dll/preload.js'),
        webSecurity: false,
      },
    },
    `/pip/${path}`
  );
  pip.setAspectRatio(16 / 9);
  pip.setAlwaysOnTop(true, 'screen-saver');

  function syncControl() {
    const [x, y] = pip.getPosition();
    control.setPosition(x, y + pip.getSize()[1]);
    control.setBounds({ width: pip.getSize()[0], height: 120 });
  }

  pip.on('resize', syncControl);
  pip.on('move', syncControl);
  pip.on('will-move', (event, newBounds) => {
    const display = screen.getDisplayMatching(pip.getBounds());
    const delta =
      Math.min(display.workAreaSize.height, display.workAreaSize.width) / 100;
    const x = newBounds.x;
    const y = newBounds.y;
    const width = pip.getBounds().width;
    const height = pip.getBounds().height;
    const pipXs = [x, x + width];
    const pipYs = [y, y + height];
    const displayXs = [
      display.workArea.x,
      display.workArea.x + display.workArea.width,
    ];
    const displayYs = [
      display.workArea.y,
      display.workArea.y + display.workArea.height,
    ];

    let newX = x;
    let newY = y;

    for (const pipX of pipXs)
      for (const displayX of displayXs)
        if (Math.abs(pipX - displayX) < delta)
          newX = Math.max(0, displayX - width);
    for (const pipY of pipYs)
      for (const displayY of displayYs)
        if (Math.abs(pipY - displayY) < delta)
          newY = Math.max(0, displayY - height);
    pip.setBounds({ x: newX, y: newY });
    syncControl();
  });

  screen.on('display-metrics-changed', () => {
    const display = screen.getDisplayMatching(pip.getBounds());
    pip.setBounds({
      width: display.workAreaSize.width,
      height: display.workAreaSize.height / 2,
    });
    syncControl();
  });

  pip.on('closed', () => {
    if (!control?.isDestroyed()) control.close();
  });

  pip.on('ready-to-show', () => {
    pip.webContents.send('pip.video_url', url);
    pip.show();
  });

  control.on('ready-to-show', () => {
    control.setAlwaysOnTop(false);
    control.show();
  });

  return pip;
}
