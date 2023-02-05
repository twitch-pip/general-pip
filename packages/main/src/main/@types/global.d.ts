/* eslint-disable */
import { BrowserWindow, Tray } from 'electron';

declare global {
  var tray: Tray | null;
  var mainWindow: BrowserWindow | null;
  var pipWindows: { [key: string]: BrowserWindow };
  var chattingWindows: { [key: string]: BrowserWindow };

  var mouseIgnored: boolean;
  var previousStreamState: { [key: string]: boolean };
}
