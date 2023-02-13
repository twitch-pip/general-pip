import axios from 'axios';
import Base, { VideoWithDRM } from './base';
import { base64Decode } from '../util';
import acorn from 'acorn';
import { simple } from 'acorn-walk';
import * as cheerio from 'cheerio';
import { get } from '../api/linkkf';

export default class Linkkf extends Base {
  static readonly drmType = 'Widevine';

  static get id(): string {
    return 'linkkf';
  }

  static validate(url: string): boolean {
    return LinkkfAPI.validate(url);
  }

  static identifier(url: string): string {
    const [seriesId, episodeId] = LinkkfAPI.getId(url);
    return `${this.id}-${seriesId}-${episodeId}`;
  }

  static async videoUrl(url: string): Promise<string> {
    const response = await linkkf(url).getInfo();
    console.log(response.public_streaming_info.dash_preview_url);
    return '';
  }

  static async videoWithDrm(url: string): Promise<VideoWithDRM> {
    const response = await linkkf(url).getInfo();
    const metadata = JSON.parse(
      base64Decode(response.protected_streaming_info?.widevine_token!)
    );
    console.log(metadata);
    return {
      source: response.protected_streaming_info?.dash_url!,
      drmType: 'Widevine',
      licenseUri: 'https://license.pallycon.com/ri/licenseManager.do',
      metadata: metadata,
      token: response.protected_streaming_info?.widevine_token!,
    };
  }

  static async videoOnlyUrl(url: string): Promise<string> {
    return '';
  }

  static async audioOnlyUrl(url: string): Promise<string> {
    return '';
  }

  static stream(url: string): NodeJS.ReadableStream {
    throw new Error('Not implemented');
  }

  static pipe(url: string, dest: NodeJS.WritableStream): void {
    this.stream(url).pipe(dest);
  }
}
