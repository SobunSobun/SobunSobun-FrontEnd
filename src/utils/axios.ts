import axios, { AxiosError } from 'axios'

export const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError => {
  return axios.isAxiosError(err)
}
