import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

import useModal from 'hooks/useModal'
import { authInstance, isAxiosError } from 'apis/client'
import { MoreIcon } from 'assets/svgs'
import { detailData, getDetailType } from 'types'
import { deletePostingAPI } from 'apis/posting'

import { UnderModal } from 'components/Modal'
import Button from 'components/Button'
import Comment from 'components/Detail/Comment'
import DetailContent from 'components/Detail/DetailContent'
import Header from 'components/Header'

import styles from './detail.module.scss'

const getDetailAPI: getDetailType = (id: string | undefined) => authInstance.get(`post/${id}`)

const Detail = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data, isFetching } = useQuery<detailData>(
    ['getDetailAPI', id],
    () => getDetailAPI(id).then((res) => res.data),
    {
      staleTime: Infinity,
      refetchOnMount: true,
    }
  )
  const navigate = useNavigate()
  const { isOpen, onClose, setIsOpen } = useModal()

  const deletePostApi = useMutation(deletePostingAPI, {
    onSuccess(response) {
      // eslint-disable-next-line
      if (response.data === '게시글 삭제 완료') {
        queryClient.invalidateQueries('feedList')
        navigate('/home')
      } else if (response.data === '작성자만 삭제 가능') {
        // eslint-disable-next-line no-alert
        alert('작성자만 삭제 가능합니다.')
      }
    },
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-alert
        alert('게시물 삭제에 실패하였습니다.')
      }
    },
  })

  const handleDeletePost = () => {
    deletePostApi.mutate(id)
  }

  if (!data || isFetching) return null

  return (
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
            callback: handleDeletePost,
          },
        ]}
      />
    </div>
  )
}

export default Detail
