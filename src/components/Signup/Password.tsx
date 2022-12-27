import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'components/Input'
import ErrorMessage from 'components/ErrorMessage'
import { FormValues, CurrentType, ValidType } from 'types/signup'
import styles from '../../pages/Signup/signup.module.scss'

interface Props {
  onChangeValid: ValidType
  onChangeCurrent: CurrentType
}

const Password = ({ onChangeValid, onChangeCurrent }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })
  const passwordCurrent = watch('password')
  const passwordConfirm = watch('passwordConfirm')

  useEffect(() => {
    onChangeCurrent('password', passwordCurrent)
    if (passwordCurrent === passwordConfirm) {
      onChangeValid('password', true)
    } else {
      onChangeValid('password', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordCurrent, passwordConfirm])

  return (
    <>
      <div className={styles.formBox}>
        <Input htmlFor='password' text='비밀번호'>
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
        <ErrorMessage>
          {errors.password?.type === 'required' && errors.password.message}
          {errors.password?.type === 'minLength' && errors.password.message}
        </ErrorMessage>
      </div>
      <div className={styles.formBox}>
        <Input htmlFor='passwordConfirm' text='비밀번호 확인'>
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
        <ErrorMessage>
          {errors.passwordConfirm?.type === 'required' && errors.passwordConfirm.message}
          {errors.passwordConfirm?.type === 'validate' && '비밀번호가 일치하지 않습니다.'}
        </ErrorMessage>
      </div>
    </>
  )
}

export default Password
