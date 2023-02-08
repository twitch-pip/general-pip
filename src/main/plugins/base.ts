export default class Base {
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
