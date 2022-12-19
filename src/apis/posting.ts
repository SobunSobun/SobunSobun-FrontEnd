import { getInstance } from './client'

interface Props {
  formData: FormData
  postId: string | undefined
}

export const newPostingAPI = (formData: FormData) => {
  return getInstance(true).post('/post/register', formData)
}

export const editPostingAPI = ({ postId, formData }: Props) => {
  return getInstance(true).patch(`/post/${postId}`, formData)
}

export const deletePostingAPI = (postId: string | undefined) => {
  return getInstance(true).delete(`/post/${postId}`)
}

export const closePostingAPI = (postId: string | undefined) => {
  return getInstance(true).post(`/post/${postId}/close`)
}
