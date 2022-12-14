import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'

import GNB from '../GNB'
import styles from './layout.module.scss'

const LayoutGnb = () => {
  const [innerHeight, setInnerHeight] = useState<number>()

  const handleResize = useDebounce(() => {
    setInnerHeight(window.innerHeight)
  }, 100)

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <main className={styles.layout}>
      <div className={styles.container} style={{ height: innerHeight }}>
        <div className={styles.inner}>
          <Outlet />
        </div>
        <GNB />
      </div>
    </main>
  )
}

export default LayoutGnb
