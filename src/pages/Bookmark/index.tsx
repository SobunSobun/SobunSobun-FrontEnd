import Button from 'components/Button'
import Header from 'components/Header'
import { UnderModal } from 'components/Modal'
import useModal from 'hooks/useModal'
import styles from './bookmark.module.scss'

const Bookmark = () => {
  const { isOpen, onClose, setIsOpen } = useModal()
  return (
    <div className={styles.bookmark}>
      <Header headText='관심목록' leftChild={<Button type='back' />} />
      <div className='contentsInner'>
        <button type='button' onClick={() => setIsOpen(true)}>
          test
        </button>
        <UnderModal
          show={isOpen}
          close={onClose}
          items={[
            { name: '수정', callback: () => {} },
            { name: '삭제', callback: () => {} },
          ]}
        />
      </div>
    </div>
  )
}

export default Bookmark
