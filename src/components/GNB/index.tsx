import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { HomeIcon, FavoriteIcon, PostIcon, ProfileIcon } from 'assets/svgs'

import styles from './gnb.module.scss'

const navData = [
  {
    link: 'home',
    title: '홈',
    icon: <HomeIcon />,
  },
  {
    link: 'bookmark',
    title: '관심목록',
    icon: <FavoriteIcon />,
  },
  {
    link: 'mypost',
    title: '게시물',
    icon: <PostIcon />,
  },
  {
    link: 'profile',
    title: '마이페이지',
    icon: <ProfileIcon />,
  },
]

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        {navData.map((item) => {
          return (
            <li key={item.link}>
              <NavLink to={item.link} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                {item.icon}
                <p className={styles.title}>{item.title}</p>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default GNB
