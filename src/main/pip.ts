import { BrowserWindow } from "electron";
import createWindow from "./window";

export function createPIP() {
  const pip = createWindow({
    width: 640,
    height: 360,
    frame: false,
  });
  const control = createWindow({
    width: 640,
    height: 120,
    frame: false,
  });
  pip.setAspectRatio(16 / 9);

  function syncControl() {
    const [x, y] = pip.getPosition();
    control.setPosition(x, y + pip.getSize()[1]);
    control.setSize(pip.getSize()[0], 120);
  }

  pip.on('resize', syncControl);
  pip.on('move', syncControl);

  pip.on("closed", () => {
    control?.close();
  });

  control.on("closed", () => {
    pip?.close();
  });

  console.log("pip", pip);
  console.log("control", control);
}
