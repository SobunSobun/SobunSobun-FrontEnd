import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useDebounce from 'utils/debounce'

import styles from './layout.module.scss'

const Layout = () => {
  const [innerHeight, setInnerHeight] = useState<number>()
  const handleResize = useDebounce(() => {
    setInnerHeight(window.innerHeight)
  }, 300)

  useEffect(() => {
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
      </div>
    </main>
  )
}

export default Layout
