import React, { useState } from 'react'
import Button from 'components/Button'
import Comment from 'components/Detail/Comment'
import DetailContent from 'components/Detail/DetailContent'
import Header from 'components/Header'
import styles from './detail.module.scss'

const Detail = () => {
  return (
    <div className={styles.detail}>
      <div className={styles.headerWrap}>
        <Header
          leftChild={<Button type='back' />}
          rightChild={
            <div className={styles.edit}>
              <i />
              <i />
              <i />
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
