import { ChangeEvent, useEffect, useState, Dispatch, SetStateAction, FormEvent } from 'react'
import cx from 'classnames'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
  postingCountState,
  postingDateState,
  postingTimeState,
  postingPlaceState,
  categoryState,
  modalChangeState,
} from 'recoil/post.atom'

import { useCreatePost, useEditPost } from 'hooks/usePosting'
import { detailData } from 'types'

import TimePickerModal from 'pages/Posting/TimpickerModal'
import MapModal from 'pages/Posting/MapModal'
import Button from 'components/Button'

import { ArrowPrevIcon } from 'assets/svgs'

import Counter from '../Counter'
import TimePicker from '../TimePicker'

import './datepicker_custom.css'
import styles from './editor.module.scss'

interface Props {
  isEdit: boolean
  postId?: string
  data?: detailData
  localTitle: string
  localContent: string
  setLocalTitle: Dispatch<SetStateAction<string>>
  setLocalContent: Dispatch<SetStateAction<string>>
}

const Editor = ({
  isEdit,
  postId,
  data: propData,
  localTitle,
  setLocalTitle,
  localContent,
  setLocalContent,
}: Props) => {
  const date = useRecoilValue(postingDateState)
  const time = useRecoilValue(postingTimeState)
  const [market, setMarket] = useRecoilState(postingPlaceState)
  const category = useRecoilValue(categoryState)
  const valueUpdate = useRecoilValue(modalChangeState)
  const [count, setCount] = useRecoilState(postingCountState)
  const [fullTime, setFullTime] = useState('')
  const [timePickerModal, setTimePickerModal] = useState(false)
  const [mapModal, setMapModal] = useState(false)

  const { mutate: newPostAPI } = useCreatePost()
  const { mutate: editPostAPI } = useEditPost()

  // edit 에서 불러온 데이터 일 때만 실행
  useEffect(() => {
    if (propData) {
      setLocalTitle(propData.title)
      setLocalContent(propData.content)
      setCount(propData.recruitmentNumber)
      setMarket({ place: propData.market, address: propData.marketAddress })
    }
  }, [propData, setCount, setLocalContent, setLocalTitle, setMarket])

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.currentTarget.value)
  }
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.currentTarget.value)
  }

  const handleColor = () => {
    let status: 'primary' | 'negative' = 'negative'
    const common = localTitle && localContent && market
    if (isEdit) {
      status = common ? 'primary' : 'negative'
    } else {
      status = common && valueUpdate ? 'primary' : 'negative'
    }
    return status
  }

  const handleFormData = () => {
    const formData = new FormData()
    formData.append('title', localTitle)
    formData.append('content', localContent)
    formData.append('recruitmentNumber', String(count))
    formData.append('category', category)
    formData.append('market', market.place)
    formData.append('meetingTime', fullTime)
    formData.append('marketAddress', market.address)

    return formData
  }

  const handleNewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = handleFormData()
    newPostAPI(formData)
  }

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = handleFormData()
    editPostAPI({ postId, formData })
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
      <form className={styles.form} onSubmit={isEdit ? handleEditSubmit : handleNewSubmit} autoComplete='off'>
        <div className={styles.line}>
          <input
            className={styles.textInput}
            type='text'
            id='title'
            maxLength={24}
            placeholder='제목을 입력해주세요.(24자 내외)'
            value={localTitle}
            onChange={handleChangeTitle}
          />
        </div>
        <div className={styles.line}>
          <textarea
            className={cx(styles.textarea, { [styles.highlight]: isEdit })}
            id='content'
            placeholder='내용을 입력해주세요'
            value={localContent}
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
          <Button basic type={handleColor()} text='완료' submit isDisabled={handleColor() === 'negative'} />
        </div>
      </form>
      <TimePickerModal show={timePickerModal} close={() => setTimePickerModal(false)} isEdit={isEdit} />
      <MapModal show={mapModal} close={() => setMapModal(false)} />
    </div>
  )
}

export default Editor
