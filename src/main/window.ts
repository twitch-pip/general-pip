import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron';
import { resolveHtmlPath } from './util';
import path from 'path';

export default function createWindow(
  options?: BrowserWindowConstructorOptions,
  routePath = '',
): BrowserWindow {
  const window = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
    ...options,
  });

  window.loadURL(resolveHtmlPath('index.html') + `#${routePath}`);

  window.on('ready-to-show', () => {
    window.show();
  });

  return window;
}
