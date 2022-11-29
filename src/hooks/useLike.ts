import { postLikeAPI } from 'apis/feed'
import { useMutation, useQueryClient } from 'react-query'
import { detailData } from 'types'
import { AxiosError } from 'axios'

const useLike = () => {
  const queryClient = useQueryClient()
  return useMutation(postLikeAPI, {
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(['getDetailAPI', postId]) // 쿼리 취소
      const prevUserData = queryClient.getQueryData<detailData>(['getDetailAPI', postId])
      if (prevUserData) {
        const newUserDetail = prevUserData.isLike
          ? { ...prevUserData, isLike: false }
          : { ...prevUserData, isLike: true }
        queryClient.setQueryData<detailData>(['getDetailAPI', postId], newUserDetail)
      }
      return { prevUserData }
    },
    onError: (err: AxiosError, { postId }, context?: { prevUserData: detailData | undefined }) => {
      if (context?.prevUserData) {
        queryClient.setQueryData<detailData>(['getDetailAPI', postId], context.prevUserData)
      }
    },
    onSettled: (data, err, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['getDetailAPI', postId],
        refetchActive: false,
      })
      queryClient.invalidateQueries({
        queryKey: ['LikeList'],
        refetchInactive: true,
      })
    },
  })
}

export default useLike
