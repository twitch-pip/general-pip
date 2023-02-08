import { PIPWindows } from "main/pip";
import Channel from "../channel";
import { BrowserWindow, IpcMainInvokeEvent } from "electron";

export default class Control {
  @Channel("control", "opacity")
  opacity(event: IpcMainInvokeEvent, opacity: number, ...args: any[]) {
    console.log(opacity);
    const window = BrowserWindow.getAllWindows().find((window) => window.webContents.id === event.sender.id);
    window?.getParentWindow()?.setOpacity(opacity);
  }
}
