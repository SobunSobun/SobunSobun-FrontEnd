import { useState } from 'react'
import { useRecoilState } from 'recoil'
import DatePicker from 'react-datepicker'
import Button from 'components/Button'
import { dateState } from 'recoil/post.atom'
import DropDown from 'components/DropDown'
import ModalLayout from './ModalLayout'
import styles from './modal.module.scss'

interface Props {
  show: boolean
  close: () => void
  // message: string
  // yesCallBack: () => void
}

const hourArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const minutesArr = ['00', '10', '20', '30', '40', '50']

const TimePickerModal = ({ show, close }: Props) => {
  const [localDate, setLocalDate] = useState(new Date())
  const [date, setDate] = useRecoilState(dateState)
  const handleSetData = () => {
    setDate(localDate)
    close()
  }

  return (
    <ModalLayout show={show}>
      <div className={styles.timePickerModal}>
        <p className={styles.title}>만날 날짜</p>
        <div className={styles.line}>
          <DatePicker
            className={styles.datePickerInput}
            selected={localDate}
            onChange={(pickDate: Date) => setLocalDate(pickDate)}
            inline
          />
        </div>
        <p className={styles.title}>만날 시간</p>
        <div className={styles.line}>
          <DropDown list={hourArr} />
          <span>시</span>
          <DropDown list={minutesArr} />
          <span>분</span>
        </div>
        <Button basic type='primary' text='확인' onClick={handleSetData} />
        {/* <Button basic type='primary' text='취소' onClick={handleSetData} /> */}
      </div>
    </ModalLayout>
  )
}

export default TimePickerModal
