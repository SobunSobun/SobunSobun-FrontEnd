import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { categoryState } from 'recoil/post.atom'

import Header from 'components/Header'
import Button from 'components/Button'
import { categoryList } from 'utils/categoryList'
import CategoryItem from 'pages/Category/CategoryItem'
import FloatingElem from 'components/FloatingElem'

import styles from './category.module.scss'

const Category = () => {
  const [product, setProduct] = useRecoilState(categoryState)
  const navigate = useNavigate()
  const handleMoveToWrite = () => {
    navigate('/new')
  }

  const handleClickProduct = useCallback(
    (item: string) => {
      setProduct(item)
    },
    [setProduct]
  )

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
          <Button
            type={product === '' ? 'negative' : 'primary'}
            text='다음'
            onClick={handleMoveToWrite}
            isDisabled={product === ''}
          />
        </FloatingElem>
      </div>
    </div>
  )
}

export default Category
