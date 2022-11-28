import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { categoryState, postingContentState, postingTitleState } from 'recoil/post.atom'

import Header from 'components/Header'
import Button from 'components/Button'
import { categoryList } from 'utils/categoryList'
import CategoryItem from 'pages/Category/CategoryItem'
import FloatingElem from 'components/FloatingElem'
import { TwoButtonModal } from 'components/Modal'

import useModal from 'hooks/useModal'

import styles from './category.module.scss'

const Category = () => {
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  const [product, setProduct] = useRecoilState(categoryState)
  const setTitle = useSetRecoilState(postingTitleState)
  const setContent = useSetRecoilState(postingContentState)
  const setCategory = useSetRecoilState(categoryState)
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
      <Header leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} />
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
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='게시글 등록을 취소하시겠습니까?'
        yesCallBack={() => {
          navigate('/home')
          setCategory('')
          setTitle('')
          setContent('')
        }}
      />
    </div>
  )
}

export default Category
