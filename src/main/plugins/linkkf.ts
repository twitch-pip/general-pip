import axios from 'axios';
import Base, { VideoWithCaption, VideoWithDRM } from './base';
import { base64Decode } from '../util';
import acorn from 'acorn';
import { simple } from 'acorn-walk';
import * as cheerio from 'cheerio';
import { LinkkfAPI, linkkf } from '../api/linkkf';
export default class Linkkf extends Base {
  static readonly hasCaption: boolean = true;

  static override get id(): string {
    return 'linkkf';
  }

  static override validate(url: string): boolean {
    return LinkkfAPI.validate(url);
  }

  static override identifier(url: string): string {
    const [seriesId, episodeId] = LinkkfAPI.getId(url);
    return `${this.id}-${seriesId}-${episodeId}`;
  }

  static override async videoUrl(url: string): Promise<string> {
    const response = await linkkf(url).getInfo();
    return response.source;
  }

  static override async videoWithCaption(
    url: string
  ): Promise<VideoWithCaption> {
    const response = await linkkf(url).getInfo();
    console.log(response);
    return response;
  }
}
