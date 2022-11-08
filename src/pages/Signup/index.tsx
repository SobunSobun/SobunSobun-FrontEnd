import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from 'components/Button'
import Header from 'components/Header'
import Input from 'components/Input'
import axios from 'axios'
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

const Signup = () => {
  const [isActive, setIsActive] = useState<boolean | undefined>(false)
  const [nicknameDuplicate, setNicknameDuplicate] = useState<string>('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange' })

  const password = useRef('')
  const nickname = useRef('')
  password.current = watch('password')
  nickname.current = watch('nickname')

  const onSubmit = async (data: SignupFormValues) => {
    try {
      //   console.log(data)
      await axios
        .post('/join', {
          email: data.email,
          password: data.password,
          nickname: data.nickname,
          location: '동작구 상도동',
        })
        .then((response) => {
          console.log(response.data)
        })
    } catch (error: any) {
      console.log(error)
    }
  }
  const duplicateCheck = async (_nickData: SignupFormValues['nickname']) => {
    try {
      await axios.post('/join/nicknameDuplicateCheck', _nickData).then((response) => {
        if (response.data === '가입 가능한 닉네임') {
          setIsActive(true)
          setNicknameDuplicate('멋진 닉네임이네요!')
        } else {
          setIsActive(false)
          setNicknameDuplicate('중복된 닉네임입니다.')
        }
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className={styles.signup}>
      <Header headText='회원가입' leftChild={<Button type='back' />} />
      <div className='contentsInner'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <div className={styles.formBox}>
            <Input type='line' htmlFor='email' text='이메일주소'>
              <input
                type='text'
                id='email'
                placeholder='예) test@email.com'
                {...register('email', {
                  required: { value: true, message: '필수 정보입니다.' },
                  pattern: {
                    value: /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm,
                    message: '이메일형식에 맞지 않습니다.',
                  },
                })}
              />
            </Input>
            <div className={styles.errorMessage}>
              <p>
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
                  validate: (value) => value === password.current,
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
          <div className={styles.nickname}>
            <Input type='line' htmlFor='nickname' text='닉네임'>
              <input
                type='text'
                id='nickname'
                className={styles.textInput}
                placeholder='닉네임을 입력해주세요.'
                {...register('nickname', {
                  required: { value: true, message: '필수 정보입니다.' },
                  onChange: () => setIsActive(false),
                })}
              />
              <Button type='primary' text='중복체크' onClick={() => duplicateCheck(nickname.current)} />
            </Input>
            <div className={styles.errorMessage}>
              <p>
                {nickname.current === '' ? '' : <span className={styles.duplicate}>{nicknameDuplicate}</span>}
                {errors.nickname?.type === 'required' && errors.nickname.message}
              </p>
            </div>
          </div>
          <div className={styles.signupBtn}>
            <Button type={!(isActive && isValid) ? 'negative' : 'primary'} text='회원가입' submit />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
