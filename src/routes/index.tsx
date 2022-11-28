import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import ProfileCurrent from 'pages/Profile/Current'
import ProfileEdit from 'pages/Profile/Edit'
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
import New from 'pages/Posting/Write/New'
import Edit from 'pages/Posting/Write/Edit'
import UploadComplete from 'pages/UploadComplete'
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
          <Route path='new' element={<New />} />
          {/* <Route path='edit/:id' element={<Edit />} /> */}
          <Route path='profile-edit' element={<ProfileEdit />} />
          <Route path='edit' element={<Edit />} />
          <Route path='upload-complete' element={<UploadComplete />} />
          <Route path='detail/:id' element={<Detail />} />
        </Route>
        <Route element={<LayoutGnb />}>
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<ProfileCurrent />} />
          <Route path='mypost' element={<MyPost />} />
          <Route path='bookmark' element={<Bookmark />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default RootRoute
