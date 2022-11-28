import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
  postingTitleState,
  postingContentState,
  postingCountState,
  postingDateState,
  postingTimeState,
  postingPlaceState,
  categoryState,
  modalChangeState,
} from 'recoil/post.atom'
import { authInstance } from 'apis/client'

import Button from 'components/Button'
import TimePickerModal from 'pages/Posting/TimpickerModal'
import MapModal from 'pages/Posting/MapModal'
import { detailData } from 'types'
import { ArrowPrevIcon } from 'assets/svgs'

import Counter from '../Counter'
import TimePicker from '../TimePicker'

import './datepicker_custom.css'
import styles from './editor.module.scss'

interface Props {
  isEdit: boolean
  postId?: string
  data?: detailData
}
// interface FormValues {
//   title: string
//   content: string
//   recruitmentNumber: string
//   category: string
//   meetingTime: string
//   market: string
// }

const Editor = ({ isEdit, postId, data: propData }: Props) => {
  const navigate = useNavigate()
  const [titleValue, setTitleValue] = useRecoilState(postingTitleState)
  const [contentValue, setContentValue] = useRecoilState(postingContentState)
  const date = useRecoilValue(postingDateState)
  const time = useRecoilValue(postingTimeState)
  const [market, setMarket] = useRecoilState(postingPlaceState)
  const category = useRecoilValue(categoryState)
  const valueUpdate = useRecoilValue(modalChangeState)
  const [count, setCount] = useRecoilState(postingCountState)
  const [fullTime, setFullTime] = useState('')
  const [timePickerModal, setTimePickerModal] = useState(false)
  const [mapModal, setMapModal] = useState(false)

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value)
  }
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.currentTarget.value)
  }

  // 불러온 데이터 일 때만 실행
  useEffect(() => {
    if (propData) {
      setCount(propData.recruitmentNumber)
      setMarket({ place: propData.market, address: propData.marketAddress })
    }
  }, [propData, setCount, setMarket])

  const handleColor = () => {
    if (market && valueUpdate) {
      return 'primary'
    }
    return 'negative'
  }

  const handleDisabled = () => {
    return handleColor() === 'negative'
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('title', titleValue)
    formData.append('content', contentValue)
    formData.append('recruitmentNumber', String(count))
    formData.append('category', category)
    formData.append('market', market.place)
    formData.append('meetingTime', fullTime)
    formData.append('marketAddress', market.address)

    try {
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
      <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
        <div className={styles.line}>
          <input
            className={styles.textInput}
            type='text'
            id='title'
            maxLength={24}
            defaultValue={isEdit ? propData?.title : ''}
            placeholder='제목을 입력해주세요.(24자 내외)'
            value={titleValue}
            onChange={handleChangeTitle}
          />
        </div>
        <div className={styles.line}>
          <textarea
            className={styles.textarea}
            id='content'
            placeholder='내용을 입력해주세요'
            defaultValue={isEdit ? propData?.content : ''}
            value={contentValue}
            onChange={handleChangeContent}
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
          <TimePicker onClick={setTimePickerModal} propTime={propData?.meetingTime} />
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type={handleColor()} text='완료' submit isDisabled={handleDisabled()} />
        </div>
      </form>
      <TimePickerModal show={timePickerModal} close={() => setTimePickerModal(false)} isEdit={isEdit} />
      <MapModal show={mapModal} close={() => setMapModal(false)} />
    </div>
  )
}

export default Editor
