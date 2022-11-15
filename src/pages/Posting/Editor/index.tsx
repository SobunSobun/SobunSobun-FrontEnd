import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cx } from 'styles'
import { useRecoilState } from 'recoil'
import { dateState } from 'recoil/post.atom'

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
  const [date, setDate] = useRecoilState(dateState)
  const [slot, setSlot] = useState('AM')
  const [hour, setHour] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const { isOpen, onClose, setIsOpen } = useModal()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const handleIncrease = () => {
    setCount((prev) => prev + 1)
  }
  const handleDecrease = () => {
    if (count > 2) {
      setCount((prev) => prev - 1)
    }
  }

  const handleTimpicker = () => {
    console.log('time picker')
  }

  const handleOpenDatePopup = () => {
    console.log('팝업오픈')
  }

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
            <button type='button' onClick={handleDecrease}>
              <MinusIcon />
            </button>
            <span className={styles.current}>{count}</span>
            <button type='button' onClick={handleIncrease}>
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
              <span className={styles.slot}>{slot}</span>
              <span className={styles.num}>{hour}</span>
              <span className={styles.semi}>:</span>
              <span className={styles.num}>{minutes}</span>
            </button>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type='negative' text='다음' onClick={handleUpload} />
        </div>
      </form>
      <TimePickerModal show={isOpen} close={onClose} />
    </div>
  )
}

export default Editor
