import { getMyLikeList } from 'apis/feed'
import Card from 'components/Card'
import { useQuery } from 'react-query'
import { feed } from 'types'
import styles from './bookmark.module.scss'

const Bookmark = () => {
  const { data } = useQuery<Array<feed>>(['LikeList'], getMyLikeList)
  return (
    <div className={styles.bookmark}>
      <section className={styles.headerSection}>
        <h2>관심 목록</h2>
      </section>
      <div className={styles.inner}>
        <ul className={styles.list}>
          {data?.map((v) => (
            <Card key={v.postId} data={v} isVertical />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Bookmark
