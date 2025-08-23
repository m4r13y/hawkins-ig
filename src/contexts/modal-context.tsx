"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface WaitlistFormData {
  name: string
  email: string
  feature: string
}

interface InformationRequestData {
  name: string
  email: string
  service: string
  requestType: 'waitlist' | 'information'
}

interface ModalContextType {
  isSignInModalOpen: boolean
  setIsSignInModalOpen: (open: boolean) => void
  isWaitlistModalOpen: boolean
  setIsWaitlistModalOpen: (open: boolean) => void
  waitlistFormData: WaitlistFormData
  setWaitlistFormData: (data: WaitlistFormData) => void
  isInformationRequestModalOpen: boolean
  setIsInformationRequestModalOpen: (open: boolean) => void
  informationRequestData: InformationRequestData
  setInformationRequestData: (data: InformationRequestData) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [waitlistFormData, setWaitlistFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    feature: ''
  })
  const [isInformationRequestModalOpen, setIsInformationRequestModalOpen] = useState(false)
  const [informationRequestData, setInformationRequestData] = useState<InformationRequestData>({
    name: '',
    email: '',
    service: '',
    requestType: 'information'
  })

  return (
    <ModalContext.Provider value={{
      isSignInModalOpen,
      setIsSignInModalOpen,
      isWaitlistModalOpen,
      setIsWaitlistModalOpen,
      waitlistFormData,
      setWaitlistFormData,
      isInformationRequestModalOpen,
      setIsInformationRequestModalOpen,
      informationRequestData,
      setInformationRequestData
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export type { WaitlistFormData, InformationRequestData }
