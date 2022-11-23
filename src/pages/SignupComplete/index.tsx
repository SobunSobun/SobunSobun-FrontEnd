import { ProfileImage } from 'assets/svgs'
import Button from 'components/Button'
import Header from 'components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
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
      <Header leftChild={<Button type='back' />} headText='반가워요' />
      <div className={styles.inner}>
        <p className={styles.greeting}>{state.nickname}님</p>
        <p className={styles.desc}>이웃과 소분해서 소분소분 함께해요</p>
        <div className={styles.profile}>
          <ProfileImage className={styles.image} />
          {handleRegion()}
        </div>
        <Button
          type='primary'
          text='로그인 하기'
          submit
          onClick={() => {
            navigate('/login')
          }}
        />
      </div>
    </div>
  )
}

export default SignupComplete
