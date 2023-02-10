import { BrowserWindow, Tray, app } from 'electron';
import path from 'path';
import { getAssetPath } from './util';

export default class TrayBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildTray(): Tray {
    const tray = new Tray(getAssetPath('icon.png'));
    tray.setToolTip('General-PIP');
    tray.on('click', () => {
      this.mainWindow.show();
    });
    return tray;
  }
}
