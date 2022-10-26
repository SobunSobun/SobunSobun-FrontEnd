import { Route, Routes } from 'react-router-dom'

import styles from './routes.module.scss'

import Layout from 'components/Layout/Layout'
import Home from 'pages/Home/Home'
import Bookmark from 'pages/Bookmark/Bookmark'
import MyPost from 'pages/MyPost/MyPost'
import Profile from 'pages/Profile/Profile'

const RootRoute = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='bookmark' element={<Bookmark />} />
          <Route path='mypost' element={<MyPost />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default RootRoute
