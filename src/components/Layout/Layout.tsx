import { Outlet, useLocation } from 'react-router-dom'
import { cx } from 'styles'

import styles from './layout.module.scss'

const Layout = () => {
  const location = useLocation()

  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <div className={cx(styles.inner, { [styles.fullInner]: location.pathname === '/profile-edit' })}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Layout
