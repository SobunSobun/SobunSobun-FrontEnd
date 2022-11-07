import { LogoImage } from 'assets/svgs'
import styles from './greeting.module.scss'

const Greeting = () => {
  return (
    <div className={styles.greeting}>
      <h1>
        <LogoImage className={styles.logo} />
      </h1>
      <p className={styles.desc}>이웃과 소분해서 소분소분 함께해요</p>
    </div>
  )
}

export default Greeting
