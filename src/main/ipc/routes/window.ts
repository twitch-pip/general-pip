import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import Channel from '../channel';

export default class Window {
  @Channel('window', 'close')
  close(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.close();
  }

  @Channel('window', 'minimize')
  minimize(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.minimize();
  }

  @Channel('window', 'maximize')
  maximize(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.maximize();
  }

  @Channel('window', 'unmaximize')
  unmaximize(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.unmaximize();
  }

  @Channel('window', 'opacity')
  opacity(event: IpcMainInvokeEvent, opacity: number, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    window.setOpacity(opacity);
  }

  @Channel('window', 'isMaximizable', 'handle')
  isMaximizable(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    return window.isMaximizable();
  }

  @Channel('window', 'isMaximized', 'handle')
  isMaximized(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    return window.isMaximized();
  }

  @Channel('window', 'isMinimizable', 'handle')
  isMinimizable(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    return window.isMinimizable();
  }

  @Channel('window', 'isMinimized', 'handle')
  isMinimized(event: IpcMainInvokeEvent, ...args: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || window.isDestroyed()) return;
    return window.isMinimized();
  }
}
