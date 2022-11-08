import { Link } from 'react-router-dom'
import Button from 'components/Button'
import Greeting from 'components/Greeting'
import styles from './splash.module.scss'

const Splash = () => {
  return (
    <div className={styles.splash}>
      <Greeting />
      <Button basic type='secondary' text='시작하기' />
      <Link to='/login'>이미 계정이 있나요? 로그인</Link>
    </div>
  )
}

export default Splash
