import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Signup from 'pages/Signup'
import Login from 'pages/Login'
import { Layout, LayoutGnb } from 'components/Layout'
import NotFound from 'pages/NotFound'
import { PostDetail, PostEdit, PostWrite } from 'pages/Post'
import MyPost from 'pages/MyPost'
import Bookmark from 'pages/Bookmark'
import LocalAuth from 'pages/LocalAuth'
import Splash from 'pages/Splash'
import styles from './routes.module.scss'

const RootRoute = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Splash />} />
          <Route path='login' element={<Login />} />
          <Route path='local' element={<LocalAuth />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route element={<LayoutGnb />}>
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='mypost' element={<MyPost />} />
          <Route path='bookmark' element={<Bookmark />} />
          <Route path='write' element={<PostWrite />} />
          <Route path='edit' element={<PostEdit />} />
          <Route path='detail/:id' element={<PostDetail />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default RootRoute
