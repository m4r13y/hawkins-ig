"use client"

import { useModal } from '@/contexts/modal-context'
import SignInModal from '@/components/sign-in-modal'

export default function GlobalPopupModals() {
  const { isSignInModalOpen, setIsSignInModalOpen } = useModal()
  
  return (
    <>
      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
      
      {/* Additional modals will be added here */}
    </>
  )
}
