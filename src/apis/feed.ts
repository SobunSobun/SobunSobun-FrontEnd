import {
  feed,
  getFeedType,
  myParticipateCompleteType,
  myParticipateType,
  myWriteCompleteType,
  myWriteType,
  myLikeListType,
} from 'types'
import { getInstance } from './client'

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

export const getFeedAPI: getFeedType = async ({ category, pageParam, size }) => {
  const res = await getInstance(true).get('/post', {
    params: {
      category: category === '전체' ? 'ALL' : category,
      page: pageParam,
      size,
    },
  })
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
}

export const postLikeAPI = ({ postId, userId }: { postId: string; userId: string }) => {
  return getInstance(true).post(`/post/${postId}/${userId}/like`)
}

export const postApplyAPI = ({ postId, userId }: { postId: string; userId: string }) => {
  return getInstance(true).post(`/post/${postId}/${userId}/apply`)
}

// 내가 작성한 게시물 진행 중 / 완료
export const myWriteAPI: myWriteType = async (userId: number) => {
  const res = await getInstance(true).get(`/myPosts/${userId}/ongoing`)
  return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
}

export const myWriteCompleteAPI: myWriteCompleteType = async (userId: number) => {
  const res = await getInstance(true).get(`/myPosts/${userId}/finished`)
  return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
}

// 내가 참여한 게시물 진행 중 / 완료
export const myParticipateAPI: myParticipateType = async (userId: number) => {
  const res = await getInstance(true).get(`/myPosts/${userId}/ongoing/applied`)
  return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
}

export const myParticipateCompleteAPI: myParticipateCompleteType = async (userId: number) => {
  const res = await getInstance(true).get(`/myPosts/${userId}/finished/applied`)
  return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
}

// 관심 목록
export const getMyLikeList: myLikeListType = async () => {
  const res = await getInstance(true).get('/myLikes')
  return res.data.map((v: feed) => ({ ...v, createdAt: convertDate(v.createdAt as number[]) }))
}
