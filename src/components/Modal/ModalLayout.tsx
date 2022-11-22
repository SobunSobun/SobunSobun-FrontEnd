import React, { ReactNode } from 'react'
import { cx } from 'styles'
import { ModalPortal } from 'utils/portal'
import styles from './modal.module.scss'

interface Props {
  children: ReactNode
  show: boolean
  width?: 'basic' | 'full' | 'small'
}

const ModalLayout = ({ children, show, width = 'basic' }: Props) => {
  return show ? (
    <ModalPortal>
      <div className={styles.outer}>
        <div className={styles.backGround}>
          <div className={cx(styles.inner, styles[width])}>{children}</div>
        </div>
      </div>
    </ModalPortal>
  ) : null
}

export default ModalLayout
