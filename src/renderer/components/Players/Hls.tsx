import Hls from 'hls.js';
import { useEffect } from 'react';
import { PlayerType, PropType } from './Base';

const HLSPlayer: PlayerType = function (props: PropType) {
  useEffect(() => {
    const video = document.querySelector('video');
    if (video && props.source) {
      const hls = new Hls();
      hls.loadSource(props.source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (props.autoPlay) video.play();
      });
    }
  }, [props.source]);
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

export default HLSPlayer;
