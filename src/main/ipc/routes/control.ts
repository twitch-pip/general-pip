import { PIPWindows } from "main/pip";
import Channel from "../channel";
import { BrowserWindow, IpcMainInvokeEvent } from "electron";

export default class Control {
  @Channel("control", "opacity")
  opacity(event: IpcMainInvokeEvent, opacity: number, ...args: any[]) {
    const window = BrowserWindow.getAllWindows().find((window) => window.webContents.id === event.sender.id);
    window?.getChildWindows()?.[0]?.setOpacity(opacity);
  }

  @Channel("control", "volume")
  volume(event: IpcMainInvokeEvent, volume: number, ...args: any[]) {
    const window = BrowserWindow.getAllWindows().find((window) => window.webContents.id === event.sender.id);
    window?.getChildWindows()?.[0]?.webContents.send('control.volume', volume);
  }

  @Channel("control", "current")
  current(event: IpcMainInvokeEvent, current: number, ...args: any[]) {
    const window = BrowserWindow.getAllWindows().find((window) => window.webContents.id === event.sender.id);
    window?.getParentWindow()?.webContents.send('control.current', current);
    window?.getChildWindows()?.[0]?.webContents.send('control.current', current);
  }

  @Channel("control", "play")
  play(event: IpcMainInvokeEvent, state: boolean, ...args: any[]) {
    const window = BrowserWindow.getAllWindows().find((window) => window.webContents.id === event.sender.id);
    window?.getChildWindows()?.[0]?.webContents.send('control.play', state);
  }
}
