import React from 'react'

interface ProfessionalCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'gradient' | 'elevated'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  glow?: boolean
  border?: boolean
}

export function ProfessionalCard({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md',
  padding = 'md',
  hover = true,
  glow = false,
  border = true
}: ProfessionalCardProps) {
  const variantClasses = {
    default: 'professional-card',
    glass: 'professional-card bg-white/10 backdrop-blur-xl border-white/20',
    gradient: 'professional-card bg-gradient-to-br from-white/20 to-white/5 border-white/30',
    elevated: 'professional-card bg-white/15 backdrop-blur-2xl border-white/25 shadow-2xl'
  }

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const hoverClass = hover ? 'hover:transform hover:-translate-y-2 hover:shadow-2xl' : ''
  const glowClass = glow ? 'hover:shadow-glow' : ''
  const borderClass = border ? 'border border-white/20' : ''

  return (
    <div className={`
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${paddingClasses[padding]}
      ${hoverClass}
      ${glowClass}
      ${borderClass}
      transition-all duration-300 ease-out
      ${className}
    `}>
      {children}
    </div>
  )
}

interface ProfessionalCardHeaderProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export function ProfessionalCardHeader({ 
  children, 
  className = '',
  gradient = false 
}: ProfessionalCardHeaderProps) {
  const gradientClass = gradient ? 'bg-gradient-to-r from-white/20 to-transparent' : 'bg-white/10'
  
  return (
    <div className={`
      px-6 py-4 border-b border-white/10 rounded-t-xl
      ${gradientClass}
      ${className}
    `}>
      {children}
    </div>
  )
}

interface ProfessionalCardBodyProps {
  children: React.ReactNode
  className?: string
}

export function ProfessionalCardBody({ children, className = '' }: ProfessionalCardBodyProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

interface ProfessionalCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function ProfessionalCardFooter({ children, className = '' }: ProfessionalCardFooterProps) {
  return (
    <div className={`
      px-6 py-4 border-t border-white/10 rounded-b-xl
      bg-white/5
      ${className}
    `}>
      {children}
    </div>
  )
}
