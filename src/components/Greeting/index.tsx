import { LogoImage } from 'assets/svgs'
import styles from './greeting.module.scss'

const Greeting = () => {
  return (
    <div className={styles.greeting}>
      <h1>
        <LogoImage className={styles.logo} />
      </h1>
      <p className={styles.desc}>따뜻한 소분 이웃과 함께해요</p>
    </div>
  )
}

export default Greeting
