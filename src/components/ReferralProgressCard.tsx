import React from 'react'
import { Users, Target, TrendingUp, ArrowRight } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { formatReferralRate } from '../utils/formatting'

interface ReferralProgressCardProps {
  totalReferredStaked: number
  currentReferralRate: number
  className?: string
}

export function ReferralProgressCard({ 
  totalReferredStaked, 
  currentReferralRate, 
  className = '' 
}: ReferralProgressCardProps) {
  const { t } = useTranslation()
  
  // Based on real contract configuration for referral tier system
  const getNextReferralTierInfo = () => {
    // According to contract constructor configuration:
    // referralRateConfig.push(RateConfig({threshold: 0, rate: 200}));
    // referralRateConfig.push(RateConfig({threshold: 1000 ether, rate: 250}));
    // referralRateConfig.push(RateConfig({threshold: 5000 ether, rate: 300}));
    // referralRateConfig.push(RateConfig({threshold: 10000 ether, rate: 350}));
    // referralRateConfig.push(RateConfig({threshold: 20000 ether, rate: 400}));
    // referralRateConfig.push(RateConfig({threshold: 50000 ether, rate: 450}));
    // referralRateConfig.push(RateConfig({threshold: 100000 ether, rate: 500}));
    
    // Calculate next tier based on current referred staked amount
    if (totalReferredStaked < 1000) {
      // Next tier: 1000 AOT, referral rate: 250 (0.025%)
      return { required: 1000, name: '1000 AOT', rate: 250 / 1000000 }
    } else if (totalReferredStaked < 5000) {
      // Next tier: 5000 AOT, referral rate: 300 (0.030%)
      return { required: 5000, name: '5000 AOT', rate: 300 / 1000000 }
    } else if (totalReferredStaked < 10000) {
      // Next tier: 10000 AOT, referral rate: 350 (0.035%)
      return { required: 10000, name: '10000 AOT', rate: 350 / 1000000 }
    } else if (totalReferredStaked < 20000) {
      // Next tier: 20000 AOT, referral rate: 400 (0.040%)
      return { required: 20000, name: '20000 AOT', rate: 400 / 1000000 }
    } else if (totalReferredStaked < 50000) {
      // Next tier: 50000 AOT, referral rate: 450 (0.045%)
      return { required: 50000, name: '50000 AOT', rate: 450 / 1000000 }
    } else if (totalReferredStaked < 100000) {
      // Next tier: 100000 AOT, referral rate: 500 (0.050%)
      return { required: 100000, name: '100000 AOT', rate: 500 / 1000000 }
    }
    return null // Reached highest tier
  }

  const nextTier = getNextReferralTierInfo()
  const remainingToNext = nextTier ? Math.max(0, nextTier.required - totalReferredStaked) : 0
  
  // Calculate current referral rate display using the same formatting function as other pages
  const displayRate = formatReferralRate(currentReferralRate)
  
  // Calculate progress percentage
  const progressPercentage = nextTier ? Math.min(100, (totalReferredStaked / nextTier.required) * 100) : 100

  return (
    <div className={`glass-card p-3 ${className}`}>
      <div className="space-y-3">
        {/* 当前推荐率 */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
            <span className="text-xs font-semibold glass-text-blue-light">
              {t('referral.currentReferralRate')}
            </span>
          </div>
          <div className="text-xl font-bold glass-text-red">
            {displayRate}%
          </div>
        </div>

        {/* 当前推荐质押量 */}
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-white/20">
          <div className="text-center">
            <div className="text-sm font-semibold glass-text-gold">
              {totalReferredStaked.toFixed(2)} AOT
            </div>
            <div className="text-xs glass-text-blue-light">{t('referral.progress')}</div>
          </div>
        </div>

        {/* 下一档位信息 */}
        {nextTier && (
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-3 w-3 text-blue-600 mr-1" />
                <span className="text-xs font-medium glass-text-blue">{t('referral.nextTier')}: {nextTier.name}</span>
              </div>
              <div className="text-sm font-bold glass-text-red mb-1">
                {formatReferralRate(nextTier.rate * 1000000)}%
              </div>
              <div className="text-xs glass-text-gold-light">
                {t('referral.needToRefer')} <span className="font-semibold">{remainingToNext.toFixed(2)} AOT</span>
              </div>
            </div>
          </div>
        )}

        {/* 最高档位提示 */}
        {!nextTier && (
          <div className="bg-gradient-to-r from-yellow-50/50 to-orange-50/50 backdrop-blur-sm rounded-lg p-2 border border-yellow-200/30">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-3 w-3 text-yellow-600 mr-1" />
                <span className="text-xs font-semibold glass-text-gold">{t('referral.maxTierReached')}</span>
              </div>
              <div className="text-xs glass-text-gold-light">
                {t('referral.maxTierMessage')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
