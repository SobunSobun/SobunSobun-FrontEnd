import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'

const Layout = () => {
  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Layout
