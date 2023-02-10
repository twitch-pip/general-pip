import { useEffect, useState } from 'react';
import close from '../../../assets/images/close.svg';
import styles from '../styles/pip.module.scss';
import DefaultPlayer from '../components/Players/Default';
import { PlayerType } from 'renderer/components/Players/Base';
import HLSPlayer from 'renderer/components/Players/Hls';
import React from 'react';
import CrossProcessExports from 'electron';

const { ipcRenderer, control } = window.electron;

const Player = (url: string): React.ReactElement => {
  if (url.includes('m3u8')) {
    return <HLSPlayer source={url} />;
  } else {
    return <DefaultPlayer source={url} />;
  }
};

interface PropType {
  player?: PlayerType;
}

function Pip(props: PropType) {
  const [url, setUrl] = useState<string>();
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);

  const [player, setPlayer] = useState<React.ReactElement>();

  ipcRenderer.on('pip.video_url', (url) => setUrl(url as string));
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

  useEffect(() => {
    if (url) setPlayer(Player(url));
  }, [url]);

  return (
    <>
      <div className={styles.pip}>
        <img src={close} onClick={window.electron.window.close} alt="닫기" />
      </div>
    </>
  );
}

export default Pip;
