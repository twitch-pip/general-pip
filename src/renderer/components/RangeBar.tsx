import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/range.module.scss';

type func = (range: number) => any;

interface PropType {
  default: number;
  onRangeChanged: func;
}

function RangeBar(props: PropType) {
  const [range, setRange] = useState(props.default);

  const handleRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(parseInt(e.target.value));
    props.onRangeChanged(parseInt(e.target.value));
  }

  return (
    <>
      <div className={styles.range_wrapper}>
        <div className={styles.range_slide}>
          <div style={{
            left: "0%",
            right: `${100 - range}%`
          }} className={styles.range_slide_inner}></div>
          <input value={range} onChange={e => handleRange(e)} type="range" />
        </div>
      </div>
    </>
  )
}

export default RangeBar;
