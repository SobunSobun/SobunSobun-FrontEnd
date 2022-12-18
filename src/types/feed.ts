export type category = '전체' | '과일' | '채소' | '계란' | '축산' | '생수' | '기타'

export interface feed {
  postId: number
  nickname: string
  title: string
  market: string
  meetingTime: string
  recruitNumber: number
  applyNumber: number
  createdAt: Date | number[]
  category: category
  last?: boolean
}

export interface FeedResponse {
  feedList: Array<feed>
  nowPage: number
  isLast: boolean
}
