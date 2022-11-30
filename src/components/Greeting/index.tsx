import { IMAGE_PATH } from 'assets/images'
import styles from './greeting.module.scss'

const Greeting = () => {
  return (
    <div className={styles.greeting}>
      <h1>
        <img src={IMAGE_PATH.logoWhite} alt='소분소분' />
      </h1>
      <p className={styles.desc}>이웃과 함께 장보며 나누는 따뜻한 소분</p>
    </div>
  )
}

export default Greeting
