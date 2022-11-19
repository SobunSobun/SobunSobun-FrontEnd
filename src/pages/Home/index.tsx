import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from 'components/Header'
import Card from 'components/Card'
import { CategorySlider } from 'components/Slider'
import { category, feed } from 'types'
import { CATEGORIES } from 'utils/constants'
import { PlusIcon } from 'assets/svgs'

import styles from './home.module.scss'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<category>('전체')
  const navigate = useNavigate()
  const categorise = CATEGORIES
  /* api 완성되면 react-query로 요청 */
  const data = fakeData

  return (
    <div className={styles.container}>
      <button type='button' className={styles.plus} onClick={() => navigate('/category')}>
        <PlusIcon className={styles.plusIcon} />
      </button>
      <section className={styles.headerSection}>
        {/* OO동 은 user 정보 가져오는 api를 useQuery로 가져와야 될 듯? */}
        <Header headText='OO동 소분 시장' />
        <CategorySlider data={categorise} now={selectedCategory} setNow={setSelectedCategory} />
      </section>
      <section className={styles.cardSection}>
        <ul className={styles.cardList}>
          {selectedCategory === '전체'
            ? data.map((item) => {
                return (
                  <li key={item.id} role='presentation'>
                    <button style={{ width: '100%' }} type='button'>
                      <Card data={item} />
                    </button>
                  </li>
                )
              })
            : data.map(
                (item) =>
                  item.category === selectedCategory && (
                    <li key={item.id} role='presentation'>
                      <button style={{ width: '100%' }} type='button'>
                        <Card data={item} />
                      </button>
                    </li>
                  )
              )}
        </ul>
      </section>
    </div>
  )
}

export default Home

/* api 완성 안되서 임시로 fake data 생성하여 테스트 */
const fakeData: Array<feed> = [
  {
    id: 0,
    nickname: 'NickName',
    title: '양파 살 사람 구함',
    market: '마트 이름',
    recruitmentNumber: 2,
    createdAt: new Date('2022-11-14'),
    meetingTime: '11월 14일 14시 30분',
    category: '과일',
  },
  {
    id: 1,
    nickname: 'NickName',
    title: '양파 살 사람 구함',
    market: '마트 이름',
    recruitmentNumber: 2,
    createdAt: new Date('2022-11-14'),
    meetingTime: '11월 14일 14시 30분',
    category: '채소',
  },
  {
    id: 2,
    nickname: 'NickName',
    title: '양파 살 사람 구함',
    market: '마트 이름',
    recruitmentNumber: 2,
    createdAt: new Date('2022-11-14'),
    meetingTime: '11월 14일 14시 30분',
    category: '생수',
  },
  {
    id: 3,
    nickname: 'NickName',
    title: '양파 살 사람 구함',
    market: '마트 이름',
    recruitmentNumber: 2,
    createdAt: new Date('2022-11-14'),
    meetingTime: '11월 14일 14시 30분',
    category: '과일',
  },
  {
    id: 4,
    nickname: 'NickName',
    title: '양파 살 사람 구함',
    market: '마트 이름',
    recruitmentNumber: 2,
    createdAt: new Date('2022-11-14'),
    meetingTime: '11월 14일 14시 30분',
    category: '과일',
  },
]
