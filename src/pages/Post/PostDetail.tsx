import { useParams, useNavigate } from 'react-router-dom'
import Button from 'components/Button/Button'
import Header from 'components/Header/Header'
import styles from './post.module.scss'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const goToEdit = () => {
    navigate('/post/edit')
  }
  const deletePost = () => {}
  return (
    <div className={styles.post}>
      <Header headText='게시글 상세' leftChild={<Button type='back' />} />
      <div className='contentsInner'>
        게시글 상세 {id}
        <div className={styles.editBtn}>
          <Button type='primary' onClick={goToEdit} text='수정' />
          <Button type='primary' onClick={deletePost} text='삭제' />
        </div>
      </div>
    </div>
  )
}

export default PostDetail
