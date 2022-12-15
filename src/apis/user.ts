import { getMyInfoType } from 'types'
import { getInstance } from './client'

export const getMyInfoAPI: getMyInfoType = () => {
  return getInstance(true)
    .get('/myInfo')
    .then((res) => res.data)
}
