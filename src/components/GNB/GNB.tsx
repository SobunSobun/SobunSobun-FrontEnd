import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './gnb.module.scss'

const navData = ['home', 'bookmark', 'mypost', 'profile']

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        {navData.map((item) => {
          return (
            <li key={`gnb-item-${item}`}>
              <NavLink
                to={item === 'home' ? '' : item}
                className={({ isActive }) => cx({ [styles.isActive]: isActive })}
              >
                <p>{`${item}`}</p>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default GNB
