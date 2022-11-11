import { useNavigate } from 'react-router-dom'
import Header from 'components/Header'
import Button from 'components/Button'
import styles from './category.module.scss'

const Category = () => {
  const navigate = useNavigate()
  const onMoveToWrite = () => {
    navigate('/local')
  }
  return (
    <div className={styles.category}>
      <Header leftChild={<Button type='back' />} />
      <div className='contentsInner'>
        <h1>
          카테고리를 <br />
          선택해주세요
        </h1>
        <div className={styles.buttonWrap}>
          <Button basic type='negative' text='다음' onClick={onMoveToWrite} />
        </div>
      </div>
    </div>
  )
}

export default Category
