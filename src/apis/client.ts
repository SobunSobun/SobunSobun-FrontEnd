import axios from 'axios'

const BASE_URL = 'http://15.164.112.119:8080'

const axiosApi = (url: string) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
  })
  return instance
}

const axiosAuthApi = (url: string) => {
  const token = '소분토큰'
  const instance = axios.create({
    // baseURL: url,
    withCredentials: true,
    headers: { SOBUNSOBUN: token },
  })
  return instance
}

export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)
