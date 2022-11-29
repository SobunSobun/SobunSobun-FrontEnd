import { getMyLikeList } from 'apis/feed'
import Card from 'components/Card'
import Spinner from 'components/Spinner'
import { useQuery } from 'react-query'
import { feed } from 'types'
import styles from './bookmark.module.scss'

const Bookmark = () => {
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
        ) : (
          <ul className={styles.list}>
            {data?.map((v) => (
              <li key={v.postId}>
                <Card data={v} isVertical />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Bookmark
