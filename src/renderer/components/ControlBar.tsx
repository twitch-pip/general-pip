import styles from '../styles/control.module.scss'
import PlayImg from '../../../assets/images/play.svg'
import PauseImg from '../../../assets/images/pause.svg'
import SoundImg from '../../../assets/images/sound.svg'
import OpacityImg from '../../../assets/images/opacity.svg'
import RangeBar from './RangeBar';
import { useEffect, useState } from 'react';

function ControlBar() {
  const [volume, setVolume] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [play, setPlay] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // sound default value
    // current default value
  })

  return (
    <>
      <div className={styles.control}>
        <RangeBar length={256} default={0} onRangeChanged={setCurrent} />
        <div className={styles.control_wrapper}>
          <img className={styles.control_play} onClick={() => setPlay(!play)} src={play ? PauseImg : PlayImg} alt="재생" />
          <div className={styles.control_wrapper}>
            <img src={SoundImg} alt="음량" />
            <RangeBar length={70} default={volume} onRangeChanged={setVolume} />
          </div>
          <div className={styles.control_wrapper}>
            <img src={OpacityImg} alt="불투명도" />
            <RangeBar length={70} default={opacity} onRangeChanged={setOpacity} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ControlBar;
