import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { useReferral } from '../hooks/useReferral'
import { ReferralLink } from '../components/ReferralLink'
import { ReferralStatsComponent } from '../components/ReferralStats'
import { ReferralHistory } from '../components/ReferralHistory'
import { WalletNotConnected } from '../components/WalletNotConnected'
import { ModernCard, ModernCardHeader, ModernCardBody } from '../components/ModernCard'
import { PageTransition, FadeIn } from '../components/PageTransition'
import { 
  Users, 
  Gift,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star
} from 'lucide-react'

export function Referral() {
  const { isConnected, address, isConnecting } = useAccount()
  const { t } = useTranslation()
  const { 
    referralStats, 
    referralRecords, 
    isLoading, 
    error, 
    generateReferralLink, 
    getReferralCode,
    dataVersion,
    refreshData
  } = useReferral()

  // 添加调试信息
  console.log('Referral - isConnected:', isConnected)
  console.log('Referral - address:', address)
  console.log('Referral - isConnecting:', isConnecting)

  // 如果正在连接钱包，显示加载状态
  if (isConnecting) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">连接钱包中...</h2>
            <p className="text-gray-600">请稍候</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  // 如果没有连接钱包，显示提示
  if (!isConnected) {
    return <WalletNotConnected />
  }


  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <PageTransition className="min-h-screen">
        <div className="space-y-6">
          <FadeIn delay={0}>
            <div className="text-center">
              <h1 className="text-3xl font-bold modern-text-primary mb-2">{t('referral.title')}</h1>
              <p className="text-base modern-text-secondary max-w-xl mx-auto">{t('referral.subtitle')}</p>
            </div>
          </FadeIn>
        
          <FadeIn delay={100}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                {t('data.loadingData')}
              </h3>
              <p className="text-blue-600">
                {t('data.fetchingFromContract')}
              </p>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    )
  }

  // 如果有错误，显示错误信息
  if (error) {
    return (
      <PageTransition className="min-h-screen">
        <div className="space-y-6">
          <FadeIn delay={0}>
            <div className="text-center">
              <h1 className="text-3xl font-bold modern-text-primary mb-2">{t('referral.title')}</h1>
              <p className="text-base modern-text-secondary max-w-xl mx-auto">{t('referral.subtitle')}</p>
            </div>
          </FadeIn>
        
          <FadeIn delay={100}>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    {t('data.dataLoadError')}
                  </h3>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-20">
        <FadeIn delay={0}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold glass-text-gold mb-2">{t('referral.title')}</h1>
            <p className="text-sm glass-text-red max-w-xl mx-auto mb-3">{t('referral.subtitle')}</p>
            
            <div className="mt-2">
              <button
                onClick={refreshData}
                className="glass-button px-3 py-1 text-xs text-gray-800 font-semibold"
              >
                {t('common.refresh')} (v{dataVersion})
              </button>
            </div>
          </div>
        </FadeIn>

        {/* 推荐统计 */}
        <FadeIn delay={100}>
          {referralStats && <ReferralStatsComponent stats={referralStats as any} className="mb-8" />}
        </FadeIn>

        <div className="space-y-6">
          {/* 推荐链接 */}
          <FadeIn delay={200}>
            <ReferralLink 
              link={generateReferralLink()} 
            />
          </FadeIn>
          
          {/* 推荐历史 */}
          <FadeIn delay={300}>
            <ReferralHistory 
              records={referralRecords} 
              isLoading={isLoading}
              dataVersion={dataVersion}
            />
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}