import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Header from 'components/Header'
import { TwoButtonModal } from 'components/Modal'
import Input from 'components/Input'
import { region } from 'types'
import { defaultInstance } from 'apis/client'
import useModal from 'hooks/useModal'
import styles from './signup.module.scss'

type FormValues = {
  email: string
  password: string
  passwordConfirm: string
  nickname: string
}

type SignupFormValues = {
  email: string
  password: string
  nickname: string
  location?: string
}

const signupAPI = (formData: FormData) => defaultInstance.post('/join', formData)

const Signup = () => {
  const { state } = useLocation()
  const locationState = (state as { myRegion: region }).myRegion
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()
  const [nicknameActive, setNicknameActive] = useState(false)
  const [emailActive, setEmailActive] = useState(false)
  const [nicknameDuplicate, setNicknameDuplicate] = useState('')
  const [emailDuplicate, setEmailDuplicate] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange' })

  const emailCurrent = watch('email')
  const passwordCurrent = watch('password')
  const nicknameCurrent = watch('nickname')

  const { mutate, isLoading } = useMutation(signupAPI, {
    onSuccess: () => {
      navigate('/complete', { state: { nickname: nicknameCurrent, address_name: locationState.address_name } })
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    },
  })

  const onSubmit = async (_data: SignupFormValues) => {
    const formData = new FormData()
    formData.append('email', _data.email)
    formData.append('password', _data.password)
    formData.append('nickname', _data.nickname)
    formData.append('location', locationState.address_name)
    formData.append('lat', locationState.location.lat)
    formData.append('lon', locationState.location.lon)

    mutate(formData)
  }

  const nicknameDuplicateCheck = async (_nickData: SignupFormValues['nickname']) => {
    try {
      const formData = new FormData()
      formData.append('nickname', _nickData)
      if (nicknameCurrent && errors.nickname?.type !== 'maxLength') {
        await defaultInstance.post('/join/nicknameDuplicateCheck', formData).then((response) => {
          if (response.data === '가입 가능한 닉네임') {
            setNicknameActive(true)
            setNicknameDuplicate('멋진 닉네임이네요!')
          } else {
            setNicknameActive(false)
            setNicknameDuplicate('중복된 닉네임입니다.')
          }
        })
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const emailDuplicateCheck = async (_emailData: SignupFormValues['email']) => {
    try {
      const formData = new FormData()
      formData.append('email', _emailData)
      if (emailCurrent && errors.email?.type !== 'pattern') {
        await defaultInstance.post('/join/emailDuplicateCheck', formData).then((response) => {
          if (response.data === '가입 가능한 이메일') {
            setEmailActive(true)
            setEmailDuplicate('사용 가능한 이메일입니다.')
          } else {
            setEmailActive(false)
            setEmailDuplicate('중복된 이메일입니다.')
          }
        })
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  useEffect(() => {
    setEmailDuplicate('')
  }, [emailCurrent])

  useEffect(() => {
    setNicknameDuplicate('')
  }, [nicknameCurrent])

  return (
    <div className={styles.signup}>
      <Header headText='회원가입' leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} />
      <div className='contentsInner'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <div className={styles.formBox}>
            <Input type='line' htmlFor='email' text='이메일주소'>
              <input
                type='text'
                id='email'
                placeholder='예) sobunsobun@subun.co.kr'
                {...register('email', {
                  required: { value: true, message: '필수 정보입니다.' },
                  pattern: {
                    value: /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm,
                    message: '이메일형식에 맞지 않습니다.',
                  },
                  onChange: () => setEmailActive(false),
                })}
              />
              <Button
                type={emailActive ? 'primary' : 'negative'}
                text='중복체크'
                onClick={() => emailDuplicateCheck(emailCurrent)}
              />
            </Input>
            <div className={styles.errorMessage}>
              <p>
                <span className={emailActive ? `${styles.duplicate}` : `${styles.red}`}>{emailDuplicate}</span>
                {errors.email?.type === 'required' && errors.email.message}
                {errors.email?.type === 'pattern' && errors.email.message}
              </p>
            </div>
          </div>
          <div className={styles.formBox}>
            <Input type='line' htmlFor='password' text='비밀번호'>
              <input
                type='password'
                id='password'
                placeholder='6자 이상 입력해주세요.'
                {...register('password', {
                  required: { value: true, message: '필수 정보입니다.' },
                  minLength: { value: 6, message: '6자 이상 입력해주세요.' },
                })}
              />
            </Input>
            <div className={styles.errorMessage}>
              <p>
                {errors.password?.type === 'required' && errors.password.message}
                {errors.password?.type === 'minLength' && errors.password.message}
              </p>
            </div>
          </div>
          <div className={styles.formBox}>
            <Input type='line' htmlFor='passwordConfirm' text='비밀번호 확인'>
              <input
                type='password'
                id='passwordConfirm'
                className={styles.textInput}
                placeholder='비밀번호를 확인해주세요.'
                {...register('passwordConfirm', {
                  required: { value: true, message: '필수 정보입니다.' },
                  validate: (value) => value === passwordCurrent,
                })}
              />
            </Input>
            <div className={styles.errorMessage}>
              <p>
                {errors.passwordConfirm?.type === 'required' && errors.passwordConfirm.message}
                {errors.passwordConfirm?.type === 'validate' && '비밀번호가 일치하지 않습니다.'}
              </p>
            </div>
          </div>
          <div className={styles.formBox}>
            <Input type='line' htmlFor='nickname' text='닉네임'>
              <input
                type='text'
                id='nickname'
                className={styles.textInput}
                placeholder='닉네임을 입력해주세요.'
                {...register('nickname', {
                  required: { value: true, message: '필수 정보입니다.' },
                  maxLength: { value: 6, message: '6자 이하로 입력해주세요.' },
                  onChange: () => setNicknameActive(false),
                })}
              />
              <Button
                type={nicknameActive ? 'primary' : 'negative'}
                text='중복체크'
                onClick={() => nicknameDuplicateCheck(nicknameCurrent)}
              />
            </Input>
            <div className={styles.errorMessage}>
              <p>
                <span className={nicknameActive ? `${styles.duplicate}` : `${styles.red}`}>{nicknameDuplicate}</span>
                {errors.nickname?.type === 'required' && errors.nickname.message}
                {errors.nickname?.type === 'maxLength' && errors.nickname.message}
              </p>
            </div>
          </div>
          <div className={styles.signupBtn}>
            <Button
              type={!(nicknameActive && emailActive && isValid) ? 'negative' : 'primary'}
              text='다음'
              isDisabled={!(nicknameActive && emailActive && isValid)}
              submit
              loading={isLoading}
            />
          </div>
        </form>
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='회원가입을 종료하시겠습니까?'
        yesCallBack={() => {
          navigate('/')
        }}
      />
    </div>
  )
}

export default Signup
