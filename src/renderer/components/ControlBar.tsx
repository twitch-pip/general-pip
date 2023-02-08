import styles from '../styles/control.module.scss'
import PlayImg from '../../../assets/images/play.svg'
import PauseImg from '../../../assets/images/pause.svg'
import SoundImg from '../../../assets/images/sound.svg'
import OpacityImg from '../../../assets/images/opacity.svg'
import RangeBar from './RangeBar';
import { useEffect, useState } from 'react';

function ControlBar() {
  const { ipcRenderer, control } = window.electron;

  const [volume, setVolume] = useState(50);
  const [opacity, setOpacity] = useState(100);
  const [play, setPlay] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // sound default value
    // current default value
  })

  useEffect(() => {
    control.setOpacity(opacity / 100);
  }, [opacity]);

  useEffect(() => {
    control.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    control.setPlay(play);
  }, [play]);

  return (
    <>
      <div className={styles.control}>
        <div className={styles.control_wrapper}>
          <RangeBar default={current} onRangeChanged={setCurrent} />
        </div>
        <div className={styles.control_wrapper}>
          <img className={styles.control_play} onClick={() => setPlay(!play)} src={play ? PauseImg : PlayImg} alt="재생" />
          <div className={styles.control_wrapper}>
            <img src={SoundImg} alt="음량" />
            <RangeBar default={volume} onRangeChanged={setVolume} />
          </div>
          <div className={styles.control_wrapper}>
            <img src={OpacityImg} alt="불투명도" />
            <RangeBar default={opacity} onRangeChanged={setOpacity} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ControlBar;
