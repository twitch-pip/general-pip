import { clipboard } from "electron";
import { glob } from "glob";
import plugins from "./plugins";
import { createPIP } from "./pip";

let lastText = clipboard.readText();
setInterval(() => {
  const text = clipboard.readText();
  if (text !== lastText) {
    lastText = text;
    console.log(text);
    alert(text);
    decision(text);
  }
}, 1000);

async function decision(text: string) {
  const find = plugins.find((plugin) => plugin.validate(text));
  if (find) {
    createPIP(find.identifier(text), await find.videoUrl(text));
  }
}
