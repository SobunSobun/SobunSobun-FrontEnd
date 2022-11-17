import React, { ReactNode } from 'react'
import { ModalPortal } from 'utils/portal'
import styles from './modal.module.scss'

interface Props {
  children: ReactNode
  show: boolean
}

const ModalLayout = ({ children, show }: Props) => {
  return show ? (
    <ModalPortal>
      <div className={styles.outer}>
        <div className={styles.backGround}>
          <div className={styles.inner}>{children}</div>
        </div>
      </div>
    </ModalPortal>
  ) : null
}

export default ModalLayout
