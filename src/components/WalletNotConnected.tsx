import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { PageTransition } from './PageTransition'
import { Wallet, AlertCircle } from 'lucide-react'

interface WalletNotConnectedProps {
  title?: string
  subtitle?: string
  showButton?: boolean
}

export function WalletNotConnected({ 
  title, 
  subtitle, 
  showButton = true 
}: WalletNotConnectedProps) {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {title || t('wallet.connectWallet')}
            </h2>
            <p className="text-gray-600 mb-6">
              {subtitle || t('data.connectWalletToViewData')}
            </p>
            {showButton && (
              <div className="text-sm text-gray-500">
                {t('data.clickConnectWalletButton')}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
