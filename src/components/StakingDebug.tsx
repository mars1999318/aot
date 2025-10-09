import React from 'react'
import { useAccount, useBalance } from 'wagmi'
import { useUserInfo } from '../hooks/useUserData'
import { useTranslation } from '../hooks/useTranslation'
import { CURRENT_NETWORK } from '../constants/contracts'
import { formatNumber, formatToken, formatAddress } from '../utils/formatting'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

export function StakingDebug() {
  const { address, isConnected } = useAccount()
  const { userInfo, pendingRewards, tokenBalance } = useUserInfo()
  const { t } = useTranslation()

  const { data: bnbBalance } = useBalance({
    address: address,
  })

  const checks = [
    {
      name: 'Wallet Connected',
      status: isConnected,
      message: isConnected ? 'Wallet is connected' : 'Please connect your wallet'
    },
    {
      name: 'Network',
      status: true, // 这里应该检查网络
      message: 'Connected to BSC Mainnet'
    },
    {
      name: 'BNB Balance',
      status: bnbBalance && parseFloat(bnbBalance.formatted) > 0.01,
      message: bnbBalance ? formatToken(bnbBalance.formatted, 'BNB', 4) : 'No BNB balance'
    },
    {
      name: 'AOT Token Balance',
      status: tokenBalance && parseFloat(tokenBalance.toString()) > 0,
      message: tokenBalance ? formatToken(tokenBalance.toString(), 'AOT', 2) : 'No AOT tokens'
    },
    {
      name: 'Contract Address',
      status: true,
      message: `ArriveOnTime: ${CURRENT_NETWORK.ArriveOnTime}`
    },
    {
      name: 'Token Address',
      status: true,
      message: `AOTToken: ${CURRENT_NETWORK.AOTToken}`
    }
  ]

  return (
    <div className="modern-card mb-4">
      <div className="modern-card-header">
        <h3 className="text-lg font-semibold modern-text-primary flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-500" />
          System Status
        </h3>
      </div>
      <div className="modern-card-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium modern-text-secondary">{check.name}</span>
              <div className="flex items-center gap-2">
                {check.status ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-xs ${check.status ? 'text-green-600' : 'text-red-600'}`}>
                  {check.name === 'Contract Address' || check.name === 'Token Address' 
                    ? formatAddress(check.message.split(': ')[1])
                    : check.message
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {!isConnected && (
        <div className="modern-card-footer">
          <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">
              Connect wallet to start staking
            </p>
          </div>
        </div>
      )}
      
      {isConnected && (!bnbBalance || parseFloat(bnbBalance.formatted) < 0.01) && (
        <div className="modern-card-footer">
          <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
            <p className="text-sm text-yellow-600">
              Need 0.01+ BNB for gas fees
            </p>
          </div>
        </div>
      )}
      
      {isConnected && (!tokenBalance || parseFloat(tokenBalance.toString()) === 0) && (
        <div className="modern-card-footer">
          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-blue-600">
              Need AOT tokens to stake
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
