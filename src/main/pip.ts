import { BrowserWindow, screen } from "electron";
import createWindow from "./window";

export let PIPWindows: Map<string, { pip: BrowserWindow; control: BrowserWindow }> = new Map();

export function createPIP(id: string, url: string) {
  const control = createWindow({
    width: 640,
    height: 120,
    frame: false,
    hasShadow: false,
    movable: false,
    resizable: false,
    show: false,
  }, '/control');
  const pip = createWindow({
    parent: control,
    width: 640,
    height: 360,
    frame: false,
    hasShadow: false,
    alwaysOnTop: true,
    show: false,
  }, '/pip');
  pip.setAspectRatio(16 / 9);

  function syncControl() {
    const [x, y] = pip.getPosition();
    control.setPosition(x, y + pip.getSize()[1]);
    control.setBounds({ width: pip.getSize()[0], height: 120 });
  }

  pip.on('resize', syncControl);
  pip.on('move', syncControl);
  pip.on('move', () => {
    const delta = 10;

    const display = screen.getDisplayMatching(pip.getBounds());
    const pipXs = [pip.getBounds().x, pip.getBounds().x + pip.getBounds().width];
    const pipYs = [pip.getBounds().y, pip.getBounds().y + pip.getBounds().height];
    const displayXs = [display.workArea.x, display.workArea.x + display.workArea.width];
    const displayYs = [display.workArea.y, display.workArea.y + display.workArea.height];
    pip.setBounds({ x: pip.getBounds().x, y: pip.getBounds().y });
    for (const pipX of pipXs)
      for (const displayX of displayXs)
        if (Math.abs(pipX - displayX) < delta)
          pip.setBounds({ x: Math.max(0, displayX - pip.getBounds().width), y: pip.getBounds().y });
    for (const pipY of pipYs)
      for (const displayY of displayYs)
        if (Math.abs(pipY - displayY) < delta)
          pip.setBounds({ x: pip.getBounds().x, y: Math.max(0, displayY - pip.getBounds().height) });
    syncControl();
  });

  screen.on('display-metrics-changed', () => {
    const display = screen.getDisplayMatching(pip.getBounds());
    pip.setBounds({ width: display.workAreaSize.width, height: display.workAreaSize.height / 2 });
    syncControl();
  });

  pip.on("closed", () => {
    if (!control?.isDestroyed())
      control.close();
    PIPWindows.delete(id);
  });

  pip.on('ready-to-show', () => {
    pip.webContents.send('pip.video_url', url);
    pip.webContents.send('pip.id', id);
    pip.show();
  });

  control.on('ready-to-show', () => {
    control.webContents.send('pip.id', id);
    control.setAlwaysOnTop(false);
    control.show();
  });

  PIPWindows.set(id, { pip, control });
}
