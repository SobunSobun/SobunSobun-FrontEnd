import Button from 'components/Button/Button'
import Header from 'components/Header/Header'
import styles from './profile.module.scss'

const Profile = () => {
  return (
    <div className={styles.profile}>
      <Header headText='나의소분' leftChild={<Button type='back' />} />
      <div className='contentsInner'>나의소분</div>
    </div>
  )
}

export default Profile
