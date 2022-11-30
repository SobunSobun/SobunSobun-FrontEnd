import { useEffect } from 'react'
import Greeting from 'components/Greeting'
import { IMAGE_PATH } from 'assets/images'
import { useNavigate } from 'react-router-dom'
import styles from './splash.module.scss'

const Splash = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/intro')
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  })
  return (
    <div className={styles.splash}>
      <div className={styles.image}>
        <img src={IMAGE_PATH.splash} alt='소분소분 스플래쉬 이미지' />
      </div>
      <Greeting />
    </div>
  )
}

export default Splash
