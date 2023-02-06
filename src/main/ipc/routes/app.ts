import { app } from 'electron';
import Channel from '../channel';

export default class App {
  @Channel('app', 'getVersion', 'handle')
  getVersion() {
    return app.getVersion();
  }

  @Channel('app', 'quit')
  quit() {
    app.quit();
  }
}
