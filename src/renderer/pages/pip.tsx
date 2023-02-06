import close from '../../../assets/images/close.svg'
import styles from '../styles/pip.module.scss'

function Pip() {
  return (
    <>
      <div className={styles.pip}>
        <img src={close} alt="닫기" />
      </div>
    </>
  )
}

export default Pip;
