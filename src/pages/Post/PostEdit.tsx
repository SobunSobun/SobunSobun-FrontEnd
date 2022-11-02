import Button from 'components/Button'
import Header from 'components/Header'
import { useParams } from 'react-router-dom'
import styles from './post.module.scss'

const PostEdit = () => {
  const { id } = useParams()
  return (
    <div className={styles.post}>
      <Header headText='게시글 수정' leftChild={<Button type='back' />} />
      <div className='contentsInner'>게시글수정 {id}</div>
    </div>
  )
}

export default PostEdit
