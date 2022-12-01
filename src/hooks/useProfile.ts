import { useMutation, useQueryClient } from 'react-query'

import { isAxiosError } from 'utils/axios'
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
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-console, no-alert
        alert('파일 업로드가 실패하였습니다. 파일을 확인해주세요')
      }
    },
  })
  const nickNameMutate = useMutation(profileNameAPI, {
    onSuccess() {
      updatePageData()
    },
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-console, no-alert
        alert('닉네임 변경이 실패하였습니다. 다시 시도해주세요')
      }
    },
  })

  return { imageMutate, nickNameMutate }
}

export default useProfile
