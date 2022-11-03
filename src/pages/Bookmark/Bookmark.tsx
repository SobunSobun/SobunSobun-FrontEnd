import Button from 'components/Button'
import Header from 'components/Header'
import styles from './bookmark.module.scss'

const Bookmark = () => {
  return (
    <div className={styles.bookmark}>
      <Header headText='관심목록' leftChild={<Button type='back' />} />
      <div className='contentsInner'>관심목록</div>
    </div>
  )
}

export default Bookmark
