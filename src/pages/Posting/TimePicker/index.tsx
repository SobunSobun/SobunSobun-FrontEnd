import { Dispatch, SetStateAction } from 'react'
import cx from 'classnames'
import { useRecoilValue } from 'recoil'

import { postingDateState, postingTimeState, modalChangeState } from 'recoil/post.atom'

import styles from './timePicker.module.scss'

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>
}

const TimePicker = ({ onClick }: Props) => {
  const date = useRecoilValue(postingDateState)
  const time = useRecoilValue(postingTimeState)
  const valueUpdate = useRecoilValue(modalChangeState)

  return (
    <div className={styles.timePicker}>
      <button
        type='button'
        className={cx(styles.popupBtn, { [styles.update]: valueUpdate })}
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
