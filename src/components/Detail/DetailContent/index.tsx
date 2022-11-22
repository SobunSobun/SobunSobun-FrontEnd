import React, { useEffect, useState } from 'react'
import Button from 'components/Button'
import { TwoButtonModal } from 'components/Modal'
import useModal from 'hooks/useModal'
import { LikeIcon, LikeOnIcon, LocationIcon, PeopleIcon, TimeIcon } from 'assets/svgs'
import styles from './detailContent.module.scss'

const DetailContent = () => {
  const [isJoin, setIsJoin] = useState<boolean>(false)
  const [isLike, setIsLike] = useState<boolean>(false)
  const { isOpen, onClose, setIsOpen } = useModal()

  const likeToggle = () => {
    setIsLike(!isLike)
  }

  const joinHandler = () => {
    if (isJoin) {
      setIsJoin(true)
    } else {
      setIsJoin(false)
    }
    setIsJoin(!isJoin)
    onClose()
  }

  return (
    <div className={styles.detailContent}>
      <div className={styles.like} onClick={likeToggle} role='presentation'>
        {isLike ? <LikeOnIcon /> : <LikeIcon />}
      </div>
      <div className={styles.detailNickname}>
        <span className={styles.profile} />
        <span className={styles.nickname}>ZEONE</span>
      </div>
      <div className={styles.detailTitle}>
        <h3>같이 양파 살 사람 구해요</h3>
      </div>
      <div className={styles.detailText}>
        <p>
          오늘 카레 먹을 예정인데 양파가 부족하네요 저는 한개만 필요한데 같이 사실 분 참여하기 눌러주세요. 시간, 위치
          조율 댓글로 가능합니다
        </p>
      </div>
      <div className={styles.detailList}>
        <ul>
          <li className={styles.location}>
            <LocationIcon />
            서초 할인마트
          </li>
          <li className={styles.time}>
            <TimeIcon />
            2022.11.04 3시
          </li>
          <li className={styles.people}>
            <PeopleIcon />
            1/4
          </li>
          <li>9시간 전</li>
        </ul>
      </div>
      <div className={styles.detailBtn}>
        <Button
          type={isJoin ? 'primary' : 'negative'}
          text={isJoin ? '참여완료' : '참여하기'}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message={isJoin ? '참여를 취소하시겠습니까?' : '참여하시겠습니까?'}
        yesCallBack={joinHandler}
      />
    </div>
  )
}

export default DetailContent
