import React, { useState } from 'react'
import { Like, LikeOn } from 'assets/svgs'
import Button from 'components/Button'
import Comment from 'components/Detail/Comment'
import DetailContent from 'components/Detail/DetailContent'
import Header from 'components/Header'
import styles from './detail.module.scss'

const Detail = () => {
  const [isLike, setIsLike] = useState<boolean>(false)
  const likeToggle = () => {
    setIsLike(!isLike)
  }
  return (
    <div className={styles.detail}>
      <div className={styles.headerWrap}>
        <Header
          leftChild={<Button type='back' />}
          rightChild={
            <div className={styles.like} onClick={likeToggle} role='presentation'>
              {isLike ? <LikeOn /> : <Like />}
            </div>
          }
        />
      </div>
      <div className='contentsInner'>
        <DetailContent />
        <Comment />
      </div>
    </div>
  )
}

export default Detail
