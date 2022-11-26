import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import { CategorySlider } from 'components/Slider'
import { category } from 'types'
import { CATEGORIES } from 'utils/constants'
import { PlusIcon } from 'assets/svgs'
import { useInView } from 'react-intersection-observer'
import useFeed from 'hooks/useFeed'
import useMyInfo from 'hooks/useMyInfo'

import styles from './home.module.scss'

const Home = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<category>('전체')
  const [ref, inView] = useInView()

  const { location } = useMyInfo()
  const { feedList, readToLoad } = useFeed({ inView, selectedCategory })
  const categories = CATEGORIES

  return (
    <div className={styles.container}>
      <button type='button' className={styles.plus} onClick={() => navigate('/category')}>
        <PlusIcon className={styles.plusIcon} />
      </button>
      <section className={styles.headerSection}>
        {/* OO동 은 user 정보 가져오는 api를 useQuery로 가져와야 될 듯? */}
        <h3>{location} 소분 시장</h3>
        <CategorySlider data={categories} now={selectedCategory} setNow={setSelectedCategory} />
      </section>
      <section className={styles.cardSection}>
        <ul className={styles.cardList}>
          {feedList?.map((item) => {
            return (
              <li key={item.postId} role='presentation' onClick={() => navigate(`/detail/${item.postId}`)}>
                <button style={{ width: '100%' }} type='button'>
                  <Card data={item} isComplete />
                </button>
              </li>
            )
          })}
        </ul>
        <div ref={readToLoad ? ref : undefined} style={{ height: 10 }} />
      </section>
    </div>
  )
}

export default Home
