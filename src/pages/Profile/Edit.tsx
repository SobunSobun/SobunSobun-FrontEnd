import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useMyInfo from 'hooks/useMyInfo'

import { authInstance } from 'apis/client'
import { IMAGE_PATH } from 'assets/images'

import Button from 'components/Button'
import Input from 'components/Input'
import FloatingElem from 'components/FloatingElem'
import { CameraIcon } from 'assets/svgs'
import cx from 'classnames'

import styles from './profile.module.scss'

const ProfileEdit = () => {
  const { nickname, email, userId, profileUrl } = useMyInfo()
  const navigate = useNavigate()
  const [nicknameValue, setNicknameValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preImage, setPreImage] = useState<string | undefined>('')
  const [previewURL, setPreviewURL] = useState<string | undefined>('')

  useEffect(() => {
    setNicknameValue(nicknameValue)
  }, [nicknameValue])

  useEffect(() => {
    if (profileUrl === '1') {
      setPreImage(IMAGE_PATH.profile)
      return
    }
    setPreImage(profileUrl)
  }, [previewURL, profileUrl])

  const handleClickUploadBtn = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.currentTarget.files) return
    const reader = new FileReader()
    reader.readAsDataURL(e.currentTarget.files[0])
    reader.onload = () => {
      setPreviewURL(String(reader.result))
    }
    const formData = new FormData()
    ;[].forEach.call(e.target.files, (f) => {
      formData.append('image', f)
    })
    // api 요청 자리 (post)
  }, [])

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('nickname', nicknameValue)
    // api 요청 자리 (patch)
  }

  const handleMoveCurrent = () => {
    navigate('/profile')
  }

  return (
    <div className={styles.profile}>
      <div className='contentsInner'>
        <h3>마이페이지</h3>
        <div className={styles.top}>
          <input type='file' ref={inputRef} accept='image/*' multiple hidden onChange={handleImageUpload} />
          <div className={styles.image}>
            <button type='button' className={styles.imageWrap} onClick={handleClickUploadBtn}>
              {previewURL ? <img src={previewURL} alt='프로필이미지' /> : <img src={preImage} alt='프로필이미지' />}
            </button>
            <button type='button' className={styles.cameraBtn} onClick={handleClickUploadBtn}>
              <CameraIcon />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <label htmlFor='email'>이메일 주소</label>
          <p>{email}</p>
          <FloatingElem offsetBottom={43}>
            <Button type='primary' text='수정 완료' onClick={handleMoveCurrent} />
          </FloatingElem>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
