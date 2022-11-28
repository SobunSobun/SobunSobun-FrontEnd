import { useNavigate } from 'react-router-dom'
import useMyInfo from 'hooks/useMyInfo'

import { TwoButtonModal } from 'components/Modal'

import { IMAGE_PATH } from 'assets/images'
import useModal from 'hooks/useModal'
import { authInstance } from 'apis/client'
import { ArrowPrevIcon } from 'assets/svgs'

import styles from './profile.module.scss'

const ProfileCurrent = () => {
  const { nickname, email, userId, profileUrl } = useMyInfo()
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  const handleImageSet = () => {
    if (profileUrl === '1') {
      return IMAGE_PATH.profile
    }
    return profileUrl
  }

  const handleLogOut = () => {
    authInstance
      .get(`/myPage/${userId}/logout`)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        navigate('/login')
        localStorage.setItem('sobunsobun', '')
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        // eslint-disable-next-line no-console, no-alert
        alert('로그아웃에 실패했습니다. 다시 시도해주세요')
      })
  }

  const handleWithdrawal = () => {
    authInstance
      .delete(`/myPage/${userId}`)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        localStorage.setItem('sobunsobun', '')
        navigate('/login')
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        // eslint-disable-next-line no-console, no-alert
        alert('회원탈퇴에 실패했습니다. 다시 시도해주세요')
      })
  }

  return (
    <div className={styles.profile}>
      <div className='contentsInner'>
        <h3>마이페이지</h3>
        <div className={styles.top}>
          <div className={styles.imageWrap}>
            <img src={handleImageSet()} alt='프로필이미지' />
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
          <button type='button' onClick={handleLogOut}>
            로그아웃
          </button>
          <button type='button' onClick={() => setIsOpen(true)}>
            탈퇴하기
          </button>
        </div>
      </div>
      <TwoButtonModal show={isOpen} close={onClose} message='정말 탈퇴하시겠습니까?' yesCallBack={handleWithdrawal} />
    </div>
  )
}

export default ProfileCurrent