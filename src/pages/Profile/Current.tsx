import { useState } from 'react'
import { useQueryClient } from 'react-query'

import { useNavigate } from 'react-router-dom'
import useMyInfo from 'hooks/useMyInfo'

import { Header, TwoButtonModal } from 'components'

import useModal from 'hooks/useModal'
import { getInstance } from 'apis/client'
import { ArrowPrevIcon } from 'assets/svgs'

import styles from './profile.module.scss'

const ProfileCurrent = () => {
  const [message, setMessage] = useState('')
  const { nickname, email, userId, profileUrl } = useMyInfo()

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  const handleLogOut = () => {
    getInstance(true)
      .get(`/myPage/${userId}/logout`)
      .then(() => {
        localStorage.removeItem('sobunsobun')
        queryClient.removeQueries()
        navigate('/intro')
      })
      .catch(() => {
        // eslint-disable-next-line no-console, no-alert
        alert('로그아웃에 실패했습니다. 다시 시도해주세요')
      })
  }

  const handleWithdrawal = () => {
    getInstance(true)
      .delete(`/myPage/${userId}`)
      .then(() => {
        localStorage.removeItem('sobunsobun')
        queryClient.removeQueries()
        navigate('/intro')
      })
      .catch(() => {
        // eslint-disable-next-line no-console, no-alert
        alert('회원탈퇴에 실패했습니다. 다시 시도해주세요')
      })
  }

  const openModal = (isLogOut?: Boolean) => {
    setIsOpen(true)
    isLogOut ? setMessage('로그아웃') : setMessage('정말 탈퇴')
  }

  return (
    <div className={styles.profile}>
      <Header headText='마이페이지' />
      <div className='contentsInner'>
        <div className={styles.top}>
          <div className={styles.imageWrap}>
            <img src={profileUrl} alt='프로필이미지' />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.name}>{nickname}</p>
            <p className={styles.email}>{email}</p>
          </div>
        </div>
        <div className={styles.lineWrap}>
          <button
            type='button'
            className={styles.movePageBtn}
            onClick={() => {
              navigate('/profile-edit')
            }}
          >
            <span>회원정보 수정</span>
            <ArrowPrevIcon className={styles.arrow} />
          </button>
          <button type='button' onClick={() => openModal(true)}>
            로그아웃
          </button>
          <button type='button' onClick={() => openModal()}>
            탈퇴하기
          </button>
        </div>
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message={`${message} 하시겠습니까?`}
        yesCallBack={message === '로그아웃' ? handleLogOut : handleWithdrawal}
      />
    </div>
  )
}

export default ProfileCurrent
