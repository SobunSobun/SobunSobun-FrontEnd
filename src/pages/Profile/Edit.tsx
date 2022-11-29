import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import cx from 'classnames'

import useMyInfo from 'hooks/useMyInfo'
import { authInstance, defaultInstance } from 'apis/client'

import Button from 'components/Button'
import Input from 'components/Input'
import FloatingElem from 'components/FloatingElem'
import ErrorMessage from 'components/ErrorMessage'
import { TwoButtonModal } from 'components/Modal'
import Header from 'components/Header'

import useModal from 'hooks/useModal'

import { CameraIcon } from 'assets/svgs'
import styles from './profile.module.scss'

const ProfileEdit = () => {
  const queryClient = useQueryClient()
  const { isOpen, onClose, setIsOpen } = useModal()
  const { nickname, email, userId, profileUrl } = useMyInfo()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<any>(null)
  const [preImage, setPreImage] = useState<string | undefined>('')
  const [previewURL, setPreviewURL] = useState<string | undefined>('')
  const [nicknameActive, setNicknameActive] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  type FormValues = {
    nickname: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { nickname },
  })

  const nicknameCurrent = watch('nickname')

  useEffect(() => {
    const subscription = watch(() => {
      setResponseMessage('')
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    setPreImage(profileUrl)
  }, [profileUrl])

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
    setImage(e.currentTarget.files?.[0])
  }, [])

  const handleCheckNickName = async () => {
    try {
      const formData = new FormData()
      formData.append('nickname', nicknameCurrent)

      await defaultInstance.post('/join/nicknameDuplicateCheck', formData).then((response) => {
        if (response.data === '가입 가능한 닉네임') {
          setNicknameActive(true)
          setResponseMessage('멋진 닉네임이네요!')
        } else {
          setNicknameActive(false)
          setResponseMessage('다른 닉네임을 입력해주세요!')
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const handleSubmitImage = async () => {
    const formData = new FormData()
    formData.append('multipartFile', image)

    try {
      await authInstance.post(`/myPage/${userId}/changeProfileUrl`, formData)
      queryClient.invalidateQueries('myInfo')
      navigate('/profile')
    } catch {
      // eslint-disable-next-line no-console, no-alert
      alert('파일 업로드가 실패하였습니다. 파일을 확인해주세요')
    }
  }

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()
    formData.append('nickname', data.nickname)

    try {
      await authInstance.post(`/myPage/${userId}/modifyNickname`, formData)
      if (image) {
        handleSubmitImage()
      }
      navigate('/profile')
    } catch (error) {
      // eslint-disable-next-line no-console, no-alert
      alert('앗! 에러가 발생했습니다. 다시 시도해주세요')
    } finally {
      queryClient.invalidateQueries('myInfo')
      queryClient.invalidateQueries('feedList')
    }
  }

  return (
    <div className={styles.profile}>
      <Header headText='마이페이지' leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} />
      <div className='contentsInner'>
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.top}>
            <input type='file' ref={inputRef} accept='image/*' multiple hidden onChange={handleImageUpload} />
            <div className={styles.image}>
              <button type='button' className={styles.imageWrap} onClick={handleClickUploadBtn}>
                <img src={previewURL || preImage} alt='프로필이미지' />
              </button>
              <button type='button' className={styles.cameraBtn} onClick={handleClickUploadBtn}>
                <CameraIcon />
              </button>
            </div>
          </div>
          <div className={styles.line}>
            <Input htmlFor='nickname' text='닉네임'>
              <input
                type='text'
                id='nickname'
                className={styles.textInput}
                {...register('nickname', {
                  maxLength: { value: 6, message: '6자 이하로 입력해주세요.' },
                  onChange: () => setNicknameActive(false),
                })}
              />
              <Button
                secondary
                type={nicknameActive ? 'primary' : 'secondary'}
                text='중복확인'
                onClick={handleCheckNickName}
                isDisabled={!nicknameCurrent || nickname === nicknameCurrent || errors.nickname?.type === 'maxLength'}
              />
            </Input>
            <ErrorMessage>
              {responseMessage && <span className={cx({ [styles.green]: setNicknameActive })}>{responseMessage}</span>}
              {errors.nickname?.type === 'maxLength' && errors.nickname.message}
            </ErrorMessage>
          </div>
          <label htmlFor='email'>이메일 주소</label>
          <p className={styles.textInput}>{email}</p>
          <FloatingElem offsetBottom={43}>
            <Button
              type={image || nicknameActive ? 'primary' : 'negative'}
              text='수정 완료'
              submit
              isDisabled={!image && !nicknameActive}
            />
          </FloatingElem>
        </form>
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='프로필 변경을 취소 하시겠습니까?'
        yesCallBack={() => {
          navigate('/profile')
        }}
      />
    </div>
  )
}

export default ProfileEdit
