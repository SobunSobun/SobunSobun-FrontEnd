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
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: { SOBUNSOBUN: `${localStorage.getItem('sobunsobun')}` },
  })
  return instance
}

export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)
