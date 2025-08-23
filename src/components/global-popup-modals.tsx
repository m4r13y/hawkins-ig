"use client"

import { useModal } from '@/contexts/modal-context'
import SignInModal from '@/components/sign-in-modal'
import WaitlistModal from '@/components/waitlist-modal'
import InformationRequestModal from '@/components/information-request-modal'
import ComingSoonModal from '@/components/coming-soon-modal'
import GlobalContactFormModal from '@/components/global-contact-form-modal'

export default function GlobalPopupModals() {
  const { 
    isSignInModalOpen, 
    setIsSignInModalOpen,
    isWaitlistModalOpen,
    setIsWaitlistModalOpen,
    isInformationRequestModalOpen,
    setIsInformationRequestModalOpen,
    isComingSoonModalOpen,
    setIsComingSoonModalOpen,
    isContactFormModalOpen,
    setIsContactFormModalOpen
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
      
      {/* Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={isComingSoonModalOpen} 
        onClose={() => setIsComingSoonModalOpen(false)} 
      />
      
      {/* Contact Form Modal */}
      <GlobalContactFormModal />
    </>
  )
}