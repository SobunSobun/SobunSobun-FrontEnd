import { atom } from 'recoil'

export const anyState = atom<string>({
  key: '',
  default: '',
})
