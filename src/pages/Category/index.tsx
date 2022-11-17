import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from 'components/Header'
import Button from 'components/Button'
import { categoryList } from 'utils/categoryList'
import CategoryItem from 'pages/Category/CategoryItem'
import FloatingElem from 'components/FloatingElem'

import styles from './category.module.scss'

const Category = () => {
  const [product, setProduct] = useState('')
  const navigate = useNavigate()
  const handleMoveToWrite = () => {
    navigate('/new', { state: { category: product } })
  }

  const handleClickProduct = useCallback((item: string) => {
    setProduct(item)
  }, [])

  return (
    <div className={styles.category}>
      <Header leftChild={<Button type='back' />} />
      <div className='contentsInner'>
        <h1>
          카테고리를 <br />
          선택해주세요
        </h1>
        <ul className={styles.list}>
          {categoryList.map((item) => (
            <CategoryItem
              key={item.categoryId}
              {...item}
              isSelected={item.categoryTitle === product}
              onClick={handleClickProduct}
            />
          ))}
        </ul>
        <FloatingElem offsetBottom={45}>
          <Button basic type={product === '' ? 'negative' : 'primary'} text='다음' onClick={handleMoveToWrite} />
        </FloatingElem>
      </div>
    </div>
  )
}

export default Category
