import { getInstance } from 'apis/client'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const postSignupAPI = (formData: FormData) => {
  return getInstance().post('/join', formData)
}

const useSingup = (state: any) => {
  const navigate = useNavigate()
  return useMutation(postSignupAPI, {
    onSuccess: () => {
      navigate('/complete', state)
    },
    onError: (err: AxiosError) => {
      // eslint-disable-next-line no-console
      console.log(err)
    },
  })
}

export default useSingup
