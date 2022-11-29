import { ReactNode } from 'react'
import cx from 'classnames'
import styles from './header.module.scss'

interface Props {
  leftChild?: ReactNode
  headText?: string
  rightChild?: ReactNode
  largeText?: boolean
}

const Header = ({ leftChild, headText, rightChild, largeText = false }: Props) => {
  return (
    <header className={styles.header}>
      {leftChild && <div className={cx({ [styles.leftChild]: headText })}>{leftChild}</div>}
      {headText && <h2 className={cx(styles.headText, { [styles.largeText]: largeText })}>{headText}</h2>}
      {rightChild && <div className={styles.rightChild}>{rightChild}</div>}
    </header>
  )
}

export default Header
