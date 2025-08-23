"use client"

import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CustomerInquiry from "@/components/customer-inquiry"

export default function InquiryPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <CustomerInquiry />
        <AnimatedFooter />
      </div>
    </div>
  )
}
