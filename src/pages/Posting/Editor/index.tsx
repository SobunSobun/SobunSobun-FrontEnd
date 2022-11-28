import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import { useRecoilValue } from 'recoil'

import {
  postingDateState,
  postingTimeState,
  postingPlaceState,
  categoryState,
  modalChangeState,
} from 'recoil/post.atom'
import { authInstance } from 'apis/client'
import { ArrowPrevIcon } from 'assets/svgs'

import Button from 'components/Button'
import TimePickerModal from 'pages/Posting/TimpickerModal'
import MapModal from 'pages/Posting/MapModal'
import Counter from '../Counter'
import TimePicker from '../TimePicker'

import './datepicker_custom.css'
import styles from './editor.module.scss'

interface Props {
  isEdit: boolean
}
interface FormValues {
  title: string
  content: string
  recruitmentNumber: string
  category: string
  meetingTime: string
  market: string
}
// eslint-disable-next-line
const Editor = ({ isEdit }: Props) => {
  const navigate = useNavigate()

  const date = useRecoilValue(postingDateState)
  const time = useRecoilValue(postingTimeState)
  const market = useRecoilValue(postingPlaceState)
  const category = useRecoilValue(categoryState)
  const valueUpdate = useRecoilValue(modalChangeState)
  const [count, setCount] = useState<number>(2)
  const [fullTime, setFullTime] = useState('')
  const [timePickerModal, setTimePickerModal] = useState(false)
  const [mapModal, setMapModal] = useState(false)
  const { register, handleSubmit, watch } = useForm<FormValues>()

  const watchTitleValue = watch('title', '')
  const watchContentValue = watch('content', '')

  const handleColor = () => {
    if (market && valueUpdate && watchTitleValue && watchContentValue) {
      return 'primary'
    }
    return 'negative'
  }

  const handleDisabled = () => {
    return handleColor() === 'negative'
  }

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('recruitmentNumber', String(count))
    formData.append('category', category)
    formData.append('market', market.place)
    formData.append('meetingTime', fullTime)
    formData.append('marketAddress', market.address)

    try {
      const response = await authInstance.post('/post/register', formData)
      // eslint-disable-next-line no-console
      console.log(response)
      navigate('/upload-complete', { state: { type: '작성' } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
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
            maxLength={24}
            placeholder='제목을 입력해주세요.(24자 내외)'
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
          <p className={styles.label}>모집 인원</p>
          <Counter count={count} setCount={setCount} />
        </div>
        <div className={cx(styles.line, styles.noPadding)}>
          <button type='button' className={styles.place} onClick={() => setMapModal(true)}>
            <span className={styles.label}>만날 장소</span>
            {market.place ? (
              <span className={styles.placeName}>{market.place}</span>
            ) : (
              <ArrowPrevIcon className={styles.arrow} />
            )}
          </button>
        </div>
        <div className={cx(styles.line, styles.noPadding)}>
          <TimePicker onClick={setTimePickerModal} />
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type={handleColor()} text='완료' submit isDisabled={handleDisabled()} />
        </div>
      </form>
      <TimePickerModal show={timePickerModal} close={() => setTimePickerModal(false)} />
      <MapModal show={mapModal} close={() => setMapModal(false)} />
    </div>
  )
}

export default Editor
