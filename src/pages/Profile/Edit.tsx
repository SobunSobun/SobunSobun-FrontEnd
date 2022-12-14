import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import cx from 'classnames'

import { getInstance } from 'apis/client'

import { Header, Button, Input, ErrorMessage, TwoButtonModal } from 'components'

import useMyInfo from 'hooks/useMyInfo'
import useModal from 'hooks/useModal'
import useProfile from 'hooks/useProfile'

import { CameraIcon } from 'assets/svgs'
import styles from './profile.module.scss'

const ProfileEdit = () => {
  const { isOpen, onClose, setIsOpen } = useModal()
  const { nickname, email, userId, profileUrl } = useMyInfo()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<any>(null)
  const [preImage, setPreImage] = useState<string | undefined>('')
  const [previewURL, setPreviewURL] = useState<string | undefined>('')
  const [nicknameActive, setNicknameActive] = useState(false)
  const [submitBtnActive, setSubmitBtnActive] = useState(false)
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

      await getInstance()
        .post('/join/nicknameDuplicateCheck', formData)
        .then((response) => {
          if (response.data === '?????? ????????? ?????????') {
            setNicknameActive(true)
            setResponseMessage('?????? ??????????????????!')
          } else {
            setNicknameActive(false)
            setResponseMessage('?????? ???????????? ??????????????????!')
          }
        })
    } catch (error) {
      // eslint-disable-next-line no-console, no-alert
      alert('????????? ????????? ?????????????????????.')
    }
  }

  const handleUpdateData = () => {
    updatePageData()
    navigate('/profile')
  }

  const {
    imgMutateAsync,
    imgMutate,
    imgLoading,
    imgError,
    nickNameMutateAsync,
    nickNameMutate,
    nickNameLoading,
    updatePageData,
    nickNameError,
  } = useProfile()

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()

    if (image && nicknameActive) {
      formData.append('nickname', data.nickname)
      formData.append('multipartFile', image)
      const imgResult = await imgMutateAsync({ userId, formData })
      const nickNameResult = await nickNameMutateAsync({ userId, formData })

      if (!(imgResult && nickNameResult)) return
      handleUpdateData()
    }

    if (image && !nicknameActive) {
      formData.append('multipartFile', image)
      imgMutate(
        { userId, formData },
        {
          onSuccess() {
            handleUpdateData()
          },
        }
      )
    }

    if (!image && nicknameActive) {
      formData.append('nickname', data.nickname)
      nickNameMutate(
        { userId, formData },
        {
          onSuccess() {
            handleUpdateData()
          },
        }
      )
    }
  }

  useEffect(() => {
    if (imgError || nickNameError) {
      // eslint-disable-next-line no-alert
      alert('????????? ??????????????????. ???????????? ????????? ??????????????????.')
    }
  })

  useEffect(() => {
    if ((image && nicknameActive) || (!image && nicknameActive) || (image && nicknameCurrent === nickname)) {
      setSubmitBtnActive(true)
    } else {
      setSubmitBtnActive(false)
    }
  }, [image, nickname, nicknameActive, nicknameCurrent])

  return (
    <div className={styles.profile}>
      <Header headText='???????????????' leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} />
      <div className='contentsInner'>
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.top}>
            <input type='file' ref={inputRef} accept='.jpg, .png' multiple hidden onChange={handleImageUpload} />
            <div className={styles.image}>
              <button type='button' className={styles.imageWrap} onClick={handleClickUploadBtn}>
                <img src={previewURL || preImage} alt='??????????????????' />
              </button>
              <button type='button' className={styles.cameraBtn} onClick={handleClickUploadBtn}>
                <CameraIcon />
              </button>
            </div>
          </div>
          <div className={styles.line}>
            <Input htmlFor='nickname' text='?????????'>
              <input
                type='text'
                id='nickname'
                className={styles.textInput}
                {...register('nickname', {
                  maxLength: { value: 6, message: '6??? ????????? ??????????????????.' },
                  onChange: () => setNicknameActive(false),
                })}
              />
              <Button
                secondary
                type={nicknameActive ? 'primary' : 'secondary'}
                text='????????????'
                onClick={handleCheckNickName}
                isDisabled={!nicknameCurrent || nickname === nicknameCurrent || errors.nickname?.type === 'maxLength'}
              />
            </Input>
            <ErrorMessage>
              {responseMessage && <span className={cx({ [styles.green]: setNicknameActive })}>{responseMessage}</span>}
              {errors.nickname?.type === 'maxLength' && errors.nickname.message}
            </ErrorMessage>
          </div>
          <label htmlFor='email'>????????? ??????</label>
          <p className={styles.textInput}>{email}</p>
          <div className={styles.buttonWrap}>
            <Button
              type={submitBtnActive ? 'primary' : 'negative'}
              text='?????? ??????'
              submit
              isDisabled={!submitBtnActive}
              loading={imgLoading && nickNameLoading}
            />
          </div>
        </form>
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='????????? ????????? ?????? ???????????????????'
        yesCallBack={() => {
          navigate('/profile')
        }}
      />
    </div>
  )
}

export default ProfileEdit
