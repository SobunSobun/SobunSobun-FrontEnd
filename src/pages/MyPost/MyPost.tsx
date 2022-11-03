import Button from 'components/Button'
import Header from 'components/Header'
import styles from './myPost.module.scss'

const MyPost = () => {
  return (
    <div className={styles.post}>
      <Header headText='내가쓴글' leftChild={<Button type='back' />} />
      <div className='contentsInner'>내가쓴글</div>
    </div>
  )
}

export default MyPost
