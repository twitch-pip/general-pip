import { useState } from 'react';
import close from '../../../assets/images/close.svg'
import styles from '../styles/pip.module.scss'

const { ipcRenderer, control } = window.electron;

function Pip() {
  const [url, setUrl] = useState<string | undefined>(undefined);

  ipcRenderer.on('pip.video_url', (url) => {
    setUrl(url as string);
  });

  ipcRenderer.on('control.volume', (volume) => {
    const video = document.querySelector('video');
    if (video) {
      video.volume = volume as number;
    }
  });

  ipcRenderer.on('control.play', (state) => {
    const video = document.querySelector('video');
    if (video) {
      if (state) {
        video.play();
      } else {
        video.pause();
      }
    }
  });

  ipcRenderer.on('control.current', (current) => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = (current as number) * video.duration / 100;
    }
  });

  let prevTime = 0;
  function onTimeUpdate() {
    const video = document.querySelector('video');
    if (video) {
      if (video.currentTime - prevTime > 0.5) {
        prevTime = video.currentTime;
        control.setCurrent(video.currentTime / video.duration * 100);
      }
    }
  }

  return (
    <>
      <div className={styles.pip}>
        <img src={close} onClick={() => window.electron.window.close()} alt="닫기" />
        <video src={url} autoPlay={true} onTimeUpdate={onTimeUpdate} />
      </div>
    </>
  )
}

export default Pip;
