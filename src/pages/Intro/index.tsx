import Greeting from 'components/Greeting'
import Button from 'components/Button'
import { Link, useNavigate } from 'react-router-dom'
import FloatingElem from 'components/FloatingElem'
import styles from './intro.module.scss'

const Intro = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.intro}>
      <Greeting />
      <FloatingElem offsetBottom={110}>
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
      </FloatingElem>
    </div>
  )
}

export default Intro
