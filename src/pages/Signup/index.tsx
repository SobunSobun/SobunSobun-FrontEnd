import Button from 'components/Button'
import Header from 'components/Header'
// import { useLocation } from 'react-router-dom'
import styles from './signup.module.scss'

const Signup = () => {
  // const { state } = useLocation()
  // const locationState = (state as { myRegion: string }).myRegion
  // console.log('test: ', locationState)
  return (
    <div className={styles.signup}>
      <Header headText='회원가입' leftChild={<Button type='back' />} />
      <div className='contentsInner'>내용</div>
    </div>
  )
}

export default Signup
