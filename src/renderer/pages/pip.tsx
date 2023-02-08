import { useState } from 'react';
import close from '../../../assets/images/close.svg'
import styles from '../styles/pip.module.scss'

const { ipcRenderer } = window.electron;

function Pip() {
  const [url, setUrl] = useState<string | undefined>(undefined);

  ipcRenderer.on('pip.video_url', (url) => {
    setUrl(url as string);
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
