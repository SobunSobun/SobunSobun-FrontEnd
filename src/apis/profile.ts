import { getInstance } from './client'

interface Props {
  formData: FormData
  userId: number | undefined
}

export const profileImageAPI = ({ formData, userId }: Props) => {
  return getInstance(true).post(`/myPage/${userId}/changeProfileUrl`, formData)
}

export const profileNameAPI = ({ userId, formData }: Props) => {
  return getInstance(true).post(`/myPage/${userId}/modifyNickname`, formData)
}
