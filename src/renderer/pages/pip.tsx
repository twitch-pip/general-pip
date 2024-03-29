import { useMemo, useState } from 'react';
import close from '../../../assets/images/close.svg';
import styles from '../styles/pip.module.scss';
import DefaultPlayer from '../components/Players/Default';
import { PlayerType } from 'renderer/components/Players/Base';
import { DRM } from '../../@types/drm';

const { ipcRenderer, control } = window.electron;

interface PropType {
  player?: PlayerType;
}

function Pip(props: PropType) {
  const [url, setUrl] = useState<string>();
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const Player = useMemo(() => {
    return props.player ?? DefaultPlayer;
  }, [props.player]);

  const [drm, setDrm] = useState<DRM>();
  const [caption, setCaption] = useState<string[]>();

  ipcRenderer.on('pip.video_url', (url) => setUrl(url as string));
  ipcRenderer.on('pip.drm', (drm) => {
    console.log('drm', drm);
    setDrm(drm as DRM);
  });
  ipcRenderer.on('pip.caption', (caption) => setCaption(caption as string[]));
  ipcRenderer.on('control.volume', (volume) => setVolume(volume as number));
  ipcRenderer.on('control.play', (state) => setPaused(!(state as boolean)));
  ipcRenderer.on('control.current', (current) =>
    setCurrentTime(((current as number) * duration) / 100)
  );

  let prevTime = 0;
  function onTimeUpdate(time: number) {
    if (time - prevTime > 0.5) {
      prevTime = time;
      control.setCurrent((time / duration) * 100);
    }
  }

  return (
    <>
      <div className={styles.pip}>
        <img src={close} onClick={window.electron.window.close} alt="닫기" />
        {
          <Player
            source={url}
            autoPlay={true}
            paused={paused}
            volume={volume}
            currentTime={currentTime}
            drm={drm}
            caption={caption}
            onCurrentTimeUpdate={onTimeUpdate}
            onDurationChange={setDuration}
          />
        }
      </div>
    </>
  );
}

export default Pip;
