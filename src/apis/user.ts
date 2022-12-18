import { getInstance } from './client'

export const getMyInfoAPI = async () => {
  const res = await getInstance(true).get('/myInfo')
  return res.data
}
