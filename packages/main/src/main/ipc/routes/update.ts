// import { IpcMainInvokeEvent } from 'electron';
import { autoUpdater } from 'electron-updater';
import Channel from '../channel';

export default class Update {
  @Channel('update', 'install')
  static async install(/* event: IpcMainInvokeEvent, ...args: any[] */) {
    autoUpdater.quitAndInstall();
  }
}
