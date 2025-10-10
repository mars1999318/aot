import React from 'react'

interface MobileButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  block?: boolean
}

export function MobileButton({
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
  block = false
}: MobileButtonProps) {
  const baseClasses = 'mobile-btn inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation'
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  }

  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 shadow-sm hover:shadow-md active:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300 active:bg-gray-300',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-sm hover:shadow-md active:bg-green-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md active:bg-red-700',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500 active:bg-blue-600',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 active:bg-gray-200'
  }

  const widthClass = fullWidth || block ? 'w-full' : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
    >
      {loading ? (
        <span key="loading-content" className="flex items-center">
          <div className="inline-block animate-spin rounded-full border-2 border-solid border-white border-r-transparent h-4 w-4 mr-2"></div>
        </span>
      ) : (
        <span key="normal-content">
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </span>
      )}
    </button>
  )
}

interface MobileButtonGroupProps {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
}

export function MobileButtonGroup({ 
  children, 
  className = '', 
  direction = 'horizontal' 
}: MobileButtonGroupProps) {
  const directionClasses = {
    horizontal: 'flex flex-row space-x-2',
    vertical: 'flex flex-col space-y-2'
  }

  return (
    <div className={`${directionClasses[direction]} ${className}`}>
      {children}
    </div>
  )
}
