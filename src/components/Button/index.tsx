import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'

import styles from './button.module.scss'

interface Props {
  type: 'back' | 'like' | 'more' | 'primary' | 'secondary' | 'negative' | 'customBack' | 'white'
  onClick?: () => void
  text?: string
  submit?: boolean
  basic?: true
  isDisabled?: boolean
  loading?: boolean
  secondary?: boolean
}

const Button = memo(
  ({ type, onClick, text, submit, basic = true, isDisabled = false, loading = false, secondary = false }: Props) => {
    const navigate = useNavigate()
    return (
      <button
        type={submit ? 'submit' : 'button'}
        className={cx(styles.button, styles[type], {
          [styles.basic]: basic,
          [styles.loading]: loading,
          [styles.secondary]: secondary,
        })}
        onClick={type === 'back' ? () => navigate(-1) : onClick}
        disabled={isDisabled || loading}
      >
        {loading && <span className={styles.spinner}>loading</span>}
        {text}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
