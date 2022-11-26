import React from 'react'
import ModalLayout from './ModalLayout'
import styles from './modal.module.scss'

interface Props {
  show: boolean
  close: () => void
  message: string
  yesCallBack: () => void
}

const TwoButtonModal = ({ show, close, message, yesCallBack }: Props) => {
  return (
    <ModalLayout show={show}>
      <div className={styles.twoButton_container}>
        <pre>{message}</pre>
        <section className={styles.twoButton_buttonSection}>
          <button type='button' onClick={yesCallBack}>
            예
          </button>
          <button type='button' onClick={close}>
            아니오
          </button>
        </section>
      </div>
    </ModalLayout>
  )
}

export default TwoButtonModal
