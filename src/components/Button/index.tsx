import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'

import styles from './button.module.scss'

interface Props {
  type: 'back' | 'like' | 'more' | 'primary' | 'secondary' | 'negative' | 'customBack'
  onClick?: () => void
  text?: string
  submit?: true
  basic?: true
  isDisabled?: boolean
}

const Button = memo(({ type, onClick, text, submit, basic, isDisabled = false }: Props) => {
  const navigate = useNavigate()
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={cx(styles.button, styles[type], { [styles.basic]: basic })}
      onClick={type === 'back' ? () => navigate(-1) : onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
