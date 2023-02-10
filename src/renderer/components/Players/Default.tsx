import { useEffect } from 'react';
import { PlayerType, PropType } from './Base';

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
