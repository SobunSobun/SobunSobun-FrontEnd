import { Link, useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Greeting from 'components/Greeting'
import styles from './splash.module.scss'

const Splash = () => {
  const navigate = useNavigate()
  const onMoveToSignUp = () => {
    navigate('/local')
  }
  return (
    <div className={styles.splash}>
      <div className='contentsInner'>
        <Greeting />
        <div className={styles.buttonWrap}>
          <Button type='secondary' text='시작하기' onClick={onMoveToSignUp} />
          <Link to='/login' className={styles.loginButton}>
            이미 계정이 있나요? 로그인
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Splash
