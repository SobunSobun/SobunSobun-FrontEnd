import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { isEditDefaultValue } from 'recoil/post.atom'

import { detailData } from 'types'

import Header from 'components/Header'
import Button from 'components/Button'
import Editor from '../Editor'
import styles from './write.module.scss'

interface RouteState {
  state: {
    id: string
    data?: detailData
  }
}

const Edit = () => {
  const { state } = useLocation() as RouteState
  const setIsDefaultValue = useSetRecoilState(isEditDefaultValue)

  useEffect(() => {
    setIsDefaultValue(true)
  })
  return (
    <div className={styles.edit}>
      <Header leftChild={<Button type='back' />} headText='게시글 수정' />
      <div className='contentsInner'>
        <Editor isEdit data={state.data} postId={state.id} />
      </div>
    </div>
  )
}

export default Edit
