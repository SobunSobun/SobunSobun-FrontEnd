import { ReactNode } from 'react'
import styles from './header.module.scss'

interface Props {
  leftChild?: ReactNode
  headText?: string
  rightChild?: ReactNode
}

const Header = ({ leftChild, headText, rightChild }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftChild}>{leftChild}</div>
      <h2 className={styles.headText}>{headText}</h2>
      <div className={styles.rightChild}>{rightChild}</div>
    </header>
  )
}

export default Header
