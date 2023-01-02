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

const Nickname = ({ currentValid, onChangeValid, onChangeCurrent }: Props) => {
  const [nicknameDuplicate, setNicknameDuplicate] = useState('')
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })
  const nicknameCurrent = watch('nickname')

  const nicknameDuplicateCheck = async (_nickData: SignupFormValues['nickname']) => {
    try {
      const formData = new FormData()
      formData.append('nickname', _nickData)
      if (nicknameCurrent && errors.nickname?.type !== 'maxLength') {
        await getInstance()
          .post('/join/nicknameDuplicateCheck', formData)
          .then((response) => {
            if (response.data === '가입 가능한 닉네임') {
              onChangeValid('nickname', true)
              setNicknameDuplicate('멋진 닉네임이네요!')
            } else {
              onChangeValid('nickname', false)
              setNicknameDuplicate('중복된 닉네임입니다.')
            }
          })
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  useEffect(() => {
    onChangeCurrent('nickname', nicknameCurrent)
    setNicknameDuplicate('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicknameCurrent])

  return (
    <div className={styles.formBox}>
      <Input htmlFor='nickname' text='닉네임'>
        <input
          type='text'
          id='nickname'
          className={styles.textInput}
          placeholder='닉네임을 입력해주세요.'
          {...register('nickname', {
            required: { value: true, message: '필수 정보입니다.' },
            maxLength: { value: 6, message: '6자 이하로 입력해주세요.' },
            onChange: () => onChangeValid('nickname', false),
          })}
        />
        <Button
          secondary
          type={currentValid ? 'primary' : 'secondary'}
          text='중복체크'
          onClick={() => nicknameDuplicateCheck(nicknameCurrent)}
        />
      </Input>
      <ErrorMessage>
        <span className={cx({ [styles.green]: currentValid })}>{nicknameDuplicate}</span>
        {errors.nickname?.type === 'required' && errors.nickname.message}
        {errors.nickname?.type === 'maxLength' && errors.nickname.message}
      </ErrorMessage>
    </div>
  )
}

export default Nickname
