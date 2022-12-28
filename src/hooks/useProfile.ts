import { useMutation, useQueryClient } from 'react-query'

import { profileImageAPI, profileNameAPI } from 'apis/profile'

const useProfile = () => {
  const queryClient = useQueryClient()

  const updatePageData = () => {
    queryClient.invalidateQueries('myInfo')
    queryClient.invalidateQueries('feedList')
    queryClient.invalidateQueries({
      queryKey: ['myPost'],
      refetchInactive: true,
    })
    queryClient.invalidateQueries({
      queryKey: ['LikeList'],
      refetchInactive: true,
    })
    queryClient.invalidateQueries({
      queryKey: ['getDetailAPI'],
      refetchInactive: true,
    })
    queryClient.invalidateQueries({
      queryKey: ['getCommentAPI'],
      refetchInactive: true,
    })
  }

  const {
    mutateAsync: imgMutateAsync,
    mutate: imgMutate,
    isLoading: imgLoading,
    isError: imgError,
  } = useMutation(profileImageAPI)

  const {
    mutateAsync: nickNameMutateAsync,
    mutate: nickNameMutate,
    isLoading: nickNameLoading,
    isError: nickNameError,
  } = useMutation(profileNameAPI)

  return {
    imgMutateAsync,
    imgMutate,
    imgLoading,
    imgError,
    nickNameMutateAsync,
    nickNameMutate,
    nickNameLoading,
    updatePageData,
    nickNameError,
  }
}

export default useProfile
