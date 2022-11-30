import React from 'react'
import styles from './noresult.module.scss'

interface Props {
  message: string
}

const NoResult = ({ message }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h3>{message}</h3>
    </div>
  )
}

export default NoResult
