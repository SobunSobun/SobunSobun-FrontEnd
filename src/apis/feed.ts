import {
  feed,
  getFeedType,
  myParticipateCompleteType,
  myParticipateType,
  myWriteCompleteType,
  myWriteType,
  myLikeListType,
} from 'types'
import { authInstance } from './client'

// string 배열로 오는 createdAt을 Date 객체로 변환 시키는 함수
function convertDate(data: Array<number>) {
  return new Date(
    (data as number[])[0],
    (data as number[])[1] - 1,
    (data as number[])[2],
    (data as number[])[3],
    (data as number[])[4],
    (data as number[])[5]
  )
}

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
          createdAt: convertDate(v.createdAt as number[]),
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

// 내가 작성한 게시물 진행 중 / 완료
export const myWriteAPI: myWriteType = (userId: number) => {
  return authInstance.get(`/myPosts/${userId}/ongoing`).then((res) => {
    return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
  })
}

export const myWriteCompleteAPI: myWriteCompleteType = (userId: number) => {
  return authInstance.get(`/myPosts/${userId}/finished`).then((res) => {
    return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
  })
}

// 내가 참여한 게시물 진행 중 / 완료
export const myParticipateAPI: myParticipateType = (userId: number) => {
  return authInstance.get(`/myPosts/${userId}/ongoing/applied`).then((res) => {
    return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
  })
}

export const myParticipateCompleteAPI: myParticipateCompleteType = (userId: number) => {
  return authInstance.get(`/myPosts/${userId}/ongoing/applied`).then((res) => {
    return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
  })
}

// 관심 목록
export const getMyLikeList: myLikeListType = () => {
  return authInstance.get('/myLikes').then((res) => {
    return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
  })
}
