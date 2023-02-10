export type DRMType = 'FairPlay' | 'Widevine' | 'PlayReady';

export interface DRM {
  drmType: DRMType;
  licenseUri: string;
  token: string;
}
