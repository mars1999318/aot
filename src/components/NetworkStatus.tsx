import React from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { CURRENT_NETWORK } from '../constants/contracts'
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'

export function NetworkStatus() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { t } = useTranslation()

  const isCorrectNetwork = chainId === 56 // BSC主网链ID

  if (!isConnected) {
    return null
  }

  return (
    <div className="mb-4">
      {!isCorrectNetwork ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                {t('network.wrongNetwork')}
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {t('network.switchToBSC')}
              </p>
              <button
                onClick={() => {
                  // 这里应该添加切换网络的逻辑
                  window.open('https://bscscan.com', '_blank')
                }}
                className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {t('network.viewOnBSCScan')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">
                {t('network.correctNetwork')}
              </h3>
              <p className="text-sm text-green-600">
                {t('network.connectedToBSC')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
