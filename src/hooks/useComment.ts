import { getInstance } from 'apis/client'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export const postCommentAPI = ({ postId, formData }: { postId: string; formData: FormData }) => {
  return getInstance(true).post(`/parentComment/${postId}`, formData)
}

const useComment = () => {
  const queryClient = useQueryClient()
  return useMutation(postCommentAPI, {
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(['getCommentAPI', postId])
      const commentData = queryClient.getQueryData<Comment>(['getCommentAPI', postId])
      return { commentData }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentAPI')
    },
    onError: (err: AxiosError) => {
      // eslint-disable-next-line no-console
      console.log(err)
    },
  })
}

export default useComment
