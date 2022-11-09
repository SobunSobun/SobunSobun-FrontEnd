import { Dispatch, SetStateAction, useCallback, useState } from 'react'

type ReturnType = {
  isOpen: boolean
  onClose: () => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const useModal = (): ReturnType => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])
  return {
    isOpen,
    onClose,
    setIsOpen,
  }
}

export default useModal
