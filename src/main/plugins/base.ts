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

  static stream(url: string): ReadableStream {
    throw new Error('Not implemented');
  }

  static pipe(url: string, dest: WritableStream): void {
    this.stream(url).pipeTo(dest);
  }
}
