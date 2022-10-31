import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useSetRecoilState } from 'recoil'
import { authInfo } from 'recoil/user.atom'
import Button from 'components/Button/Button'
import { useCookies } from 'react-cookie'

import styles from './login.module.scss'

type FormValues = {
  email: string
  password: string
}

axios.defaults.baseURL = 'http://13.124.221.119:8000'
axios.defaults.withCredentials = true

const EMAIL_REGEX = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm

const Login = () => {
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)
  // const [cookies, setCookie, removeCookie] = useCookies(['auth_token'])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    const v1 = EMAIL_REGEX.test(data.email)

    if (!v1) {
      alert('Invalid Entry')
      return
    }

    try {
      const response = await axios.post('/user/login', data)
      // if()
      const { access } = response.data
      axios.defaults.headers.common.Authorization = `Bearer ${access}`
      // localStorage.setItem('auth_token', accessToken)
      // navigate('/')
      axios.get('/user/me').then((res) => {
        console.log(res)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.login}>
      <div className='contentsInner'>
        {loginSuccess ? (
          <section>
            <p>로그인 되었습니다.</p>
          </section>
        ) : (
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
            <Button type='primary' text='로그인하기' submit />
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
