import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import cx from 'classnames'
import DatePicker from 'react-datepicker'
import { postingDateState, postingTimeState, postingModalState, isEditDefaultValue } from 'recoil/post.atom'
import { DropDown, Button, ModalLayout } from 'components'

import { ModalPropsType } from 'types'

import { DotsIcon } from 'assets/svgs'
import styles from './timePickerModal.module.scss'

const slotArr = ['AM', 'PM']
const hourArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
const minutesArr = ['00', '10', '20', '30', '40', '50']

const TimePickerModal = ({ show, close }: ModalPropsType) => {
  const [date, setDate] = useRecoilState(postingDateState)
  const [time, setTime] = useRecoilState(postingTimeState)
  const setIsDefaultValue = useSetRecoilState(isEditDefaultValue)
  const setTimeChange = useSetRecoilState(postingModalState)
  const [localDate, setLocalDate] = useState(date)
  const [localSlot, setLocalSlot] = useState(time.slot)
  const [localHour, setLocalHour] = useState(time.hour)
  const [localMinutes, setLocalMinutes] = useState(time.minutes)

  useEffect(() => {
    setLocalDate(date)
    setLocalSlot(time.slot)
    setLocalHour(time.hour)
    setLocalMinutes(time.minutes)
  }, [time.slot, time.hour, time.minutes, date])

  const handleSetData = () => {
    setIsDefaultValue(false)
    if (localDate !== date || localSlot !== time.slot || localHour !== time.hour || localMinutes !== time.minutes) {
      setTimeChange(true)
    }
    setDate(localDate)
    setTime({ slot: localSlot, hour: localHour, minutes: localMinutes })
    close()
  }

  const handleClosePopup = () => {
    setLocalDate(date)
    setLocalSlot(time.slot)
    setLocalHour(time.hour)
    setLocalMinutes(time.minutes)

    close()
  }

  const handleChangeTime = (setState: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value)
  }

  return (
    <ModalLayout show={show} width='small'>
      <div className={styles.timePickerModal}>
        <p className={styles.title}>소분 날짜</p>
        <div className={styles.line}>
          <DatePicker
            className={styles.datePickerInput}
            minDate={new Date()}
            selected={localDate}
            onChange={(pickDate: Date) => setLocalDate(pickDate)}
            inline
          />
        </div>
        <p className={styles.title}>소분 시간</p>
        <div className={cx(styles.line, styles.dropdownWrap)}>
          <DropDown
            list={slotArr}
            value={localSlot}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeTime(setLocalSlot, e)}
          />
          <DropDown
            list={hourArr}
            value={localHour}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeTime(setLocalHour, e)}
          />
          <DotsIcon className={styles.semi} />
          {/* <span className={styles.semi}>:</span> */}
          <DropDown
            list={minutesArr}
            value={localMinutes}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeTime(setLocalMinutes, e)}
          />
        </div>
        <div className={styles.buttonWrap}>
          <Button type='primary' text='확인' onClick={handleSetData} />
        </div>
        <button type='button' onClick={handleClosePopup} className={styles.closeBtn}>
          닫기
        </button>
      </div>
    </ModalLayout>
  )
}

export default TimePickerModal
