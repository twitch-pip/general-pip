import { useEffect } from 'react';
import { PlayerType } from './Base';

interface PropType {
  source?: string;
  autoPlay?: boolean;
  paused?: boolean;
  volume?: number;
  currentTime?: number;
  onCurrentTimeUpdate?: (time: number) => any;
  onDurationChange?: (duration: number) => any;
}

const DefaultPlayer: PlayerType = function (props: PropType) {
  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      if (props.paused) {
        video.pause();
      } else {
        video.play()?.catch(() => void 0);
      }
    }
  }, [props.paused]);
  useEffect(() => {
    const video = document.querySelector('video');
    if (video && props.currentTime) {
      video.currentTime = props.currentTime;
    }
  }, [props.currentTime]);
  useEffect(() => {
    const video = document.querySelector('video');
    if (video && props.volume) {
      video.volume = props.volume;
    }
  }, [props.volume]);

  return (
    <video
      src={props.source}
      autoPlay={props.autoPlay}
      onTimeUpdate={(event) => {
        props.onCurrentTimeUpdate?.(
          (event.target as HTMLVideoElement).currentTime
        );
      }}
      onDurationChange={(event) => {
        props.onDurationChange?.((event.target as HTMLVideoElement).duration);
      }}
    />
  );
};

export default DefaultPlayer;
