import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IMAGE_PATH } from 'assets/images'

import Button from 'components/Button'
import Input from 'components/Input'
import { EditIcon } from 'assets/svgs'
import cx from 'classnames'
import styles from './profile.module.scss'

type FormValues = {
  nickname: string
}

const Profile = () => {
  const [isEdit, setIsEidt] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
  return (
    <div className={styles.profile}>
      <div className='contentsInner'>
        <h3>마이페이지</h3>
        <div className={styles.top}>
          {/* <div className={cx(styles.image, { [styles.edit]: isEdit })}> */}
          <div className={cx(styles.image, { [styles.edit]: isEdit })}>
            <img src={IMAGE_PATH.profile} alt='프로필 이미지' />
            <EditIcon />
          </div>
          <p className={styles.greeting}>
            ZEONE님 <br className={styles.pcBlind} />
            안녕하세요!
          </p>
        </div>
        <form>
          <div className={styles.buttonWrap}>
            <Button
              type={isEdit ? 'negative' : 'primary'}
              text={isEdit ? '편집 완료' : '프로필 편집'}
              onClick={() => setIsEidt((prev) => !prev)}
            />
          </div>
          <Input type='round' htmlFor='nickname' text='닉네임'>
            <input
              type='text'
              id='nickname'
              className={styles.textInput}
              placeholder='닉네임은 최대 10자까지 가능합니다.'
              // {...register('nickname', {
              //   required: { value: true, message: '닉네임을 입력해주세요' },
              // })}
            />
          </Input>
          <Input type='round' htmlFor='nickname' text='이메일'>
            <input type='text' id='email' className={styles.textInput} readOnly value='favor@daum.net' />
          </Input>
        </form>
        <div className={styles.setting}>
          <p>설정</p>
          <button type='button'>로그아웃</button>
          <button type='button'>탈퇴하기</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
