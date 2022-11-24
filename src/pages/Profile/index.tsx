import { IMAGE_PATH } from 'assets/images'

import Button from 'components/Button'
import Header from 'components/Header'
import styles from './profile.module.scss'

const Profile = () => {
  return (
    <div className={styles.profile}>
      <Header headText='마이페이지' />
      <div className='contentsInner'>
        <div className={styles.top}>
          <div className={styles.image}>
            <img src={IMAGE_PATH.profile} alt='프로필 이미지' />
          </div>
          <p className={styles.greeting}>
            ZEONE님 <br />
            안녕하세요!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
