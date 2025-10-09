import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { AlertCircle, Loader2 } from 'lucide-react'

interface DataLoadingStateProps {
  isLoading: boolean
  hasError: boolean
  error?: string
  children: React.ReactNode
}

export function DataLoadingState({ isLoading, hasError, error, children }: DataLoadingStateProps) {
  const { isConnected } = useAccount()
  const { t } = useTranslation()

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          {t('data.walletNotConnected')}
        </h3>
        <p className="text-yellow-600">
          {t('data.connectWalletToViewData')}
        </p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {t('data.dataLoadError')}
        </h3>
        <p className="text-red-600">
          {error || t('data.failedToLoadData')}
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <Loader2 className="h-8 w-8 text-blue-500 mx-auto mb-3 animate-spin" />
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          {t('data.loadingData')}
        </h3>
        <p className="text-blue-600">
          {t('data.fetchingFromContract')}
        </p>
      </div>
    )
  }

  return <>{children}</>
}
