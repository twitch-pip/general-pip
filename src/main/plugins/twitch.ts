import { WriteStream, createWriteStream } from 'fs';
import Base from './base';
import ytdl from 'ytdl-core';
import { ApiClient } from '@twurple/api';
import { ElectronAuthProvider } from '@twurple/auth-electron';
import twitch from 'twitch-m3u8';

export const client = new ApiClient({
  authProvider: new ElectronAuthProvider({
    clientId: 'f79abi79zcv9e3mhf459mih16p0h5c',
    redirectUri: 'http://localhost/',
  }),
});

export default class Twitch extends Base {
  static override get id() {
    return 'twitch';
  }

  static override validate(url: string) {
    return /https:\/\/www\.twitch\.tv\/[a-zA-Z0-9_]+/.test(url);
  }

  static streamerName(url: string) {
    return url.match(/https:\/\/www\.twitch\.tv\/([a-zA-Z0-9_]+)/)?.[1];
  }

  static override identifier(url: string) {
    return `youtube-${this.streamerName(url)}`;
  }

  static override async videoUrl(url: string) {
    return await twitch
      .getStream(this.streamerName(url)!)
      .then((stream) => stream[1].url);
  }

  static override async videoOnlyUrl(url: string) {
    return '';
  }

  static override async audioOnlyUrl(url: string) {
    return '';
  }

  static override stream(url: string): NodeJS.ReadableStream {
    throw new Error('Not implemented');
  }

  static override pipe(url: string, dest: NodeJS.WritableStream) {
    this.stream(url).pipe(dest);
  }
}
