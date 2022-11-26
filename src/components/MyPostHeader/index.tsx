import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { postStateAtom } from 'recoil/myPost.atom'

import styles from './myPostHeader.module.scss'

const MyPostHeader = () => {
  const [postState, setPostState] = useRecoilState(postStateAtom)

  const buttonClickHandler = useCallback(() => {
    if (postState === 'myPost') {
      setPostState('participatedPost')
    } else {
      setPostState('myPost')
    }
  }, [postState, setPostState])

  return (
    <div className={styles.container}>
      <button type='button' onClick={buttonClickHandler} className={postState === 'myPost' ? styles.active : ''}>
        작성한 소분
      </button>
      <button
        type='button'
        onClick={buttonClickHandler}
        className={postState === 'participatedPost' ? styles.active : ''}
      >
        참여한 소분
      </button>
    </div>
  )
}

export default MyPostHeader
