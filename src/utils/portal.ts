import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.getElementById('modal')!)
}
