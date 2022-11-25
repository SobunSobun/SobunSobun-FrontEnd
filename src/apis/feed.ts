import { feed, getFeedType } from 'types'
import { authInstance } from './client'

export const getFeedAPI: getFeedType = ({ category, pageParam, size }) => {
  return authInstance
    .get('/post', {
      params: {
        category: category === '전체' ? 'ALL' : category,
        page: pageParam,
        size,
      },
    })
    .then((res) => {
      const isLast = res.data.length === 0 ? true : res.data[0].last
      const feedList = res.data.map((v: feed) => {
        return {
          ...v,
          createdAt: new Date(
            (v.createdAt as number[])[0],
            (v.createdAt as number[])[1],
            (v.createdAt as number[])[2],
            (v.createdAt as number[])[3],
            (v.createdAt as number[])[4],
            (v.createdAt as number[])[5]
          ),
        }
      })
      return {
        feedList: feedList.length === 0 ? [] : feedList,
        nowPage: pageParam,
        isLast,
      }
    })
}

export const postLikeAPI = ({ postId, userId }: { postId: string; userId: string }) => {
  return authInstance.post(`/post/${postId}/${userId}/like`)
}

export const postApplyAPI = ({ postId, userId }: { postId: string; userId: string }) => {
  return authInstance.post(`/post/${postId}/${userId}/apply`)
}
