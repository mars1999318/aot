import React from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

interface ValidationMessageProps {
  type?: 'error' | 'success' | 'warning' | 'info'
  message: string
  className?: string
}

export function ValidationMessage({ 
  type = 'error', 
  message, 
  className = '' 
}: ValidationMessageProps) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'error':
        return 'text-red-600'
      case 'success':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'info':
        return 'text-blue-600'
      default:
        return 'text-red-600'
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-red-50 border-red-200'
    }
  }

  return (
    <div className={`flex items-center p-3 rounded-lg border ${getBackgroundColor()} ${className}`}>
      {getIcon()}
      <span className={`ml-2 text-sm font-medium ${getTextColor()}`}>
        {message}
      </span>
    </div>
  )
}
