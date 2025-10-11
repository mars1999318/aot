import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { useReferral } from '../hooks/useReferral'
import { ReferralStatsComponent } from '../components/ReferralStats'
import { ReferralHistory } from '../components/ReferralHistory'
import { ReferralProgressCard } from '../components/ReferralProgressCard'
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

  // Add debug information
  console.log('Referral - isConnected:', isConnected)
  console.log('Referral - address:', address)
  console.log('Referral - isConnecting:', isConnecting)

  // If connecting wallet, show loading state
  if (isConnecting) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">{t('wallet.connecting')}</h2>
            <p className="text-gray-600">{t('common.pleaseWait')}</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  // If wallet is not connected, show prompt
  if (!isConnected) {
    return <WalletNotConnected />
  }


  // If loading, show loading state
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

  // If there's an error, show error message
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
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 pb-20">
        <FadeIn delay={0}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold glass-text-gold mb-2">{t('referral.title')}</h1>
            <p className="text-sm glass-text-red max-w-xl mx-auto mb-3">{t('referral.subtitle')}</p>
            
          </div>
        </FadeIn>

        {/* Referral Statistics */}
        <FadeIn delay={100}>
          {referralStats && <ReferralStatsComponent stats={referralStats as any} className="mb-8" />}
        </FadeIn>

        {/* Referral Progress Card */}
        <FadeIn delay={200}>
          {referralStats && (
            <ReferralProgressCard 
              totalReferredStaked={parseFloat(referralStats.totalReferredStaked || '0')}
              currentReferralRate={referralStats.currentReferralRate || 0}
              className="mb-8"
            />
          )}
        </FadeIn>

        <div className="space-y-6">
          
          {/* Referral History */}
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