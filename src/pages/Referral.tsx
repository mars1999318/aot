import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { useReferral } from '../hooks/useReferral'
import { ReferralLink } from '../components/ReferralLink'
import { ReferralStatsComponent } from '../components/ReferralStats'
import { ReferralHistory } from '../components/ReferralHistory'
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
  const { address } = useAccount()
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

  // 如果没有连接钱包，显示提示
  if (!address) {
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    {t('data.walletNotConnected')}
                  </h3>
                  <p className="text-sm text-yellow-600 mt-1">
                    {t('data.connectWalletToViewData')}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    )
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold glass-text-gold mb-4">{t('referral.title')}</h1>
            <p className="text-lg glass-text-red max-w-2xl mx-auto mb-6">{t('referral.subtitle')}</p>
            
            {/* 金色装饰线 */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full mx-4"></div>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={refreshData}
                className="glass-button px-4 py-2 text-sm text-gray-800 font-semibold"
              >
                强制刷新数据 (v{dataVersion})
              </button>
            </div>
          </div>
        </FadeIn>

        {/* 推荐统计 */}
        <FadeIn delay={100}>
          {referralStats && <ReferralStatsComponent stats={referralStats} className="mb-8" />}
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