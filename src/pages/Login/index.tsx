import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'components/Button'

import Greeting from 'components/Greeting'
import Input from 'components/Input'
import { defaultInstance } from 'apis/client'
import styles from './login.module.scss'

type FormValues = {
  email: string
  password: string
}

export const loginAPI = (formData: any) => defaultInstance.post<any>('/login', formData)

const Login = () => {
  const [warning, setWarning] = useState(false)
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
    const subscription = watch((value) => {
      if (!value.email || !value.password) {
        setWarning(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const submitErrorMessage = () => {
    const message =
      warning && watchEmailValue && watchPasswordValue ? (
        <span className={styles.guide}>
          이메일 또는 비밀번호를 잘못 입력했습니다. <br />
          입력하신 내용을 다시 확인해주세요.
        </span>
      ) : (
        ''
      )
    return message
  }

  // login form 제출
  const { data, mutate, isLoading, isSuccess } = useMutation(loginAPI, {
    onError(err) {
      // eslint-disable-next-line no-console
      console.log(err)
      setWarning(true)
    },
  })

  if (isSuccess) {
    localStorage.setItem('sobunsobun', data.data)
    navigate('/home')
  }

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
          </div>
          <div className={styles.line}>
            <Input type='line' htmlFor='password' text='비밀번호'>
              <input type='password' id='password' {...register('password', { required: true, min: 6 })} />
            </Input>
            {errors.password?.type === 'required' && <span className={styles.guide}>비밀번호를 입력해주세요</span>}
            {submitErrorMessage()}
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
