import { BrowserWindow } from "electron";
import createWindow from "./window";

export function createPIP() {
  const pip = createWindow({
    width: 640,
    height: 360,
    frame: false,
    hasShadow: false,
    alwaysOnTop: true,
  }, '/pip');
  const control = createWindow({
    width: 640,
    height: 120,
    frame: false,
    hasShadow: false,
    movable: false,
  }, '/control');
  pip.setAspectRatio(16 / 9);

  function syncControl() {
    const [x, y] = pip.getPosition();
    control.setPosition(x, y + pip.getSize()[1]);
    control.setSize(pip.getSize()[0], 120);
  }

  pip.on('resize', syncControl);
  pip.on('move', syncControl);

  pip.on("closed", () => {
    if (!control?.isDestroyed())
      control.close();
  });
}
