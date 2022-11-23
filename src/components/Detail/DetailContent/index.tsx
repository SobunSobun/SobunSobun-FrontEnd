import React, { useState, useEffect } from 'react'
import Button from 'components/Button'
import { TwoButtonModal } from 'components/Modal'
import useModal from 'hooks/useModal'
import { LikeIcon, LikeOnIcon, LocationIcon, PeopleIcon, TimeIcon } from 'assets/svgs'
import { authInstance } from 'apis/client'
import { useNavigate } from 'react-router-dom'
import styles from './detailContent.module.scss'

interface Props {
  id?: string
}

interface datailData {
  nickname: string
  title: string
  content: string
  category: string
  meetingTime: string
  market: string
  recruitmentNumber: number
  applyNumber: number
  uploadTime: string
}

// interface RouteState {
//   state: {
//     category: string
//   }
// }

const DetailContent = ({ id }: Props) => {
  // const { state } = useLocation() as RouteState
  const navigate = useNavigate()
  const [isJoin, setIsJoin] = useState<boolean>(false)
  const [isLike, setIsLike] = useState<boolean>(false)
  const [result, setResult] = useState<datailData>()
  const { isOpen, onClose, setIsOpen } = useModal()

  const likeToggle = () => {
    setIsLike(!isLike)
  }

  const handleJoin = () => {
    setIsJoin(!isJoin)
    onClose()
  }

  const getDetailContent = async () => {
    try {
      const { data, status } = await authInstance.get(`post/${id}`)
      if (status === 200) {
        setResult(data)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        // eslint-disable-next-line no-alert
        alert('존재하지 않는 게시물입니다.')
        navigate('/home')
      }
    }
    return {}
  }

  useEffect(() => {
    getDetailContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.detailContent}>
      <div className={styles.like} onClick={likeToggle} role='presentation'>
        {isLike ? <LikeOnIcon /> : <LikeIcon />}
      </div>
      <div className={styles.detailNickname}>
        <span className={styles.profile} />
        <span className={styles.nickname}>{result?.nickname}</span>
      </div>
      <div className={styles.detailTitle}>
        <h3>{result?.title}</h3>
      </div>
      <div className={styles.detailText}>
        <p>{result?.content}</p>
      </div>
      <div className={styles.detailList}>
        <ul>
          <li className={styles.location}>
            <LocationIcon />
            {result?.market}
          </li>
          <li className={styles.time}>
            <TimeIcon />
            {result?.meetingTime}
          </li>
          <li className={styles.people}>
            <PeopleIcon />
            {result?.applyNumber} / {result?.recruitmentNumber}
          </li>
          <li>{result?.uploadTime}</li>
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
