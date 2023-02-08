import close from '../../../assets/images/close.svg'
import styles from '../styles/pip.module.scss'

function Pip() {
  return (
    <>
      <div className={styles.pip}>
        <img src={close} onClick={() => window.electron.window.close()} alt="닫기" />
        <video />
      </div>
    </>
  )
}

export default Pip;
