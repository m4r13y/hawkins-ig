"use client"

import { lazy, Suspense } from 'react'
import type { ComponentProps, ReactNode } from 'react'

// Lazy load framer-motion only when needed
const LazyMotion = lazy(() => import('framer-motion').then(mod => ({ default: mod.LazyMotion })))
const MotionDiv = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })))
const MotionSection = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.section })))

// Minimal motion features for better performance
const loadFeatures = () => import('framer-motion').then(res => res.domAnimation)

interface OptimizedMotionProps {
  initial?: any
  animate?: any
  transition?: any
  whileInView?: any
  viewport?: any
  className?: string
  children: ReactNode
}

// Optimized motion div with reduced features
export function OptimizedMotionDiv({ children, className, initial, animate, transition, whileInView, viewport }: OptimizedMotionProps) {
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotion features={loadFeatures} strict>
        <MotionDiv 
          initial={initial}
          animate={animate}
          transition={transition}
          whileInView={whileInView}
          viewport={viewport}
          className={className}
        >
          {children}
        </MotionDiv>
      </LazyMotion>
    </Suspense>
  )
}

// Optimized motion section
export function OptimizedMotionSection({ children, className, initial, animate, transition, whileInView, viewport }: OptimizedMotionProps) {
  return (
    <Suspense fallback={<section className={className}>{children}</section>}>
      <LazyMotion features={loadFeatures} strict>
        <MotionSection 
          initial={initial}
          animate={animate}
          transition={transition}
          whileInView={whileInView}
          viewport={viewport}
          className={className}
        >
          {children}
        </MotionSection>
      </LazyMotion>
    </Suspense>
  )
}

// Static fallback for critical above-the-fold content
export function StaticDiv({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

// Intersection Observer based motion (even more performant)
export function IntersectionMotionDiv({ 
  children, 
  className 
}: { children: ReactNode; className?: string }) {
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotion features={loadFeatures} strict>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className={className}
        >
          {children}
        </MotionDiv>
      </LazyMotion>
    </Suspense>
  )
}
