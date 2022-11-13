import Header from 'components/Header'
import Button from 'components/Button'
import Editor from '../Editor'
import styles from './write.module.scss'

const New = () => {
  return (
    <div className={styles.new}>
      <Header leftChild={<Button type='back' />} headText='게시글 작성' />
      <div className='contentsInner'>
        <Editor />
      </div>
    </div>
  )
}

export default New
