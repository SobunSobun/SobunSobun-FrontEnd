/* eslint-disable no-nested-ternary */
import { getMyLikeList } from 'apis/feed'
import Card from 'components/Card'
import NoResult from 'components/NoResult'
import Spinner from 'components/Spinner'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { feed } from 'types'
import styles from './bookmark.module.scss'

const Bookmark = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery<Array<feed>>(['LikeList'], getMyLikeList, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  return (
    <div className={styles.bookmark}>
      <section className={styles.headerSection}>
        <h2>관심 목록</h2>
      </section>
      <div className={styles.inner}>
        {isLoading ? (
          <Spinner />
        ) : data?.length !== 0 ? (
          <ul className={styles.list}>
            {data?.map((v) => (
              <li key={v.postId} role='presentation' onClick={() => navigate(`/detail/${v.postId}`)}>
                <Card data={v} isVertical />
              </li>
            ))}
          </ul>
        ) : (
          <NoResult message='관심목록이 없습니다.' />
        )}
      </div>
    </div>
  )
}

export default Bookmark
