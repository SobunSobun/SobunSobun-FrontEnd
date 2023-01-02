import { useEffect, useState } from 'react'
import { cx } from 'styles'
import { useForm } from 'react-hook-form'
import { getInstance } from 'apis/client'
import { Button, Input, ErrorMessage } from 'components'
import { FormValues, SignupFormValues, CurrentType, ValidType } from 'types/signup'
import styles from '../../pages/Signup/signup.module.scss'

interface Props {
  currentValid: boolean
  onChangeValid: ValidType
  onChangeCurrent: CurrentType
}

const Email = ({ currentValid, onChangeValid, onChangeCurrent }: Props) => {
  const [emailDuplicate, setEmailDuplicate] = useState('')
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })
  const emailCurrent = watch('email')

  const emailDuplicateCheck = async (_emailData: SignupFormValues['email']) => {
    try {
      const formData = new FormData()
      formData.append('email', _emailData)
      if (emailCurrent && errors.email?.type !== 'pattern') {
        await getInstance()
          .post('/join/emailDuplicateCheck', formData)
          .then((response) => {
            if (response.data === '가입 가능한 이메일') {
              onChangeValid('email', true)
              setEmailDuplicate('사용 가능한 이메일입니다.')
            } else {
              onChangeValid('email', false)
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
    onChangeCurrent('email', emailCurrent)
    setEmailDuplicate('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailCurrent])

  return (
    <div className={styles.formBox}>
      <Input htmlFor='email' text='이메일주소'>
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
            onChange: () => onChangeValid('email', false),
          })}
        />
        <Button
          secondary
          type={currentValid ? 'primary' : 'secondary'}
          text='중복체크'
          onClick={() => emailDuplicateCheck(emailCurrent)}
        />
      </Input>
      <ErrorMessage>
        <span className={cx({ [styles.green]: currentValid })}>{emailDuplicate}</span>
        {errors.email?.type === 'required' && errors.email.message}
        {errors.email?.type === 'pattern' && errors.email.message}
      </ErrorMessage>
    </div>
  )
}

export default Email
