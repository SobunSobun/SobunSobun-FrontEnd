/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import Spinner from 'components/Spinner'
import NoResult from 'components/NoResult'
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
  const { feedList, readToLoad, isLoading } = useFeed({ inView, selectedCategory })
  const categories = CATEGORIES

  return (
    <div className={styles.container}>
      <button type='button' className={styles.plus} onClick={() => navigate('/category')}>
        <PlusIcon className={styles.plusIcon} />
      </button>
      <section className={styles.headerSection}>
        <h3>{location && location.split(' ')[1]} 소분 시장</h3>
        <CategorySlider data={categories} now={selectedCategory} setNow={setSelectedCategory} />
      </section>
      <section className={styles.cardSection}>
        {isLoading ? (
          <Spinner />
        ) : feedList?.length !== 0 ? (
          <ul className={styles.cardList}>
            {feedList?.map((item) => {
              return (
                <li key={item.postId} role='presentation' onClick={() => navigate(`/detail/${item.postId}`)}>
                  <button style={{ width: '100%' }} type='button'>
                    <Card data={item} />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={styles.noResult}>
            <NoResult message='게시물이 없습니다.' />
          </div>
        )}
        <div ref={readToLoad ? ref : undefined} style={{ height: 10 }} />
      </section>
    </div>
  )
}

export default Home
