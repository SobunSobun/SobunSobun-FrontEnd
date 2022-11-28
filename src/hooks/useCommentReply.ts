import { authInstance } from 'apis/client'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export const postReplyCommentAPI = ({
  postId,
  parentCommentId,
  formData,
}: {
  postId: string
  parentCommentId: number
  formData: FormData
}) => {
  return authInstance.post(`/childComment/${postId}/${parentCommentId}`, formData)
}

const useReplyComment = () => {
  const queryClient = useQueryClient()
  return useMutation(postReplyCommentAPI, {
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

export default useReplyComment
