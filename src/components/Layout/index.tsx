import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { debounce } from 'lodash'

import GNB from '../GNB'
import styles from './layout.module.scss'

const Layout = () => {
  const [innerHeight, setInnerHeight] = useState<number>()
  const handleResize = debounce(() => {
    console.log(`브라우저 화면 사이즈 y:${window.innerHeight}`)
    setInnerHeight(window.innerHeight)
  }, 1000)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <p>
            브라우저 화면사이즈 x: {window.innerWidth}, y: {window.innerHeight}
          </p>
          <Outlet />
        </div>
        <GNB />
      </div>
    </main>
  )
}

export default Layout
