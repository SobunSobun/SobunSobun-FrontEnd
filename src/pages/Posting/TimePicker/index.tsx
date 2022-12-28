import { Dispatch, SetStateAction, useEffect } from 'react'
import cx from 'classnames'
import { useRecoilValue, useRecoilState } from 'recoil'

import { postingDateState, postingTimeState, postingModalState, isEditDefaultValue } from 'recoil/post.atom'

import styles from './timePicker.module.scss'

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>
  propTime?: string
}

const TimePicker = ({ onClick, propTime }: Props) => {
  const isDefaultValue = useRecoilValue(isEditDefaultValue)
  const [time, setTime] = useRecoilState(postingTimeState)
  const [date, setDate] = useRecoilState(postingDateState)
  const valueUpdate = useRecoilValue(postingModalState)

  // 상세에서 불러온 데이터 일 때만 실행
  useEffect(() => {
    if (propTime && isDefaultValue) {
      const timeArr = propTime.split(' ')
      const timeAll = timeArr[4].split(':')
      const timeSlot = Number(timeAll[0]) >= 12 ? 'PM' : 'AM'
      let timeHour = timeSlot === 'PM' ? Number(timeAll[0]) - 12 : timeAll[0]
      if (timeHour < 10 && String(timeHour).length < 2) {
        timeHour = `0${String(timeHour)}`
      }
      const timeMinutes = timeAll[1]
      setTime({ slot: timeSlot, hour: String(timeHour), minutes: timeMinutes })
      setDate(new Date(`${timeArr[0]} ${timeArr[1]} ${timeArr[2]} ${timeArr[3]}`))
    }
  }, [isDefaultValue, propTime, setDate, setTime])

  return (
    <div className={styles.timePicker}>
      <button
        type='button'
        className={cx(styles.popupBtn, { [styles.update]: valueUpdate || propTime })}
        onClick={() => onClick(true)}
      >
        <span className={styles.label}>만날 시간</span>
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
  )
}

export default TimePicker
