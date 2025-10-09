import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface ProfessionalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'glass' | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  glow?: boolean
  pulse?: boolean
}

export function ProfessionalButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  glow = false,
  pulse = false
}: ProfessionalButtonProps) {
  const baseClasses = 'professional-btn inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
  
  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs min-h-[32px]',
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 shadow-lg hover:shadow-xl',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 focus:ring-yellow-500 shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
    glass: 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 focus:ring-white/50 shadow-lg hover:shadow-xl',
    gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:ring-purple-500 shadow-lg hover:shadow-xl'
  }

  const glowClass = glow ? 'hover:shadow-2xl hover:shadow-blue-500/25' : ''
  const pulseClass = pulse ? 'animate-pulse' : ''
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${glowClass}
        ${pulseClass}
        ${widthClass}
        ${className}
      `}
    >
      {loading && (
        <LoadingSpinner size="sm" color="white" className="mr-2" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  )
}

interface ProfessionalButtonGroupProps {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

export function ProfessionalButtonGroup({ 
  children, 
  className = '', 
  direction = 'horizontal',
  spacing = 'md'
}: ProfessionalButtonGroupProps) {
  const directionClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col'
  }

  const spacingClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  }

  return (
    <div className={`
      ${directionClasses[direction]}
      ${spacingClasses[spacing]}
      ${className}
    `}>
      {children}
    </div>
  )
}
