import { useEffect } from 'react'
import Header from 'components/Header/Header'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import { myInfo } from 'types'
import styles from './home.module.scss'

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token'])

  const authCheck = async (): Promise<myInfo> => {
    const { data } = await axios.get('http://13.124.221.119:8000/user/me')
    console.log(data)
    return data
    // const token = localStorage.getItem('auth_token')
    // console.log(token)
    // try {
    //   const response = await axios.get('http://13.124.221.119:8000/user/me')
    //   console.log(response)
    // } catch (err) {
    //   console.log(err)
    // }
    // axios
    // .get('http://13.124.221.119:8000/user/me')
    // .then((res) => {
    //   console.log(res)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }

  useEffect(() => {
    authCheck()
    // const test = authCheck()
    // console.log(test)
  })

  return (
    <div className={styles.home}>
      <Header headText='안양동' />
      <div className='contentsInner'>
        <h1>Home</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
        </p>
        <div>배포테스트</div>
      </div>
    </div>
  )
}

export default Home
