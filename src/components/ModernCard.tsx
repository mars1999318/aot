import React from 'react'

interface ModernCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg'
  border?: boolean
}

export function ModernCard({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  shadow = 'md',
  border = true
}: ModernCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  return (
    <div className={`
      card-primary transition-smooth
      ${shadowClasses[shadow]}
      ${border ? 'border border-gray-200' : ''}
      ${hover ? 'hover:shadow-elegant-hover hover-lift' : ''}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  )
}

interface ModernCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function ModernCardHeader({ children, className = '' }: ModernCardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl ${className}`}>
      {children}
    </div>
  )
}

interface ModernCardBodyProps {
  children: React.ReactNode
  className?: string
}

export function ModernCardBody({ children, className = '' }: ModernCardBodyProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

interface ModernCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function ModernCardFooter({ children, className = '' }: ModernCardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl ${className}`}>
      {children}
    </div>
  )
}
