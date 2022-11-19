import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cx } from 'styles'
import { useRecoilValue } from 'recoil'
import { postingDateState, postingTimeState, postingPlaceState } from 'recoil/post.atom'

import Button from 'components/Button'
import TimePickerModal from 'pages/Posting/TimpickerModal'
import MapModal from 'pages/Posting/MapModal'

import useModal from 'hooks/useModal'
import { authInstance } from 'apis/client'
import { useLocation, useNavigate } from 'react-router-dom'
import { MinusIcon, PlusIcon, ArrowPrevIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './editor.module.scss'

interface FormValues {
  title: string
  content: string
  recruitmentNumber: string
  category: string
  meetingTime: string
  market: string
}

interface RouteState {
  state: {
    category: string
  }
}

const onSubmit = async (data: FormValues) => {
  const formData = new FormData()
  // formData.append('title', '제목임당')
  // formData.append('content', '내용임당')
  // formData.append('recruitmentNumber', '5')
  // formData.append('category', '가지')
  // formData.append('meetingTime', '10:30')
  // formData.append('market', '소분마켓')
  // formData.append('location', '주소')
  formData.append('title', data.title)
  formData.append('content', data.content)
  formData.append('recruitmentNumber', data.recruitmentNumber)
  formData.append('category', data.category)
  formData.append('meetingTime', data.meetingTime)
  formData.append('market', data.market)

  try {
    const response = await authInstance.post('/post/register', formData)
    console.log(response)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

const Editor = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as RouteState

  const [count, setCount] = useState<number>(2)
  const date = useRecoilValue(postingDateState)
  const time = useRecoilValue(postingTimeState)
  const market = useRecoilValue(postingPlaceState)
  const [fullTime, setFullTime] = useState('')
  const [timePickerModal, setTimePickerModal] = useState(false)
  const [mapModal, setMapModal] = useState(false)
  // const { isOpen, onClose, setIsOpen } = useModal()
  const {
    register,
    handleSubmit,
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

  const handleMoveToMap = () => {
    navigate('/map')
  }

  useEffect(() => {
    const transHour = time.slot === 'PM' ? Number(time.hour) + 12 : time.hour
    const timeString = new Date(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${transHour}:${time.minutes}:00`
    )
    setFullTime(String(timeString))
  }, [time.slot, time.hour, time.minutes, date])

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
          <input type='hidden' id='category' value={state.category} {...register('category', { required: true })} />
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
            <input
              type='text'
              className={styles.current}
              id='recruitmentNumber'
              value={count}
              {...register('recruitmentNumber', { required: true })}
            />
            <button type='button' onClick={handleIncrease}>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className={cx(styles.line, styles.noPadding)}>
          <button type='button' className={styles.place} onClick={() => setMapModal(true)}>
            <p className={styles.label}>만날 장소</p>
            <ArrowPrevIcon className={styles.arrow} />
          </button>
          <input type='text' id='market' value={market.place} {...register('market', { required: true })} />
          {/* <input type='hidden' id='address' value={market.address} {...register('address', { required: true })} /> */}
        </div>
        <div className={styles.line}>
          <label htmlFor='time' className={styles.label}>
            만날 시간
          </label>
          <div className={styles.timePicker}>
            <button type='button' className={styles.popupBtn} onClick={() => setTimePickerModal(true)}>
              <span className={styles.num}>{date.getMonth() + 1}</span>
              <span className={styles.unit}>월 </span>
              <span className={styles.num}>{date.getDate()}</span>
              <span className={styles.unit}>일</span>
              <span className={styles.slot}>{time.slot}</span>
              <span className={styles.num}>{time.hour}</span>
              <span className={styles.semi}>:</span>
              <span className={styles.num}>{time.minutes}</span>
            </button>
            <input type='hidden' id='meetingTime' value={fullTime} {...register('meetingTime', { required: true })} />
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type='primary' text='완료' submit />
        </div>
      </form>
      <TimePickerModal show={timePickerModal} close={() => setTimePickerModal(false)} />
      <MapModal show={mapModal} close={() => setMapModal(false)} />
    </div>
  )
}

export default Editor
