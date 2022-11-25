import { useParams } from 'react-router-dom'

import useModal from 'hooks/useModal'
import { MoreIcon } from 'assets/svgs'

import { UnderModal } from 'components/Modal'
import Button from 'components/Button'
import Comment from 'components/Detail/Comment'
import DetailContent from 'components/Detail/DetailContent'
import Header from 'components/Header'

import styles from './detail.module.scss'

const Detail = () => {
  const { isOpen, onClose, setIsOpen } = useModal()
  const { id } = useParams()
  return (
    <div className={styles.detail}>
      <div className={styles.headerWrap}>
        <Header
          leftChild={<Button type='back' />}
          rightChild={
            <button type='button' onClick={() => setIsOpen(true)} className={styles.editButton}>
              <MoreIcon />
            </button>
          }
        />
      </div>
      <div className='contentsInner'>
        <DetailContent id={id} />
        <Comment />
      </div>
      <UnderModal
        show={isOpen}
        close={onClose}
        items={[
          { name: '수정', callback: () => {} },
          { name: '삭제', callback: () => {} },
        ]}
      />
    </div>
  )
}

export default Detail
