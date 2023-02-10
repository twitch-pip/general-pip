import axios from 'axios';
import Base from './base';

function laftel(url: string) {
  return new LaftelAPI(url);
}

export interface LaftelEpisode {
  is_cartoon_network: boolean;
  playback_info: PlaybackInfo;
  products_info: ProductsInfo;
  protected_streaming_info?: ProtectedStreamingInfo;
  public_streaming_info: PublicStreamingInfo;
  play_log_id?: any;
}

export interface PlaybackInfo {
  op_start: number;
  op_end: number;
  ed_start: number;
  ed_end: number;
  episode_id: number;
  episode_num: string;
  action_time: number;
  progressbar?: number;
}

export interface ProductsInfo {
  point: number;
  products: any[];
}

export interface ProtectedStreamingInfo {
  content_id: string;
  access_type: string;
  widevine_token: string;
  playready_token: string;
  fairplay_token: string;
  dash_url: string;
  hls_url: string;
  subtitle_url?: any;
}

export interface PublicStreamingInfo {
  dash_preview_url: string;
  hls_preview_url: string;
  thumbnail: string;
  subtitle_preview_url?: any;
}

export class LaftelAPI {
  private readonly url: string;
  private readonly seriesId: string;
  private readonly episodeId: string;
  private token?: string;

  constructor(url: string) {
    this.url = url;
    if (!LaftelAPI.validate(url)) {
      throw new Error('Invalid url');
    }
    [this.seriesId, this.episodeId] = LaftelAPI.getId(url);
  }

  static validate(url: string): boolean {
    return /^https?:\/\/(?:www.)?laftel\.net\/player\/(\d+)\/(\d+)/.test(url);
  }

  static getId(url: string) {
    // url pattern : https://laftel.net/player/41180/57875
    const id = url.match(
      /^https?:\/\/(?:www.)?laftel\.net\/player\/(\d+)\/(\d+)/
    );
    if (id) {
      const seriesId = id[1];
      const episodeId = id[2];
      return [seriesId, episodeId];
    }
    return ['', ''];
  }

  async login() {}

  async getInfo(): Promise<LaftelEpisode> {
    const response = await axios
      .get(
        `https://laftel.net/api/episodes/v2/${this.episodeId}/video/?device=Web`,
        {
          headers: {
            Authorization: this.token ? `Token ${this.token}` : undefined,
            laftel: 'TeJava',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
          },
        }
      )
      .then((res) => res.data);
    return response;
  }
}

export default class Laftel extends Base {
  static get id(): string {
    return 'laftel';
  }

  static validate(url: string): boolean {
    return LaftelAPI.validate(url);
  }

  static identifier(url: string): string {
    const [seriesId, episodeId] = LaftelAPI.getId(url);
    return `${this.id}-${seriesId}-${episodeId}`;
  }

  static async videoUrl(url: string): Promise<string> {
    const response = await laftel(url).getInfo();
    console.log(response.public_streaming_info.dash_preview_url);
    return '';
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
