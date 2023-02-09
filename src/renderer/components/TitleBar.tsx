import { ipcRenderer } from "electron/renderer"
import { useState } from "react";
import styles from '../styles/titlebar.module.scss'

import MinimizeImg from '../../../assets/images/title_minimize.svg'
import MaximizeImg from '../../../assets/images/title_maximize.svg'
import CloseImg from '../../../assets/images/title_close.svg'

function TitleBar() {
  function minimize() {
    window.electron.window.minimize();
  }

  function maximize() {
    window.electron.window.maximize();
  }

  function close() {
    window.electron.window.close();
  }

  return (
    <>
      <div className={styles.window}>
        <div className={styles.window_button_wrapper}>
          <button onClick={() => minimize()} className={styles.window_button}>
            <img src={MinimizeImg} />
          </button>
          <button onClick={() => maximize()} className={styles.window_button}>
            <img src={MaximizeImg} />
          </button>
          <button onClick={() => close()} className={styles.window_button}>
            <img src={CloseImg} />
          </button>
        </div>
      </div>
    </>
  )
}

export default TitleBar;
