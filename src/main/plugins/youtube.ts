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
    return ytdl.getVideoID(url);
  }

  static override stream(url: string) {
    return new ReadableStream();
  }

  static override pipe(url: string, dest: WriteStream) {
    ytdl(url).pipe(dest);
  }
}
