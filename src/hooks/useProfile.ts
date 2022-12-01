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

  const imageMutate = useMutation(profileImageAPI, {
    onSuccess() {
      updatePageData()
    },
  })
  const nickNameMutate = useMutation(profileNameAPI, {
    onSuccess() {
      updatePageData()
    },
  })

  return { imageMutate, nickNameMutate }
}

export default useProfile
