import { useState } from 'react';
import close from '../../../assets/images/close.svg'
import styles from '../styles/pip.module.scss'

const { ipcRenderer } = window.electron;

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

  return (
    <>
      <div className={styles.pip}>
        <img src={close} onClick={() => window.electron.window.close()} alt="닫기" />
        <video src={url} autoPlay={true} />
      </div>
    </>
  )
}

export default Pip;
