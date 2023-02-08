import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/range.module.scss';

type func = (range: number) => any;

interface PropType {
  value: number;
  onRangeChanged: func;
  max?: number;
}

function RangeBar(props: PropType) {
  const [range, setRange] = useState(props.value);

  useEffect(() => {
    setRange(props.value);
  }, [props.value]);

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
            right: `${((props.max ?? 100) - range) / (props.max ?? 100) * 100}%`
          }} className={styles.range_slide_inner}></div>
          <input value={range} max={props.max} onChange={e => handleRange(e)} type="range" />
        </div>
      </div>
    </>
  )
}

export default RangeBar;
