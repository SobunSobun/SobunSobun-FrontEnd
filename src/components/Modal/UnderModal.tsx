import React from 'react'
import ModalLayout from './ModalLayout'
import styles from './modal.module.scss'

interface Props {
  show: boolean
  close: () => void
  items: Array<{
    name: string
    callback: () => void
  }>
}
const UnderModal = ({ show, close, items }: Props) => {
  return (
    <ModalLayout show={show} isBottom>
      <div className={styles.under_container}>
        <ul>
          {items.map((v) => (
            <li key={v.name}>
              <button type='button' className={styles.item} onClick={v.callback}>
                {v.name}
              </button>
            </li>
          ))}
        </ul>
        <button type='button' className={styles.cancel} onClick={close}>
          취소
        </button>
      </div>
    </ModalLayout>
  )
}

export default UnderModal
