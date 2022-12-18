/* api 리턴 타입 */
import { AxiosResponse } from 'axios'
import { detailData } from 'types/detail'
import { feed, FeedResponse } from './feed'
import { myInfoType } from './user'

export type getFeedType = ({
  category,
  pageParam,
  size,
}: {
  category: string
  pageParam: number
  size: number
}) => Promise<FeedResponse>

export type getDetailType = (id: string | undefined) => Promise<AxiosResponse<detailData>>

export type getMyInfoType = () => Promise<myInfoType>

export type myWriteType = (userId: number) => Promise<Array<feed>>

export type myWriteCompleteType = (userId: number) => Promise<Array<feed>>

export type myParticipateType = (userId: number) => Promise<Array<feed>>

export type myParticipateCompleteType = (userId: number) => Promise<Array<feed>>

export type myLikeListType = () => Promise<Array<feed>>
