/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */

function initialize() {
  global.tray = null;
  global.mainWindow = null;
  global.pipWindows = {};
  global.chattingWindows = {};

  global.mouseIgnored = false;
  global.previousStreamState = {};
}

initialize();

export default {};
