import React from 'react'

interface ModernBadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
}

export function ModernBadge({
  children,
  variant = 'gray',
  size = 'md',
  className = '',
  icon
}: ModernBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }

  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <span className={`
      inline-flex items-center rounded-full border font-medium
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${className}
    `}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  )
}
