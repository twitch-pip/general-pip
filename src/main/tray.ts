import { BrowserWindow, Tray, app } from 'electron';
import path from 'path';

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

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
