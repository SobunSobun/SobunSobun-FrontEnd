import { ReactNode } from 'react'
import styles from 'styles'

interface Props {
  leftChild?: ReactNode
  headText?: string
  rightChild?: ReactNode
}

const Header = ({ leftChild, headText, rightChild }: Props) => {
  return (
    <header>
      <div className={styles.btnLeft}>{leftChild}</div>
      <div className={styles.headText}>{headText}</div>
      <div className={styles.btnRight}>{rightChild}</div>
    </header>
  )
}

export default Header
