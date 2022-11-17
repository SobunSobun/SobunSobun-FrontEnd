export interface authData {
  user: null | string
  pwd: null | string
  accessToken: null | string
}
export interface myInfo {
  nickname: string
  email: string
}

/* 동네 인증 */
export interface region {
  address_name: string
  location: {
    lat: string
    lon: string
  }
}
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
  id: number
  nickname: string
  title: string
  market: string
  meetingTime: string
  recruitmentNumber: number
  createdAt: Date
  category: Omit<category, '전체'>
}

export type category = '전체' | '과일' | '채소' | '계란' | '축산' | '생수' | '기타'
