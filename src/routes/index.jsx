import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Bookmark from 'pages/Bookmark/Bookmark'
import MyPost from 'pages/MyPost/MyPost'
import Profile from 'pages/Profile/Profile'
import Signup from 'pages/Signup/Signup'
import Login from 'pages/Login/Login'
import Layout from 'components/Layout'

import styles from './routes.module.scss'

const RootRoute = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='bookmark' element={<Bookmark />} />
          <Route path='mypost' element={<MyPost />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default RootRoute
