import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import { useSetRecoilState } from 'recoil'
import { authInfo } from 'recoil/user.atom'

import Greeting from 'components/Greeting'
import styles from './login.module.scss'

type FormValues = {
  email: string
  password: string
}

axios.defaults.baseURL = 'http://13.124.221.119:8000'
axios.defaults.withCredentials = true

const EMAIL_REGEX = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm
const JWT_EXPIRY_TIME = 24 * 3600 * 1000

const Login = () => {
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    axios
      .post('/user/login', data)
      .then(onLoginSuccess)
      .catch((error) => {
        console.log(error)
      })
  }

  const onLoginSuccess = (response: any) => {
    const { access } = response.data
    console.log(access)

    if (response.status === 201) {
      // accessToken 설정
      axios.defaults.headers.common.Authorization = `Bearer ${access}`
      axios
        .get('/user/me')
        .then((res) => {
          console.log(axios.defaults.headers.common.Authorization)
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className={styles.login}>
      <div className='contentsInner'>
        <Greeting />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <div className={styles.line}>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' className={styles.textInput} {...register('email', { required: true })} />
            {errors.email?.type === 'required' && <span className={styles.guide}> 이메일을 입력해주세요</span>}
          </div>
          <div className={styles.line}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className={styles.textInput}
              {...register('password', { required: true })}
            />
            {errors.password?.type === 'required' && <span className={styles.guide}>비밀번호를 입력해주세요</span>}
          </div>
          <Button basic type='primary' text='로그인하기' submit />
        </form>
      </div>
    </div>
  )
}

export default Login
