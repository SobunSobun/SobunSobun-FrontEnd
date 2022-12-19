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
