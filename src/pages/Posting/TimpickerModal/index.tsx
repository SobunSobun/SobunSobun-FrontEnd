import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import DatePicker from 'react-datepicker'
import Button from 'components/Button'
import { dateState } from 'recoil/post.atom'
import DropDown from 'components/DropDown'
import ModalLayout from 'components/Modal/ModalLayout'
import { CloseIcon } from 'assets/svgs'
import styles from './timePickerModal.module.scss'

interface Props {
  show: boolean
  close: () => void
  // message: string
  // yesCallBack: () => void
}

const slotArr = ['AM', 'PM']
const hourArr = ['00', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
const minutesArr = ['00', '10', '20', '30', '40', '50']

const TimePickerModal = ({ show, close }: Props) => {
  const [localDate, setLocalDate] = useState(new Date())
  const [localSlot, setLocalSlot] = useState('AM')
  const [localHour, setLocalHour] = useState('00')
  const [localMinutes, setLocalMinutes] = useState('00')
  const [date, setDate] = useRecoilState(dateState)
  const handleSetData = () => {
    setDate(localDate)
    close()
  }
  const handleChangeTime = (setState: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value)
  }

  return (
    <ModalLayout show={show}>
      <div className={styles.timePickerModal}>
        <p className={styles.title}>소분 날짜</p>
        <div className={styles.line}>
          <DatePicker
            className={styles.datePickerInput}
            selected={localDate}
            onChange={(pickDate: Date) => setLocalDate(pickDate)}
            inline
          />
        </div>
        <p className={styles.title}>소분 시간</p>
        <div className={styles.line}>
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
          <span className={styles.semi}>:</span>
          <DropDown
            list={minutesArr}
            value={localMinutes}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeTime(setLocalMinutes, e)}
          />
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type='primary' text='확인' onClick={handleSetData} />
        </div>
        <button type='button' onClick={close} className={styles.closeBtn}>
          <CloseIcon />
        </button>
      </div>
    </ModalLayout>
  )
}

export default TimePickerModal
