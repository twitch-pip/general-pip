import TitleBar from 'renderer/components/TitleBar';
import styles from '../styles/index.module.scss'

import twitchImg from '../../../assets/logos/twitch.svg'
import youtubeImg from '../../../assets/logos/youtube.svg'
import laftelImg from '../../../assets/logos/laftel.svg'
import { Link } from 'react-router-dom';

function $(...classes: string[]) {
  return classes.join(" ");
}

function Index() {
  return (
    <>
      <TitleBar />
      <div className={styles.index}>
        <div className={styles.index_wrapper}>
          <div className={styles.index_item_wrapper}>
            <button className={$(styles.index_item, styles.twitch)}>
              <img src={twitchImg} />
            </button>
            <p>트위치</p>
          </div>
          <div className={styles.index_item_wrapper}>
            <button className={$(styles.index_item, styles.youtube)}>
              <img src={youtubeImg} />
            </button>
            <p>유튜브</p>
          </div>
          <div className={styles.index_item_wrapper}>
            <button className={$(styles.index_item, styles.laftel)}>
              <img src={laftelImg} />
            </button>
            <p>라프텔</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index;
