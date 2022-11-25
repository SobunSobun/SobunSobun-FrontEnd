import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react'

import Button from 'components/Button'
import Input from 'components/Input'
import { EditIcon } from 'assets/svgs'
import cx from 'classnames'
import styles from './profile.module.scss'

interface dataType {
  nickname: string
  email: string
  image: string
}
const userData: dataType = {
  nickname: 'ZEONE',
  email: 'sobun@naver.com',
  image: 'https://via.placeholder.com/200',
}

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [nickname, setNickname] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previewURL, setPreviewURL] = useState<string | undefined>('')
  // const [imageFile, setImageFile] = useState<Array<Blob>>([])

  useEffect(() => {
    setNickname(userData.nickname)
  }, [])

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
  const handleProfileImage = () => {
    return previewURL ? <img src={previewURL} alt='upload images' /> : <img src={userData.image} alt='프로필 이미지' />
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('nickname', nickname)
    // api 요청 자리 (patch)
  }

  return (
    <div className={styles.profile}>
      <div className='contentsInner'>
        <h3>마이페이지</h3>
        <div className={styles.top}>
          <input
            type='file'
            // className={styles.uploadInput}
            ref={inputRef}
            accept='image/*'
            multiple
            hidden
            onChange={handleImageUpload}
          />
          <button
            type='button'
            className={cx(styles.image, { [styles.edit]: isEdit })}
            onClick={isEdit ? handleClickUploadBtn : undefined}
          >
            {handleProfileImage()}
            <EditIcon />
          </button>
          <p className={styles.greeting}>
            {userData.nickname}님, <br className={styles.pcBlind} />
            안녕하세요!
          </p>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className={styles.buttonWrap}>
            <Button
              type={isEdit ? 'negative' : 'primary'}
              text={isEdit ? '편집 완료' : '프로필 편집'}
              onClick={() => setIsEdit((prev) => !prev)}
              submit={!isEdit}
            />
          </div>
          <Input type='round' htmlFor='nickname' text='닉네임'>
            <input
              type='text'
              id='nickname'
              className={styles.textInput}
              placeholder='닉네임은 최대 10자까지 가능합니다.'
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value)
              }}
              readOnly={!isEdit}
            />
          </Input>
          <Input type='round' htmlFor='nickname' text='이메일'>
            <input type='text' id='email' className={styles.textInput} readOnly defaultValue={userData.email} />
          </Input>
        </form>
        <div className={styles.setting}>
          <p>설정</p>
          <button type='button'>로그아웃</button>
          <button type='button'>탈퇴하기</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
