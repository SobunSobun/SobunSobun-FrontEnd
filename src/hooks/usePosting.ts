import { useMutation, useQueryClient } from 'react-query'
import { useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

import { isAxiosError } from 'utils/axios'
import { newPostingAPI, editPostingAPI, deletePostingAPI } from 'apis/posting'
import {
  postingDateState,
  postingTimeState,
  postingPlaceState,
  categoryState,
  postingCountState,
} from 'recoil/post.atom'

const useCreatePost = () => {
  const resetDate = useResetRecoilState(postingDateState)
  const resetTime = useResetRecoilState(postingTimeState)
  const resetMarket = useResetRecoilState(postingPlaceState)
  const resetCategory = useResetRecoilState(categoryState)
  const resetCount = useResetRecoilState(postingCountState)

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(newPostingAPI, {
    onSuccess() {
      // eslint-disable-next-line
      queryClient.invalidateQueries('feedList')
      queryClient.invalidateQueries({
        queryKey: ['myPost'],
        refetchInactive: true,
      })
      resetDate()
      resetTime()
      resetMarket()
      resetCategory()
      resetCount()
      navigate('/upload-complete', { state: { type: '작성' } })
    },
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-alert
        alert('게시물 업로드에 실패하였습니다.')
      }
    },
  })
}

const useEditPost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const resetDate = useResetRecoilState(postingDateState)
  const resetTime = useResetRecoilState(postingTimeState)
  const resetMarket = useResetRecoilState(postingPlaceState)
  const resetCategory = useResetRecoilState(categoryState)
  const resetCount = useResetRecoilState(postingCountState)
  return useMutation(editPostingAPI, {
    onSuccess() {
      // eslint-disable-next-line
      resetDate()
      resetTime()
      resetMarket()
      resetCategory()
      resetCount()
      navigate('/upload-complete', { state: { type: '수정' } })
    },
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-alert
        alert('게시물 수정이 실패하였습니다.')
      }
    },
    onSettled: (data, err, { postId }) => {
      queryClient.invalidateQueries(['getDetailAPI', postId])
      queryClient.invalidateQueries(['feedList'])
      queryClient.invalidateQueries({
        queryKey: ['myPost'],
        refetchInactive: true,
      })
    },
  })
}

const useDeletePost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(deletePostingAPI, {
    onSuccess(response) {
      // eslint-disable-next-line
      if (response.data === '게시글 삭제 완료') {
        queryClient.invalidateQueries('feedList')
        queryClient.invalidateQueries({
          queryKey: ['myPost'],
          refetchInactive: true,
        })
        navigate('/upload-complete', { state: { type: '삭제' } })
      } else if (response.data === '작성자만 삭제 가능') {
        // eslint-disable-next-line no-alert
        alert('작성자만 삭제 가능합니다.')
        navigate('/home')
      }
    },
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-alert
        alert('게시물 삭제에 실패하였습니다.')
      }
    },
  })
}

export { useCreatePost, useEditPost, useDeletePost }
