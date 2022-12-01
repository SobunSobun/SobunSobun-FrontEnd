import { useNavigate, useLocation } from 'react-router-dom'
import Button from 'components/Button'
import FloatingElem from 'components/FloatingElem'
import { IMAGE_PATH } from 'assets/images'
import { cx } from 'styles'
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

  const gifPath = {
    작성: IMAGE_PATH.postCreate,
    수정: IMAGE_PATH.postEdit,
    삭제: IMAGE_PATH.postDeleted,
    마감: IMAGE_PATH.postClosed,
  }[state.type]

  const message = {
    작성: '게시물 작성 완료!',
    수정: '게시물 수정 완료!',
    삭제: '게시물 삭제 완료!',
    마감: '게시물 모집 마감!',
  }[state.type]

  return (
    <div className={styles.uploadComplete}>
      <div className={styles.image}>
        <img src={gifPath} className={cx({ [styles.widthSmall]: state.type === '마감' })} alt='' />
      </div>
      <p className={styles.message}>{message}</p>
      <FloatingElem offsetBottom={45}>
        <Button type='primary' text='확인' onClick={handleMoveToHome} />
      </FloatingElem>
    </div>
  )
}

export default UploadComplete
