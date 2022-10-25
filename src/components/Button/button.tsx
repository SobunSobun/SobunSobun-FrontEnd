import cx from 'classnames'
import { memo } from 'react'

import styles from './button.module.scss'

interface Props {
  type: 'back' | 'like' | 'more' | 'primary' | 'secondary' | 'nagative'
  onClick: () => void
  text: string
}

const Button = memo(({ type, onClick, text }: Props) => {
  return (
    <button type='button' className={cx(styles.button, styles[type])} onClick={onClick}>
      {text}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
