import { BrowserWindow, app } from 'electron';
import pie from 'puppeteer-in-electron';
import puppeteer from 'puppeteer-core';
import cheerio from 'cheerio';
import acorn from 'acorn';
import * as walk from 'acorn-walk';
import { CallExpression, Identifier, Literal } from 'estree';
import axios from 'axios';

async function getVideos(url: string) {
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow({
    // show: false,
    webPreferences: {
      sandbox: true,
    },
  });

  await window.loadURL(url);

  const page = await pie.getPage(browser, window);

  await page.waitForFunction(() =>
    [...document.querySelectorAll('script')].some((e) =>
      e.innerHTML.includes('player_post')
    )
  );

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

  return videos;
}

function linkkf(url: string) {
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

  async getInfo(): Promise<any> {
    const videos = await getVideos(this.url);
    const data = await response.json();
    return data;
  }
}
