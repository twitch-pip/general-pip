declare module 'twitch-m3u8' {
  function getAccessToken(id: string, isVod: boolean): Promise<any>;
  function getPlaylist(
    id: string,
    accessToken: any,
    vod: boolean
  ): Promise<any>;
  function parsePlaylist(playlist: string): Promise<any>;
  function getStream(channel: string, raw?: boolean): Promise<any>;
  function getVod(vid: string, raw?: boolean): Promise<any>;
}
