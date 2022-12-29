import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

import {
  categoryState,
  postingContentState,
  postingTitleState,
  postingCountState,
  postingPlaceState,
  postingDateState,
  postingTimeState,
  postingModalState,
} from 'recoil/post.atom'

import { Header, Button, TwoButtonModal } from 'components'

import { categoryList } from 'utils/categoryList'
import CategoryItem from 'pages/Category/CategoryItem'

import useModal from 'hooks/useModal'

import styles from './category.module.scss'

const Category = () => {
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  const [product, setProduct] = useRecoilState(categoryState)
  const resetTitle = useResetRecoilState(postingTitleState)
  const resetContent = useResetRecoilState(postingContentState)
  const resetCategory = useResetRecoilState(categoryState)
  const resetCount = useResetRecoilState(postingCountState)
  const resetMarket = useResetRecoilState(postingPlaceState)
  const resetDate = useResetRecoilState(postingDateState)
  const resetTime = useResetRecoilState(postingTimeState)
  const resetTimeColor = useResetRecoilState(postingModalState)

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
        <p className={styles.title}>
          카테고리를 <br />
          선택해주세요
        </p>
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
        {/* <FloatingElem offsetBottom={45}>
        </FloatingElem> */}
      </div>
      <div className={styles.buttonWrap}>
        <Button
          type={product === '' ? 'negative' : 'primary'}
          text='다음'
          onClick={handleMoveToWrite}
          isDisabled={product === ''}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='게시글 등록을 취소하시겠습니까?'
        yesCallBack={() => {
          resetCategory()
          resetTitle()
          resetContent()
          resetCount()
          resetMarket()
          resetDate()
          resetTime()
          resetTimeColor()
          navigate('/home')
        }}
      />
    </div>
  )
}

export default Category
