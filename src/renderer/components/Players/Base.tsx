import { DRM } from '../../../@types/drm';

export interface PropType {
  source?: string;
  autoPlay?: boolean;
  paused?: boolean;
  volume?: number;
  currentTime?: number;

  drm?: DRM;
  caption?: string[];

  onCurrentTimeUpdate?: (time: number) => any;
  onDurationChange?: (duration: number) => any;
}

export type PlayerType = React.FC<PropType>;
