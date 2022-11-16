import { atom } from 'recoil'
import { Time } from 'types/index'

export const postingDateState = atom<Date>({
  key: '#dateState',
  default: new Date(),
})

export const postingTimeState = atom<Time>({
  key: '#timeState',
  default: { slot: 'AM', hour: '00', minutes: '00' },
})
