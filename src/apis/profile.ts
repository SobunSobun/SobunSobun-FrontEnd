import { authInstance } from './client'

interface Props {
  formData: FormData
  userId: number | undefined
}

export const profileImageAPI = ({ formData, userId }: Props) => {
  return authInstance.post(`/myPage/${userId}/changeProfileUrl`, formData)
}

export const profileNameAPI = ({ userId, formData }: Props) => {
  return authInstance.post(`/myPage/${userId}/modifyNickname`, formData)
}
