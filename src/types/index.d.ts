export interface authData {
  user: null | string
  pwd: null | string
  accessToken: null | string
}
export interface myInfo {
  nickname: string
  email: string
}
export interface Time {
  slot: string
  hour: string
  minutes: string
}
export interface Place {
  place: string
  address: string
}

export interface Keyword {
  searchKeyword: string
  close: () => void
}

/* 게시글 올리기 - 만날장소 () */
export interface MapDataType {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

/* modal show, close type */
export interface ModalPropsType {
  show: boolean
  close: () => void
}

export interface PaginationType {
  current: number
  first: number
  gotoFirst: () => void
  gotoLast: () => void
  gotoPage: (arg0: number) => void
  hasNextPage: Boolean
  hasPrevPage: Boolean
  last: number
  nextPage: () => void
  perPage: number
  prevPage: () => void
  totalCount: number
}

/* 동네 인증 */
export interface region {
  address_name: string
  location: {
    lat: string
    lon: string
  }
}

/*
address_name	String	전체 지번 주소 또는 전체 도로명 주소, 입력에 따라 결정됨
address_type	String	address_name의 값의 타입(Type)
다음 중 하나:
REGION(지명)
ROAD(도로명)
REGION_ADDR(지번 주소)
ROAD_ADDR(도로명 주소)
x	String	X 좌표값, 경위도인 경우 경도(longitude)
y	String	Y 좌표값, 경위도인 경우 위도(latitude)
address	Address	지번 주소 상세 정보, 아래 Address 참고
road_address	RoadAaddress	도로명 주소 상세 정보, 아래 RoadAaddress 참고
*/
export interface kakaoResponse {
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
  }
  documents: Array<{
    address_name: string
    address_type: string
    x: string
    y: string
    address: any /* 사용 안할 값이여서 일단 any로 하겠습니다. */
    road_address: any /* 사용 안할 값이여서 일단 any로 하겠습니다. */
  }>
}

/* 메인페이지 */
export interface feed {
  postId: number
  nickname: string
  title: string
  market: string
  meetingTime: string
  recruitNumber: number
  createdAt: Date | number[]
  category: Omit<category, '전체'>
  last?: boolean
}

interface FeedResponse {
  feedList: Array<feed>
  nowPage: number
  isLast: boolean
}

type category = '전체' | '과일' | '채소' | '계란' | '축산' | '생수' | '기타'

/* api 리턴 타입 */
type getFeedType = ({
  category,
  pageParam,
  size,
}: {
  category: string
  pageParam: number
  size: number
}) => Promise<FeedResponse>

interface datailData {
  nickname: string
  title: string
  content: string
  category: string
  meetingTime: string
  market: string
  recruitmentNumber: number
  applyNumber: number
  uploadTime: string
}
