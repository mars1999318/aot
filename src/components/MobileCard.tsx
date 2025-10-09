import React from 'react'

interface MobileCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg'
  border?: boolean
  clickable?: boolean
}

export function MobileCard({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md',
  border = true,
  clickable = false
}: MobileCardProps) {
  const paddingClasses = {
    sm: 'mobile-p-2',
    md: 'mobile-p-4',
    lg: 'mobile-p-6'
  }

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const baseClasses = `
    mobile-card bg-white rounded-lg transition-all duration-200
    ${shadowClasses[shadow]}
    ${border ? 'border border-gray-200' : ''}
    ${clickable ? 'active:scale-98 cursor-pointer' : ''}
    ${paddingClasses[padding]}
    ${className}
  `

  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}

interface MobileCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function MobileCardHeader({ children, className = '' }: MobileCardHeaderProps) {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg ${className}`}>
      {children}
    </div>
  )
}

interface MobileCardBodyProps {
  children: React.ReactNode
  className?: string
}

export function MobileCardBody({ children, className = '' }: MobileCardBodyProps) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}

interface MobileCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function MobileCardFooter({ children, className = '' }: MobileCardFooterProps) {
  return (
    <div className={`px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg ${className}`}>
      {children}
    </div>
  )
}
