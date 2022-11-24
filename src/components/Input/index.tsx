import React, { memo } from 'react'
import cx from 'classnames'

import styles from './input.module.scss'

interface Props {
  type?: 'basic' | 'round'
  text?: string
  htmlFor: string
  children?: React.ReactNode
}

const Input = memo(({ text, htmlFor, children, type = 'basic' }: Props) => {
  return (
    <div className={cx(styles.input, styles[type])}>
      <label htmlFor={htmlFor}>{text}</label>
      {children}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
