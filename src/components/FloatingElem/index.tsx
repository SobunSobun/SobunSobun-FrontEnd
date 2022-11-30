import { useState, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'
import styles from './floatingElem.module.scss'

interface Props {
  children?: React.ReactNode
  offsetBottom: number
}

const FloatingElem = ({ children, offsetBottom }: Props) => {
  const [bottom, setBottom] = useState<string>(`${offsetBottom}px`)
  const handleCalcVw = useDebounce(() => {
    if (window.innerWidth > 768) {
      setBottom(`${offsetBottom}px`)
    } else {
      setBottom(`${(offsetBottom * 100) / 390}vw`)
    }
  }, 100)

  useEffect(() => {
    handleCalcVw()
    window.addEventListener('resize', handleCalcVw)
    return () => {
      window.removeEventListener('resize', handleCalcVw)
    }
  }, [handleCalcVw])

  return (
    <div className={styles.floatingElem} style={{ bottom }}>
      {children}
    </div>
  )
}

export default FloatingElem
