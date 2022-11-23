import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'components/Button'

import Greeting from 'components/Greeting'
import Input from 'components/Input'
import { defaultInstance, isAxiosError } from 'apis/client'
import styles from './login.module.scss'

type FormValues = {
  email: string
  password: string
}

const loginAPI = (formData: FormData) => defaultInstance.post('/login', formData)

const Login = () => {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [otherError, setOtherError] = useState('')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const watchEmailValue = watch('email', '')
  const watchPasswordValue = watch('password', '')

  useEffect(() => {
    const subscription = watch(() => {
      setEmailError('')
      setPasswordError('')
      setOtherError('')
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // login form 제출
  const { mutate, isLoading } = useMutation(loginAPI, {
    onSuccess(response) {
      localStorage.setItem('sobunsobun', response.data)
      navigate('/home')
    },
    onError(err) {
      setEmailError('')
      setPasswordError('')
      setOtherError('')

      if (isAxiosError(err)) {
        const status = err.response?.status
        if (status === 401) {
          setPasswordError('비밀번호를 잘못 입력하셨습니다.')
        } else if (status === 404) {
          setEmailError('존재하는 이메일이 없습니다.')
        } else {
          setOtherError('앗! 에러가 발생했습니다. 다시 시도해주세요')
        }
      }
    },
  })

  const onSubmit = async (value: FormValues) => {
    const formData = new FormData()
    formData.append('email', value.email)
    formData.append('password', value.password)

    mutate(formData)
  }

  return (
    <div className={styles.login}>
      <div className='contentsInner'>
        <Greeting />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <div className={styles.line}>
            <Input type='line' htmlFor='email' text='이메일'>
              <input
                type='email'
                id='email'
                placeholder='예)sobunsobun@subun.co.kr'
                {...register('email', { required: true })}
              />
            </Input>
            {errors.email?.type === 'required' && <span className={styles.guide}> 이메일을 입력해주세요</span>}
            {emailError && <span className={styles.guide}>{emailError}</span>}
          </div>
          <div className={styles.line}>
            <Input type='line' htmlFor='password' text='비밀번호'>
              <input type='password' id='password' {...register('password', { required: true, min: 6 })} />
            </Input>
            {errors.password?.type === 'required' && <span className={styles.guide}>비밀번호를 입력해주세요</span>}
            {passwordError && <span className={styles.guide}>{passwordError}</span>}
            {otherError && <span className={styles.guide}>{otherError}</span>}
          </div>
          <div className={styles.buttonWrap}>
            <Button
              type={watchEmailValue && watchPasswordValue ? 'primary' : 'negative'}
              text='로그인하기'
              submit
              loading={isLoading}
            />
            <Link to='/local' className={styles.signupButton}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
