import { BrowserWindow } from "electron";
import createWindow from "./window";

export function createPIP() {
  const pip = createWindow(undefined, "index.html/pip");
  const control = createWindow(undefined, "index.html/control");

  pip.on("closed", () => {
    control?.close();
  });

  control.on("closed", () => {
    pip?.close();
  });

  console.log("pip", pip);
  console.log("control", control);
}
