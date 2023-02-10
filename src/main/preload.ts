// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type pingChannel = 'ipc-example';
export type appChannel = 'app.getVersion' | 'app.quit' | 'app.platform';
export type windowChannel =
  | 'window.close'
  | 'window.minimize'
  | 'window.maximize'
  | 'window.unmaximize'
  | 'window.opacity'
  | 'window.hide'
  | 'window.show'
  | 'window.isMaximizable'
  | 'window.isMaximized'
  | 'window.isMinimizable'
  | 'window.isMinimized';
export type pipChannel = 'pip.create' | 'pip.video_url' | 'pip.id' | 'pip.drm';
export type controlChannel =
  | 'control.opacity'
  | 'control.volume'
  | 'control.current'
  | 'control.play';

export type Channels =
  | pingChannel
  | appChannel
  | windowChannel
  | pipChannel
  | controlChannel;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  app: {
    getVersion() {
      return ipcRenderer.invoke('app.getVersion');
    },
    quit() {
      ipcRenderer.send('app.quit');
    },
    platform() {
      return ipcRenderer.invoke('app.platform');
    },
  },
  window: {
    close() {
      ipcRenderer.send('window.close');
    },
    minimize() {
      ipcRenderer.send('window.minimize');
    },
    maximize() {
      ipcRenderer.send('window.maximize');
    },
    unmaximize() {
      ipcRenderer.send('window.unmaximize');
    },
    opacity(opacity: number) {
      ipcRenderer.send('window.opacity', opacity);
    },
    hide() {
      ipcRenderer.send('window.hide');
    },
    show() {
      ipcRenderer.send('window.show');
    },
    isMaximizable() {
      return ipcRenderer.invoke('window.isMaximizable');
    },
    isMaximized() {
      return ipcRenderer.invoke('window.isMaximized');
    },
    isMinimizable() {
      return ipcRenderer.invoke('window.isMinimizable');
    },
    isMinimized() {
      return ipcRenderer.invoke('window.isMinimized');
    },
  },
  pip: {
    create() {
      ipcRenderer.send('pip.create');
    },
    onVideoUrlUpdate(func: (url: string) => void) {
      const subscription = (_event: IpcRendererEvent, url: string) => func(url);
      ipcRenderer.on('pip.video_url', subscription);

      return () => {
        ipcRenderer.removeListener('pip.video_url', subscription);
      };
    },
    onIdUpdate(func: (id: string) => void) {
      const subscription = (_event: IpcRendererEvent, id: string) => func(id);
      ipcRenderer.on('pip.id', subscription);

      return () => {
        ipcRenderer.removeListener('pip.id', subscription);
      };
    },
  },
  control: {
    setOpacity(opacity: number) {
      ipcRenderer.send('control.opacity', opacity);
    },
    setVolume(volume: number) {
      ipcRenderer.send('control.volume', volume);
    },
    setCurrent(current: number) {
      ipcRenderer.send('control.current', current);
    },
    setPlay(state: boolean) {
      ipcRenderer.send('control.play', state);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
