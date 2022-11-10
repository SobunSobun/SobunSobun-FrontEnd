import { ProfileImage } from 'assets/svgs'
import Button from 'components/Button'
import Header from 'components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './signupComplete.module.scss'

interface RouteState {
  state: {
    nickname: string
  }
}

const SignupComplete = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as RouteState

  return (
    <div className={styles.signupComplete}>
      <div className='contentsInner'>
        <Header leftChild={<Button type='back' />} />
        <p className={styles.greeting}>
          반가워요
          <br />
          <span>{state.nickname}</span>님
        </p>
        <p className={styles.desc}>이웃과 소분해서 소분소분 함께해요</p>
        <div className={styles.profile}>
          <ProfileImage className={styles.image} />
          <p className={styles.name}>서초동</p>
        </div>
        <Button
          basic
          type='primary'
          text='다음'
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
