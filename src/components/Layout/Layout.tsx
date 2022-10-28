import { Outlet } from 'react-router-dom'

import GNB from '../GNB/GNB'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Outlet />
        </div>
        <GNB />
      </div>
    </main>
  )
}

export default Layout
