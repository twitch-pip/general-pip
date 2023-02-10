export interface PropType {
  source?: string;
  autoPlay?: boolean;
  paused?: boolean;
  volume?: number;
  currentTime?: number;
  onCurrentTimeUpdate?: (time: number) => any;
  onDurationChange?: (duration: number) => any;
}

export type PlayerType = React.FC<PropType>;
