import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

import useModal from 'hooks/useModal'
import { authInstance } from 'apis/client'
import { MoreIcon } from 'assets/svgs'
import { detailData, getDetailType } from 'types'

import { UnderModal } from 'components/Modal'
import Button from 'components/Button'
import Comment from 'components/Detail/Comment'
import DetailContent from 'components/Detail/DetailContent'
import Header from 'components/Header'

import styles from './detail.module.scss'

const getDetailAPI: getDetailType = (id: string | undefined) => authInstance.get(`post/${id}`)

const Detail = () => {
  const { id } = useParams()
  const { data } = useQuery<detailData>(['getDetailAPI', id], () => getDetailAPI(id).then((res) => res.data))
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  if (!data) return null

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
        <DetailContent data={data} postId={id!} />
        <Comment />
      </div>
      <UnderModal
        show={isOpen}
        close={onClose}
        items={[
          {
            name: '수정',
            callback: () => {
              navigate('/edit', { state: { data } })
            },
          },
          { name: '삭제', callback: () => {} },
        ]}
      />
    </div>
  )
}

export default Detail
