import React, { useRef, useState, useEffect } from 'react'
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

axios.defaults.withCredentials = true

const Signup = () => {
  const [isActive, setIsActive] = useState<Boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange' })

  // const [dataAAA, setData] = useState('')
  const password = useRef('')
  password.current = watch('password')

  const onSubmit = async (data: FormValues) => {
    console.log('data', data)
    try {
      const result = await axios.post('http://15.164.112.119:8080/join', data, { withCredentials: true })
      console.log(result)
    } catch (error: any) {
      console.log(1)
    }
  }
  const duplicateCheck = () => {
    console.log(1)
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
                placeholder='test@email.com'
                {...register('email', {
                  required: { value: true, message: '필수 입력란입니다.' },
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
                  required: { value: true, message: '필수 입력란입니다.' },
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
                {...register('passwordConfirm', {
                  required: { value: true, message: '필수 입력란입니다.' },
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
                {...register('nickname', { required: { value: true, message: '필수 입력란입니다.' } })}
              />
              <Button type='primary' text='중복체크' onClick={duplicateCheck} />
            </Input>
            <div className={styles.errorMessage}>
              <p>{errors.nickname?.type === 'required' && errors.nickname.message}</p>
            </div>
          </div>
          <button type='button' className={styles.button} disabled={!isValid}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
