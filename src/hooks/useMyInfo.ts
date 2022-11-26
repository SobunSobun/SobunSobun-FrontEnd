import { getMyInfoAPI } from 'apis/user'
import { useQuery } from 'react-query'
import { myInfoType } from 'types'

const useMyInfo = () => {
  const { data, isLoading, isError } = useQuery<myInfoType>(['myInfo'], getMyInfoAPI, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  return {
    email: data?.email,
    nickname: data?.nickname,
    location: data?.location,
    profileUrl: data?.profileUrl,
    userId: data?.userId,
    isError,
    isLoading,
  }
}

export default useMyInfo
