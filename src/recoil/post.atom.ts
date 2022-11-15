import { atom } from 'recoil'

export const dateState = atom<Date>({
  key: '#dateState',
  default: new Date(),
})
