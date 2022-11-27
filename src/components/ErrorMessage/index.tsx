import React, { memo } from 'react'
import styles from './errorMessage.module.scss'

interface Props {
  children?: React.ReactNode
}

const ErrorMessage = memo(({ children }: Props) => {
  return <div className={styles.errorMessage}>{children}</div>
})

ErrorMessage.displayName = 'ErrorMessage'
export default ErrorMessage
