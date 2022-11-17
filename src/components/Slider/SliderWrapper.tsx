import React, { ReactNode } from 'react'

import styles from './slider.module.scss'

interface Props {
  children: ReactNode
}

const SliderWrapper = ({ children }: Props) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <ul>{children}</ul>
      </div>
    </div>
  )
}
export default SliderWrapper
