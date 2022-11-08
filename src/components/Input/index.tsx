import React, { memo } from 'react'
import cx from 'classnames'

import styles from './input.module.scss'

interface Props {
  type: 'line'
  text?: string
  htmlFor: string
  children?: React.ReactNode
}

const Input = memo(({ type, text, htmlFor, children }: Props) => {
  return (
    <div className={(cx(styles.input), styles[type])}>
      <label htmlFor={htmlFor}>{text}</label>
      {children}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
