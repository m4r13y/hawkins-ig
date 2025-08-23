"use client"

import { useModal } from '@/contexts/modal-context'
import SignInModal from '@/components/sign-in-modal'
import WaitlistModal from '@/components/waitlist-modal'
import InformationRequestModal from '@/components/information-request-modal'

export default function GlobalPopupModals() {
  const { 
    isSignInModalOpen, 
    setIsSignInModalOpen,
    isWaitlistModalOpen,
    setIsWaitlistModalOpen,
    isInformationRequestModalOpen,
    setIsInformationRequestModalOpen
  } = useModal()
  
  return (
    <>
      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
      
      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
      
      {/* Information Request Modal */}
      <InformationRequestModal 
        isOpen={isInformationRequestModalOpen} 
        onClose={() => setIsInformationRequestModalOpen(false)} 
      />
    </>
  )
}
