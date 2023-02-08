import { WriteStream, createWriteStream } from "fs";
import Base from "./base";
import ytdl from "ytdl-core";

export default class Youtube extends Base {
  static override get id() {
    return 'youtube';
  }

  static override validate(url: string) {
    return ytdl.validateURL(url);
  }

  static override identifier(url: string) {
    return `youtube-${ytdl.getVideoID(url)}`;
  }

  static override async videoUrl(url: string) {
    return ytdl.chooseFormat((await ytdl.getInfo(url)).formats, { quality: 'highest', filter: 'audioandvideo' }).url;
  }

  static override async videoOnlyUrl(url: string) {
    return ytdl.chooseFormat((await ytdl.getInfo(url)).formats, { quality: 'highestvideo', filter: 'videoonly' }).url;
  }

  static override async audioOnlyUrl(url: string) {
    return ytdl.chooseFormat((await ytdl.getInfo(url)).formats, { quality: 'highestaudio', filter: 'audioonly' }).url;
  }

  static override stream(url: string) {
    return ytdl(url);
  }

  static override pipe(url: string, dest: NodeJS.WritableStream) {
    ytdl(url).pipe(dest);
  }
}
