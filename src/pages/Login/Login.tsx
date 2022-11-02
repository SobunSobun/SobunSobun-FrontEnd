import { useForm } from 'react-hook-form'
import axios from 'axios'
import Button from 'components/Button'
import styles from './login.module.scss'

type FormValues = {
  userId: string
  userPassword: string
}

function logInAPI(data: FormValues) {
  return axios.post('/user/login', data)
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => logInAPI(data))

  return (
    <div className={styles.login}>
      <div className='contentsInner'>
        <form onSubmit={onSubmit} autoComplete='off'>
          <div className={styles.line}>
            <label htmlFor='userId'>Email</label>
            <input type='text' id='userId' className={styles.textInput} {...register('userId', { required: true })} />
            {errors.userId?.type === 'required' && <span className={styles.guide}> 이메일을 입력해주세요</span>}
          </div>
          <div className={styles.line}>
            <label htmlFor='userPassword'>Password</label>
            <input
              type='password'
              id='userPassword'
              className={styles.textInput}
              {...register('userPassword', { required: true })}
            />
            {errors.userPassword?.type === 'required' && <span className={styles.guide}>비밀번호를 입력해주세요</span>}
          </div>
          <Button type='primary' text='로그인하기' submit />
        </form>
      </div>
    </div>
  )
}

export default Login
