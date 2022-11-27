import { myWriteAPI, myWriteCompleteAPI, myParticipateAPI, myParticipateCompleteAPI } from 'apis/feed'
import { useQueries } from 'react-query'

interface Props {
  userId: number
  postState: 'myPost' | 'participatedPost'
}
const useMyPost = ({ userId, postState }: Props) => {
  const myWriteResult = useQueries([
    {
      queryKey: [postState, userId],
      queryFn: () => myWriteAPI(userId),
      enabled: !!userId && postState === 'myPost',
    },
    {
      queryKey: [postState, userId, 'complete'],
      queryFn: () => myWriteCompleteAPI(userId),
      enabled: !!userId && postState === 'myPost',
    },
  ])

  const writeLoading = myWriteResult.some((result) => result.isLoading)

  const myParticipateResult = useQueries([
    {
      queryKey: [postState, userId],
      queryFn: () => myParticipateAPI(userId),
      enabled: !!userId && postState === 'participatedPost',
    },
    {
      queryKey: [postState, userId, 'complete'],
      queryFn: () => myParticipateCompleteAPI(userId),
      enabled: !!userId && postState === 'participatedPost',
    },
  ])

  const participateLoading = myParticipateResult.some((result) => result.isLoading)

  return {
    data:
      postState === 'myPost' && (myWriteResult || myParticipateResult)
        ? myWriteResult.map((v) => v.data)
        : myParticipateResult.map((v) => v.data),
    isLoading: postState === 'myPost' ? writeLoading : participateLoading,
  }
}

export default useMyPost
