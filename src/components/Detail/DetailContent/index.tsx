import React from 'react'
import Button from 'components/Button'
import { TwoButtonModal } from 'components/Modal'
import useModal from 'hooks/useModal'
import { LikeIcon, LikeOnIcon, LocationIcon, PeopleIcon, TimeIcon } from 'assets/svgs'
import { detailData } from 'types'
import useLike from 'hooks/useLike'
import useMyInfo from 'hooks/useMyInfo'
import useApply from 'hooks/useApply'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './detailContent.module.scss'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

interface Props {
  postId: string
  data?: detailData
}

const DetailContent = ({ data, postId }: Props) => {
  const { userId } = useMyInfo()
  const { mutate: likeAPI } = useLike()
  const { mutate: applyAPI } = useApply()
  const { isOpen, onClose, setIsOpen } = useModal()

  const likeToggle = () => {
    likeAPI({ postId, userId: userId?.toString()! })
  }

  const handleJoin = () => {
    applyAPI({ postId, userId: userId?.toString()! })
    onClose()
  }

  if (!data) return null

  return (
    <div className={styles.detailContent}>
      <div className={styles.like} onClick={likeToggle} role='presentation'>
        {data.isLike ? <LikeOnIcon /> : <LikeIcon />}
      </div>
      <div className={styles.detailNickname}>
        <span className={styles.profile}>
          <img src={data.profileUrl} alt='' />
        </span>
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
            {`${dayjs(data.meetingTime).format('YYYY. MM. DD \xa0 hh시 m분')} `}
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
          type={data.isApply ? 'primary' : 'negative'}
          text={data.isApply ? '참여완료' : '참여하기'}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message={data.isApply ? '참여를 취소하시겠습니까?' : '참여하시겠습니까?'}
        yesCallBack={handleJoin}
      />
    </div>
  )
}

export default DetailContent
