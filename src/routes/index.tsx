import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Profile from 'pages/Profile/Profile'
import Signup from 'pages/Signup/Signup'
import Login from 'pages/Login/Login'
import Layout from 'components/Layout'
import NotFound from 'pages/NotFound/NotFound'
import PostDetail from 'pages/Post/PostDetail'
import PostEdit from 'pages/Post/PostEdit'
import PostWrite from 'pages/Post/PostWrite'
import MyPost from 'pages/MyPost/MyPost'
import Bookmark from 'pages/Bookmark/Bookmark'
import styles from './routes.module.scss'

const RootRoute = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mypost' element={<MyPost />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/post/write' element={<PostWrite />} />
          <Route path='/post/edit' element={<PostEdit />} />
          <Route path='/post/detail/:id' element={<PostDetail />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default RootRoute
