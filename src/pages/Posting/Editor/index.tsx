import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cx } from 'styles'
import { useRecoilValue } from 'recoil'
import { postingDateState, postingTimeState } from 'recoil/post.atom'

import Button from 'components/Button'
import TimePickerModal from 'pages/Posting/TimpickerModal'

import useModal from 'hooks/useModal'

import { MinusIcon, PlusIcon, ArrowPrevIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './editor.module.scss'

// import { axiosAuthApi } from 'apis/client'

type FormValues = {
  title: string
  content: string
}

const onSubmit = async (data: FormValues) => {
  const formData = new FormData()
  formData.append('email', data.title)
  formData.append('password', data.content)
  try {
    // const response = await axiosAuthApi.post('/login', formData)
    console.log('response')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

const Editor = () => {
  const [count, setCount] = useState<number>(2)
  const date = useRecoilValue(postingDateState)
  const time = useRecoilValue(postingTimeState)
  const { isOpen, onClose, setIsOpen } = useModal()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const handleUpload = () => {
    console.log('게시글 업로드')
  }

  return (
    <div className={styles.editor}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className={styles.line}>
          <input
            className={styles.textInput}
            type='text'
            id='title'
            maxLength={30}
            placeholder='제목을 입력해주세요.(30자 내외)'
            {...register('title', { required: true })}
          />
        </div>
        <div className={styles.line}>
          <textarea
            className={styles.textarea}
            id='content'
            placeholder='내용을 입력해주세요'
            {...register('content', { required: true })}
          />
        </div>
        <div className={styles.line}>
          <label htmlFor='count' className={styles.label}>
            모집 인원
          </label>
          <div className={styles.counter}>
            <button type='button' onClick={() => setCount(count - 1)}>
              <MinusIcon />
            </button>
            <span className={styles.current}>{count}</span>
            <button type='button' onClick={() => setCount(count + 1)}>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className={cx(styles.line, styles.noPadding)}>
          <button type='button' className={styles.place}>
            <p className={styles.label}>만날 장소</p>
            <ArrowPrevIcon className={styles.arrow} />
          </button>
        </div>
        <div className={styles.line}>
          <label htmlFor='time' className={styles.label}>
            만날 시간
          </label>
          <div className={styles.timePicker}>
            <button type='button' className={styles.popupBtn} onClick={() => setIsOpen(true)}>
              <span className={styles.num}>{date.getMonth() + 1}</span>
              <span className={styles.unit}>월 </span>
              <span className={styles.num}>{date.getDate()}</span>
              <span className={styles.unit}>일</span>
              <span className={styles.slot}>{time.slot}</span>
              <span className={styles.num}>{time.hour}</span>
              <span className={styles.semi}>:</span>
              <span className={styles.num}>{time.minutes}</span>
            </button>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type='negative' text='완료' onClick={handleUpload} />
        </div>
      </form>
      <TimePickerModal show={isOpen} close={onClose} />
    </div>
  )
}

export default Editor
