import Channel from '../channel';

export default class PIP {
  @Channel('pip', 'toggleMouse')
  static toggleMouse() {
    global.mouseIgnored = !global.mouseIgnored;
    Object.values(global.pipWindows).forEach((win) => {
      if (!win.isDestroyed()) win.setIgnoreMouseEvents(global.mouseIgnored);
    });
    return global.mouseIgnored;
  }
}
