import React, { useState } from 'react'
import Button from 'components/Button'
import { TwoButtonModal } from 'components/Modal'
import useModal from 'hooks/useModal'
import styles from './detailContent.module.scss'

const DetailContent = () => {
  const [isJoin, setIsJoin] = useState<boolean>(false)
  const { isOpen, onClose, setIsOpen } = useModal()

  return (
    <div className={styles.detailContent}>
      <span className={styles.detailTime}>9시간 전</span>
      <div className={styles.detailNickname}>
        <span className={styles.profile} />
        <h3 className={styles.nickname}>ZEONE</h3>
      </div>
      <div className={styles.detailList}>
        <ul>
          <li>서초 할인마트</li>
          <li>2022.11.04 3시</li>
          <li>1/4</li>
        </ul>
      </div>
      <div className={styles.detailText}>
        오늘 카레 먹을 예정인데 양파가 부족하네요 저는 한개만 필요한데 같이 사실 분 참여하기 눌러주세요. 시간, 위치 조율
        댓글로 가능합니다
      </div>
      <div className={styles.detailBtn}>
        <Button basic type={isJoin ? 'primary' : 'negative'} text='참여하기' onClick={() => setIsOpen(true)} />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='참여하시겠습니까?'
        yesCallBack={() => {
          setIsJoin(true)
          onClose()
        }}
      />
    </div>
  )
}

export default DetailContent
