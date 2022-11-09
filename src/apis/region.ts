import axios from 'axios'

export const getRegions = ({ data }: { data: string }) => {
  return axios
    .get('https://dapi.kakao.com/v2/local/search/address.json', {
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
      // const returnArray = res.data.documents.map((v) => ({
      //   id: Date.now(),
      //   address: v.address_name,
      // }))
      return res.data.documents.map((v: any) => v.address_name)
    })
}
