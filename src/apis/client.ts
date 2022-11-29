import axios, { AxiosError } from 'axios'

const BASE_URL = 'http://15.164.112.119:8080'

const baseSettings = {
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 10 * 1000,
}

const axiosApi = () => {
  const instance = axios.create(baseSettings)
  return instance
}

const axiosAuthApi = () => {
  const instance = axios.create({
    ...baseSettings,
    headers: { SOBUNSOBUN: `${localStorage.getItem('sobunsobun')}` },
  })
  return instance
}

export const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError => {
  return axios.isAxiosError(err)
}

export const defaultInstance = axiosApi()
export const authInstance = axiosAuthApi()

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('sobunsobun')
  if (!config.headers || !token) return config
  const headerToken = config.headers.SOBUNSOBUN
  if (headerToken === token) return config

  config.headers.SOBUNSOBUN = token
  return config
})
