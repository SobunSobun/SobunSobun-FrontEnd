import { Link, useNavigate } from 'react-router-dom'
import { Greeting, Button } from 'components'
import styles from './intro.module.scss'

const Intro = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.intro}>
      <Greeting />
      <div className={styles.buttonWrap}>
        <Button
          type='white'
          text='시작하기'
          onClick={() => {
            navigate('/local')
          }}
        />
        <Link to='/login' className={styles.loginButton}>
          이미 계정이 있나요?
          <span className={styles.bold}> 로그인하기</span>
        </Link>
      </div>
    </div>
  )
}

export default Intro
