import { AxiosError } from 'axios'
import { postApplyAPI } from 'apis/feed'
import { useMutation, useQueryClient } from 'react-query'
import { detailData } from 'types'

const useApply = () => {
  const queryClient = useQueryClient()
  return useMutation(postApplyAPI, {
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(['getDetailAPI', postId]) // 쿼리 취소
      const prevUserData = queryClient.getQueryData<detailData>(['getDetailAPI', postId])
      if (prevUserData) {
        const newUserDetail = prevUserData.isApply
          ? { ...prevUserData, isApply: false }
          : { ...prevUserData, isApply: true }
        queryClient.setQueryData<detailData>(['getDetailAPI', postId], newUserDetail)
      }
      return { prevUserData }
    },
    onError: (err: AxiosError, { postId }, context?: { prevUserData: detailData | undefined }) => {
      if (err.response?.status === 403) {
        // 모집이 완료된 게시물 일 경우
      }
      if (context?.prevUserData) {
        queryClient.setQueryData<detailData>(['getDetailAPI', postId], context.prevUserData)
      }
    },
    onSettled: (data, err, { postId }) => {
      queryClient.invalidateQueries(['getDetailAPI', postId])
      queryClient.invalidateQueries(['feedList', '전체'], { refetchPage: (page, index) => index === 0 })
    },
  })
}

export default useApply
