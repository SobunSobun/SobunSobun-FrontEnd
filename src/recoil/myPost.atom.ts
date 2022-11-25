import { atom } from 'recoil'

export const postStateAtom = atom<'myPost' | 'participatedPost'>({
  key: '#postState',
  default: 'myPost',
})
