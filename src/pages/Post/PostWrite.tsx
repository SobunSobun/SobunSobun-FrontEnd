import Button from 'components/Button'
import Header from 'components/Header'
import styles from './post.module.scss'

const PostWrite = () => {
  return (
    <div className={styles.post}>
      <Header headText='게시글 작성' leftChild={<Button type='back' />} />
      <div className='contentsInner'>내용 작성</div>
    </div>
  )
}

export default PostWrite
