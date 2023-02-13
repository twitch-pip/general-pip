import { BrowserWindow, app } from 'electron';
import pie from 'puppeteer-in-electron';
import puppeteer from 'puppeteer-core';
import cheerio from 'cheerio';
import acorn from 'acorn';
import * as walk from 'acorn-walk';
import { CallExpression, Identifier, Literal } from 'estree';
import axios from 'axios';
import path from 'path';
import * as uuid from 'uuid';
import fs from 'fs';
import { VideoWithCaption } from 'main/plugins/base';

export async function getVideo(url: string) {
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      sandbox: true,
    },
  });

  await window.loadURL(url);

  const page = await pie.getPage(browser, window);

  const html = await page.evaluate(() =>
    [...document.querySelectorAll('script')]
      .filter((e) => e.innerHTML.includes('player_post'))
      .map((e) => e.innerHTML)
  );

  if (!html[0]) throw new Error('No player_post found');

  const videos: string[] = [];
  walk.simple(
    acorn.parse(html[0], {
      ecmaVersion: 'latest',
    }),
    {
      CallExpression(node) {
        if (node.type === 'CallExpression') {
          const exp = node as unknown as CallExpression;
          const callee = exp.callee as unknown as Identifier;
          if (callee.name === 'player_post') {
            const val = (exp.arguments[0] as Literal).value as string;
            if (!videos.includes(val)) videos.push(val);
          }
        }
      },
    }
  );

  const original = videos[1];

  const client = axios.create({
    baseURL: new URL(original).origin,
    headers: {
      referer: 'https://linkkf.app/',
    },
  });

  const response = await client
    .get(original, {
      headers: {
        referer: 'https://linkkf.app/',
      },
    })
    .then((res) => res.data);

  const $ = cheerio.load(response);
  const source = $('source').attr('src');
  const captionUrl = $('track').attr('src') || '';

  const captions = await client.get(captionUrl).then((res) => res.data);
  const captionName = `${uuid.v4()}.vtt`;
  const captionLoc = path.join(app.getPath('temp'), 'general-pip', captionName);

  fs.mkdirSync(path.dirname(captionLoc), { recursive: true });
  fs.writeFileSync(captionLoc, captions, 'utf8');

  return {
    video: source,
    caption: `${
      new URL(original).origin
    }${captionUrl}#sh=1&referer=https://linkkf.app/`, // `http://localhost:1212/${captionName}#tempfile`,
  };
}

export function linkkf(url: string) {
  return new LinkkfAPI(url);
}

export class LinkkfAPI {
  private readonly url: string;
  private readonly seriesId: string;
  private readonly episodeId: string;

  static readonly pattern =
    /^https?:\/\/(?:www.)?linkkf\.app\/player\/v(\d+)-sub-(\d+)/;

  constructor(url: string) {
    this.url = url;
    if (!LinkkfAPI.validate(url)) {
      throw new Error('Invalid url');
    }
    [this.seriesId, this.episodeId] = LinkkfAPI.getId(url);
  }

  static validate(url: string): boolean {
    return LinkkfAPI.pattern.test(url);
  }

  static getId(url: string) {
    // url pattern : https://linkkf.app/player/v355899-sub-17/
    const id = url.match(LinkkfAPI.pattern);
    if (id) {
      const seriesId = id[1];
      const episodeId = id[2];
      return [seriesId, episodeId];
    }
    return ['', ''];
  }

  async login() {}

  async getInfo(): Promise<VideoWithCaption> {
    const video = await getVideo(this.url);
    return {
      source: video.video ?? '',
      caption: video.caption ?? '',
    };
  }
}
