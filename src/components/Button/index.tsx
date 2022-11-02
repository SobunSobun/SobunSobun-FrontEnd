import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'

import styles from './button.module.scss'

interface Props {
  type: 'back' | 'like' | 'more' | 'primary' | 'secondary' | 'nagative'
  onClick?: () => void
  text?: string
  submit?: true
}

const Button = memo(({ type, onClick, text, submit }: Props) => {
  const navigate = useNavigate()
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={cx(styles.button, styles[type])}
      onClick={type === 'back' ? () => navigate(-1) : onClick}
    >
      {text}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
