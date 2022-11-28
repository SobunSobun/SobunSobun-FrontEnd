import { atom } from 'recoil'
import { Time, Place } from 'types/index'

export const postingTitleState = atom({
  key: '#postingTitleState',
  default: '',
})

export const postingContentState = atom({
  key: '#postingContentState',
  default: '',
})

export const postingCountState = atom({
  key: '#postingCountState',
  default: 2,
})

export const postingDateState = atom<Date>({
  key: '#dateState',
  default: new Date(),
})

export const postingTimeState = atom<Time>({
  key: '#timeState',
  default: { slot: 'AM', hour: '00', minutes: '00' },
})

export const postingPlaceState = atom<Place>({
  key: '#placeState',
  default: { place: '', address: '' },
})

export const modalChangeState = atom({
  key: '#modalChangeState',
  default: false,
})

export const categoryState = atom({
  key: '#categoryState',
  default: '',
})

export const isEditDefaultValue = atom({
  key: '#isEditDefaultValue',
  default: false,
})
