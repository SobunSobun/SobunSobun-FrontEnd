import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Header from 'components/Header'
import styles from './home.module.scss'

const list = ['리스트1', '리스트2', '리스트3']

const Home = () => {
  const navigate = useNavigate()
  const goToWrite = () => {
    navigate('/post/write')
  }
  return (
    <div className={styles.home}>
      <Header headText='안양동' />
      <div className='contentsInner'>
        <h1>Home</h1>
        <div className={styles.list}>
          <ul>
            {list.map((item, index) => {
              return (
                <li key={item} onClick={() => navigate(`/post/detail/${index + 1}`)} role='presentation'>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.writeBtn}>
          <Button basic type='primary' onClick={goToWrite} text='새글쓰기' />
        </div>
      </div>
    </div>
  )
}

export default Home
