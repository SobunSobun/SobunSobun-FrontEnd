import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Signup from 'pages/Signup'
import Login from 'pages/Login'
import { Layout, LayoutGnb } from 'components/Layout'
import NotFound from 'pages/NotFound'
import Category from 'pages/Category'
// import { PostDetail, PostEdit, PostWrite } from 'pages/Posting'
import MyPost from 'pages/MyPost'
import Bookmark from 'pages/Bookmark'
import LocalAuth from 'pages/LocalAuth'
import Splash from 'pages/Splash'
import SignupComplete from 'pages/SignupComplete'
import Detail from 'pages/Detail'
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
          <Route path='complete' element={<SignupComplete />} />
          <Route path='category' element={<Category />} />
          <Route path='detail/:id' element={<Detail />} />
        </Route>
        <Route element={<LayoutGnb />}>
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='mypost' element={<MyPost />} />
          <Route path='bookmark' element={<Bookmark />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default RootRoute
