import { authInstance } from './client'

interface Props {
  formData: FormData
  postId: string | undefined
}

export const newPostingAPI = (formData: FormData) => {
  return authInstance.post('/post/register', formData)
}

export const editPostingAPI = ({ postId, formData }: Props) => {
  return authInstance.patch(`/post/${postId}`, formData)
}

export const deletePostingAPI = (postId: string | undefined) => {
  return authInstance.delete(`/post/${postId}`)
}

export const closePostingAPI = (postId: string | undefined) => {
  return authInstance.post(`/post/${postId}/close`)
}
