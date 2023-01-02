import { useLocation, useNavigate } from 'react-router-dom'

import { Header, Button } from 'components'

import FloatingElem from 'components/FloatingElem'
import { IMAGE_PATH } from 'assets/images'
import styles from './signupComplete.module.scss'

interface RouteState {
  state: {
    nickname: string
    address_name: string
  }
}

const SignupComplete = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as RouteState

  const handleRegion = () => {
    if (state.address_name) {
      const regionArray = state.address_name.split(' ')
      return <p className={styles.name}>{regionArray[regionArray.length - 1]}</p>
    }
    return ''
  }

  return (
    <div className={styles.signupComplete}>
      <Header largeText headText='반가워요' />
      <div className={styles.inner}>
        <p className={styles.greeting}>{state.nickname}님</p>
        <p className={styles.desc}>따뜻한 소분 이웃과 함께해요</p>
        <div className={styles.profile}>
          <img src={IMAGE_PATH.profile} className={styles.image} alt='' />
          {handleRegion()}
        </div>
        <FloatingElem offsetBottom={43}>
          <Button
            type='primary'
            text='로그인 하기'
            submit
            onClick={() => {
              navigate('/login')
            }}
          />
        </FloatingElem>
      </div>
    </div>
  )
}

export default SignupComplete
