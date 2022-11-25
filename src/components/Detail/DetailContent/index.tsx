import React, { useState } from 'react'
import Button from 'components/Button'
import { TwoButtonModal } from 'components/Modal'
import useModal from 'hooks/useModal'
import { LikeIcon, LikeOnIcon, LocationIcon, PeopleIcon, TimeIcon } from 'assets/svgs'
import { datailData } from 'types'

import styles from './detailContent.module.scss'

interface Props {
  data?: datailData
}

const DetailContent = ({ data }: Props) => {
  const [isJoin, setIsJoin] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const { isOpen, onClose, setIsOpen } = useModal()

  const likeToggle = () => {
    setIsLike(!isLike)
  }

  const handleJoin = () => {
    setIsJoin(!isJoin)
    onClose()
  }

  if (!data) return null

  return (
    <div className={styles.detailContent}>
      <div className={styles.like} onClick={likeToggle} role='presentation'>
        {isLike ? <LikeOnIcon /> : <LikeIcon />}
      </div>
      <div className={styles.detailNickname}>
        <span className={styles.profile} />
        <span className={styles.nickname}>{data.nickname}</span>
      </div>
      <div className={styles.detailTitle}>
        <h3>{data.title}</h3>
      </div>
      <div className={styles.detailText}>
        <p>{data.content}</p>
      </div>
      <div className={styles.detailList}>
        <ul>
          <li className={styles.location}>
            <LocationIcon />
            {data.market}
          </li>
          <li className={styles.time}>
            <TimeIcon />
            {data.meetingTime}
          </li>
          <li className={styles.people}>
            <PeopleIcon />
            {data.applyNumber} / {data.recruitmentNumber}
          </li>
          <li>{data.uploadTime}</li>
        </ul>
      </div>
      <div className={styles.detailBtn}>
        <Button
          basic
          type={isJoin ? 'primary' : 'negative'}
          text={isJoin ? '참여완료' : '참여하기'}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message={isJoin ? '참여를 취소하시겠습니까?' : '참여하시겠습니까?'}
        yesCallBack={handleJoin}
      />
    </div>
  )
}

export default DetailContent
