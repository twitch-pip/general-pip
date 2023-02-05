import { app, clipboard } from 'electron';
import { Pattern } from 'youtube';

setInterval(() => {
  const url = clipboard.readText();
  if (url.startsWith('http')) {
    if (Pattern.URL_PATTERN.test(url)) {
      console.log('URL_PATTERN');
    }
  }
}, 1000);
