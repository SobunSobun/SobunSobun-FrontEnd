import Header from 'components/Header'
import Button from 'components/Button'
import Editor from '../Editor'
import styles from './write.module.scss'

const Edit = () => {
  return (
    <div className={styles.edit}>
      <Header leftChild={<Button type='back' />} headText='게시글 수정' />
      <div className='contentsInner'>
        <Editor isEdit />
      </div>
    </div>
  )
}

export default Edit
