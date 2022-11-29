import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSetRecoilState, useResetRecoilState } from 'recoil'

import { detailData } from 'types'

import Header from 'components/Header'
import Button from 'components/Button'
import {
  postingTitleState,
  postingContentState,
  isEditDefaultValue,
  categoryState,
  postingCountState,
  postingPlaceState,
  postingDateState,
  postingTimeState,
} from 'recoil/post.atom'
import useModal from 'hooks/useModal'
import { TwoButtonModal } from 'components/Modal'
import Editor from './Editor'
import styles from './posting.module.scss'

interface RouteState {
  state: {
    data?: detailData
  }
}

const Edit = () => {
  const { id } = useParams()
  const { isOpen, onClose, setIsOpen } = useModal()
  const { state } = useLocation() as RouteState
  const navigate = useNavigate()

  const setIsDefaultValue = useSetRecoilState(isEditDefaultValue)
  const resetTitle = useResetRecoilState(postingTitleState)
  const resetContent = useResetRecoilState(postingContentState)
  const resetCategory = useResetRecoilState(categoryState)
  const resetCount = useResetRecoilState(postingCountState)
  const resetMarket = useResetRecoilState(postingPlaceState)
  const resetDate = useResetRecoilState(postingDateState)
  const resetTime = useResetRecoilState(postingTimeState)

  const [localTitle, setLocalTitle] = useState('')
  const [localContent, setLocalContent] = useState('')

  useEffect(() => {
    setIsDefaultValue(true)
  })

  return (
    <div className={styles.edit}>
      <Header leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} headText='게시글 수정' />
      <div className='contentsInner'>
        <Editor
          isEdit
          data={state.data}
          postId={id}
          localTitle={localTitle}
          setLocalTitle={setLocalTitle}
          localContent={localContent}
          setLocalContent={setLocalContent}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='게시글 수정을 취소하시겠습니까?'
        yesCallBack={() => {
          resetCategory()
          resetTitle()
          resetContent()
          resetCount()
          resetMarket()
          resetDate()
          resetTime()
          navigate('/home')
        }}
      />
    </div>
  )
}

export default Edit
