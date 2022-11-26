import { getMyInfoType } from 'types'
import { authInstance } from './client'

export const getMyInfoAPI: getMyInfoType = () => {
  return authInstance.get('/myInfo').then((res) => res.data)
}
