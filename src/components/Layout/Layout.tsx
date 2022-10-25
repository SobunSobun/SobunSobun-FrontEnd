import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import GNB from '../GNB/GNB'
import Header from '../Header/Header'

const Layout = () => {
  return (
    <main className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <div className={styles.inner}>
          <Outlet />
        </div>
        <GNB />
        {/* <div className={styles.gnbWrapper}>
        </div> */}
      </div>
    </main>
  )
}

export default Layout
