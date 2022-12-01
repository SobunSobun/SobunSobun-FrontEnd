import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

import { detailData, getDetailType } from 'types'
import { authInstance } from 'apis/client'

import { UnderModal } from 'components/Modal'
import Button from 'components/Button'
import Comment from 'components/Detail/Comment'
import DetailContent from 'components/Detail/DetailContent'
import Header from 'components/Header'

import useModal from 'hooks/useModal'
import { useDeletePost } from 'hooks/usePosting'

import { MoreIcon } from 'assets/svgs'
import Spinner from 'components/Spinner'
import styles from './detail.module.scss'

const getDetailAPI: getDetailType = (id: string | undefined) => authInstance.get(`post/${id}`)

const Detail = () => {
  const { id } = useParams()
  const { data, isFetching, isLoading } = useQuery<detailData>(
    ['getDetailAPI', id],
    () => getDetailAPI(id).then((res) => res.data),
    {
      staleTime: Infinity,
      refetchOnMount: true,
    }
  )
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  const { mutate } = useDeletePost()

  if (!data || isFetching) return null

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.detail}>
          <div className={styles.headerWrap}>
            <Header
              leftChild={<Button type='back' />}
              rightChild={
                data.isWriter && (
                  <button type='button' onClick={() => setIsOpen(true)} className={styles.editButton}>
                    <MoreIcon />
                  </button>
                )
              }
            />
          </div>
          <div className='contentsInner'>
            <DetailContent data={data} postId={id!} />
            <Comment postId={id!} />
          </div>
          <UnderModal
            show={isOpen}
            close={onClose}
            items={[
              {
                name: '수정',
                callback: () => {
                  navigate(`/edit/${id}`, { state: { data } })
                },
              },
              {
                name: '삭제',
                callback: () => {
                  mutate(id)
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default Detail
