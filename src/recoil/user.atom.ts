import { atom } from 'recoil'
import { authData } from 'types/index'

export const authInfo = atom<authData>({
  key: '#authInfo',
  default: { user: null, pwd: null, accessToken: null },
})
