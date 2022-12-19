export interface ReplyCommentType {
  childCommentId: number
  nickname: string
  content: string
  profileUrl: string
  createdAt: number[]
}
export interface CommentType {
  parentCommentId: number
  nickname: string
  content: string
  profileUrl: string
  createdAt: number[]
  childComments: ReplyCommentType[]
}

export interface detailData {
  nickname: string
  title: string
  content: string
  category: string
  meetingTime: string
  market: string
  marketAddress: string
  recruitmentNumber: number
  applyNumber: number
  uploadTime: string
  isLike: boolean
  isApply: boolean
  isWriter: boolean
  profileUrl: string
}
