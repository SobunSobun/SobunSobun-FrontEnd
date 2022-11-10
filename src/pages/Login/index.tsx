// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
// import { useSetRecoilState } from 'recoil'
// import { authInfo } from 'recoil/user.atom'

import Greeting from 'components/Greeting'
import Input from 'components/Input'
import { defaultInstance } from 'apis/client'
import styles from './login.module.scss'

type FormValues = {
  email: string
  password: string
}

// const navigate = useNavigate()

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    try {
      const response = await defaultInstance.post('/login', formData)
      console.log(response)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const onLoginSuccess = (response: any) => {
    const { data } = response

    if (response.status === 200) {
      // accessToken 설정
      console.log(data)
      localStorage.setItem('sobunsobun', data)
      axios.defaults.headers.common.Authorization = `Bearer ${data}`
      // axios
      //   .get('/user/me')
      //   .then((res) => {
      //     // console.log(axios.defaults.headers.common.Authorization)
      //     console.log(res.data)
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line no-console
      //     console.log(error)
      //   })
    }
  }

  return (
    <div className={styles.login}>
      <div className='contentsInner'>
        <Greeting />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Input type='line' htmlFor='email' text='이메일'>
            <input
              type='text'
              id='email'
              placeholder='예)sobunsobun@subun.co.kr'
              {...register('email', { required: true })}
            />
          </Input>
          {errors.email?.type === 'required' && <span className={styles.guide}> 이메일을 입력해주세요</span>}
          <Input type='line' htmlFor='password' text='비밀번호'>
            <input type='password' id='password' {...register('password', { required: true })} />
          </Input>
          {errors.password?.type === 'required' && <span className={styles.guide}>비밀번호를 입력해주세요</span>}
          <div className={styles.buttonWrap}>
            <Button basic type='primary' text='로그인하기' submit />
            <Link to='/signup' className={styles.signupButton}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
