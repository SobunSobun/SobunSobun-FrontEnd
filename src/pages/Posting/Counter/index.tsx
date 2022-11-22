import { Dispatch, SetStateAction } from 'react'
import { MinusIcon, PlusIcon } from 'assets/svgs'
import styles from './counter.module.scss'

interface Props {
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

const Counter = ({ count, setCount }: Props) => {
  const handleIncrease = () => {
    setCount((prev) => prev + 1)
  }
  const handleDecrease = () => {
    if (count > 2) {
      setCount((prev) => prev - 1)
    }
  }
  return (
    <div className={styles.counter}>
      <button type='button' onClick={handleDecrease}>
        <MinusIcon />
      </button>
      <span className={styles.current}>{count}</span>
      <button type='button' onClick={handleIncrease}>
        <PlusIcon />
      </button>
    </div>
  )
}

export default Counter
