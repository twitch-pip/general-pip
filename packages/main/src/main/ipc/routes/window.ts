import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import Channel from '../channel';

export default class Window {
  @Channel('window', 'close')
  static close(event: IpcMainInvokeEvent /* , ...args: any[] */) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.close();
  }

  @Channel('window', 'minimize')
  static minimize(event: IpcMainInvokeEvent /* , ...args: any[] */) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.minimize();
  }

  @Channel('window', 'maximize')
  static maximize(event: IpcMainInvokeEvent /* , ...args: any[] */) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.maximize();
  }
}
