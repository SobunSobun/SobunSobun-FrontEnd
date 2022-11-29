import { useNavigate, useLocation } from 'react-router-dom'
import Button from 'components/Button'
import { IMAGE_PATH } from 'assets/images'
import FloatingElem from 'components/FloatingElem'
import styles from './uploadComplete.module.scss'

interface RouteState {
  state: {
    type: string
  }
}

const UploadComplete = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as RouteState
  const handleMoveToHome = () => {
    navigate('/home')
  }
  return (
    <div className={styles.uploadComplete}>
      <div className={styles.image}>
        <img src={IMAGE_PATH.basket} alt='장바구니 이미지' />
      </div>
      <p className={styles.message}>
        소분게시물 {state.type}이
        <br /> 완료 되었어요!
      </p>
      <div className={styles.buttonWrap}>
        <Button type='primary' text='확인' onClick={handleMoveToHome} />
      </div>
      <div className='contentsInner'>{/* <FloatingElem offsetBottom={45}></FloatingElem> */}</div>
    </div>
  )
}

export default UploadComplete
