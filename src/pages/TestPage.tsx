import React from 'react'
import { useUserInfo } from '../hooks/useUserData'
import { useStake, useApprove } from '../hooks/useStaking'
import { WalletConnect } from '../components/WalletConnect'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useTranslation } from '../hooks/useTranslation'
import { CONTRACTS } from '../constants/contracts'

export function TestPage() {
  const { userInfo, pendingRewards, tokenBalance } = useUserInfo()
  const { stake, isStakeLoading } = useStake()
  const { approve, isApproveLoading } = useApprove()
  const { t } = useTranslation()

  const handleStake = () => {
    // 测试质押功能
    stake(BigInt('100000000000000000000'), '0x0000000000000000000000000000000000000000') // 100 AOT, 无推荐人
  }

  const handleApprove = () => {
    // 测试授权功能
    approve(CONTRACTS.BSC.ArriveOnTime, BigInt('100000000000000000000')) // 授权100 AOT
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.welcome')}</h1>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <WalletConnect />
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">{t('staking.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('staking.totalStaked')}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {t('staking.totalStaked')}: {userInfo?.[0]?.toString() || '0'} AOT
                </p>
                <p className="text-sm text-gray-600">
                  {t('staking.pendingRewards')}: {pendingRewards?.toString() || '0'} AOT
                </p>
                <p className="text-sm text-gray-600">
                  {t('wallet.walletConnected')}: {tokenBalance?.toString() || '0'} AOT
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('common.actions')}</h3>
              <div className="space-y-2">
                <button 
                  onClick={handleApprove}
                  disabled={isApproveLoading}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isApproveLoading ? t('common.loading') : t('staking.approve')}
                </button>
                
                <button 
                  onClick={handleStake}
                  disabled={isStakeLoading}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStakeLoading ? t('common.loading') : t('staking.stakeNow')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">{t('referral.title')}</h2>
          <p className="text-gray-600">{t('referral.inviteFriends')}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">{t('rewards.title')}</h2>
          <p className="text-gray-600">{t('rewards.totalRewards')}</p>
        </div>
      </div>
    </div>
  )
}