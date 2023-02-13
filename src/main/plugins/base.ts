import { DRMType } from '../../@types/drm';

export interface VideoWithDRM {
  source: string;
  drmType: string;
  licenseUri: string;
  metadata: any;
  token: string;
}

export interface VideoWithCaption {
  source: string;
  caption: string;
}

export default class Base {
  static readonly drmType: DRMType | undefined = undefined;
  static readonly hasCaption: boolean = false;

  static get id(): string {
    throw new Error('Not implemented');
  }

  static validate(url: string): boolean {
    throw new Error('Not implemented');
  }

  static identifier(url: string): string {
    throw new Error('Not implemented');
  }

  static async videoUrl(url: string): Promise<string> {
    throw new Error('Not implemented');
  }

  static async videoWithDrm(url: string): Promise<VideoWithDRM> {
    throw new Error('Not implemented');
  }

  static async videoWithCaption(url: string): Promise<VideoWithCaption> {
    throw new Error('Not implemented');
  }

  static async videoOnlyUrl(url: string): Promise<string> {
    throw new Error('Not implemented');
  }

  static async audioOnlyUrl(url: string): Promise<string> {
    throw new Error('Not implemented');
  }

  static stream(url: string): NodeJS.ReadableStream {
    throw new Error('Not implemented');
  }

  static pipe(url: string, dest: NodeJS.WritableStream): void {
    this.stream(url).pipe(dest);
  }
}
