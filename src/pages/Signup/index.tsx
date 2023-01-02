import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { region } from 'types'
import useModal from 'hooks/useModal'
import useSingup from 'hooks/useSignup'
import { FormValues } from 'types/signup'
import { Header, Button, TwoButtonModal } from 'components'
import { Email, Nickname, Password } from 'components/Signup'
import styles from './signup.module.scss'

const Signup = () => {
  const { state } = useLocation()
  const locationState = (state as { myRegion: region }).myRegion
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()
  const { handleSubmit } = useForm<FormValues>({ mode: 'onChange' })
  const [current, setCurrent] = useState({
    email: '',
    password: '',
    nickname: '',
  })
  const [currentValid, setCurrentValid] = useState({
    email: false,
    password: false,
    nickname: false,
  })

  const onChangeCurrent = (k: string, v: string) => {
    setCurrent({ ...current, [k]: v })
  }

  const onChangeValid = (k: string, v: boolean) => {
    setCurrentValid({ ...currentValid, [k]: v })
  }

  const { mutate: postSignupAPI, isLoading } = useSingup({
    state: { nickname: current.nickname, address_name: locationState.address_name },
  })

  const onSubmit = async () => {
    const formData = new FormData()
    formData.append('email', current.email)
    formData.append('password', current.password)
    formData.append('nickname', current.nickname)
    formData.append('location', locationState.address_name)
    formData.append('lat', locationState.location.lat)
    formData.append('lon', locationState.location.lon)
    postSignupAPI(formData)
  }

  return (
    <div className={styles.signup}>
      <Header largeText headText='회원가입' leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} />
      <div className='contentsInner'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Email currentValid={currentValid.email} onChangeValid={onChangeValid} onChangeCurrent={onChangeCurrent} />
          <Password onChangeValid={onChangeValid} onChangeCurrent={onChangeCurrent} />
          <Nickname
            currentValid={currentValid.nickname}
            onChangeValid={onChangeValid}
            onChangeCurrent={onChangeCurrent}
          />
          <div className={styles.signupBtn}>
            <Button
              type={!(currentValid.email && currentValid.nickname && currentValid.password) ? 'negative' : 'primary'}
              text='다음'
              isDisabled={!(currentValid.email && currentValid.nickname && currentValid.password)}
              submit
              loading={isLoading}
            />
          </div>
        </form>
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='회원가입을 종료하시겠습니까?'
        yesCallBack={() => {
          navigate('/intro')
        }}
      />
    </div>
  )
}

export default Signup
