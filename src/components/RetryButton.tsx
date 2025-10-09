import React, { useState } from 'react'
import { RefreshCw, AlertCircle } from 'lucide-react'

interface RetryButtonProps {
  onRetry: () => Promise<void> | void
  error?: string
  className?: string
  children?: React.ReactNode
}

export function RetryButton({ onRetry, error, className = '', children }: RetryButtonProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await onRetry()
    } catch (err) {
      console.error('Retry failed:', err)
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {error && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <button
        onClick={handleRetry}
        disabled={isRetrying}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRetrying ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            重试中...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            {children || '重试'}
          </>
        )}
      </button>
    </div>
  )
}
