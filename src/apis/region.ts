/* eslint-disable */
import axios from 'axios'
import { region, kakaoResponse } from 'types'



export const getRegions = ({ data }: { data: string }): Promise<Array<region>> => {
  return axios
    .get<kakaoResponse>('https://dapi.kakao.com/v2/local/search/address.json', {
      params: {
        analyze_type: 'similar',
        query: data,
        page: 1,
        size: 10,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_LOCAL_KEY}`,
      },
    })
    .then((res) => {
      return res.data.documents.map((v) => ({ address_name: v.address_name, location: { lat: v.y, lon: v.x } }))
    })
}
