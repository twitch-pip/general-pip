import { app } from 'electron';
import Channel from '../channel';

export default class App {
  @Channel('app', 'getVersion')
  static getVersion() {
    return app.getVersion();
  }

  @Channel('app', 'quit')
  static quit() {
    app.quit();
  }
}
