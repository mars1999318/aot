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
    // According to contract constructor configuration (1e6 precision):
    // referralRateConfig.push(RateConfig({threshold: 0, rate: 200_000}));
    // referralRateConfig.push(RateConfig({threshold: 1_500 ether, rate: 210_000}));
    // referralRateConfig.push(RateConfig({threshold: 3_000 ether, rate: 230_000}));
    // referralRateConfig.push(RateConfig({threshold: 6_000 ether, rate: 260_000}));
    // referralRateConfig.push(RateConfig({threshold: 12_000 ether, rate: 300_000}));
    // referralRateConfig.push(RateConfig({threshold: 24_000 ether, rate: 350_000}));
    // referralRateConfig.push(RateConfig({threshold: 45_000 ether, rate: 410_000}));
    // referralRateConfig.push(RateConfig({threshold: 90_000 ether, rate: 480_000}));
    // referralRateConfig.push(RateConfig({threshold: 150_000 ether, rate: 560_000}));
    
    // Calculate next tier based on current referred staked amount
    if (totalReferredStaked < 1500) {
      // Next tier: 1500 AOT, referral rate: 210_000 (21%)
      return { required: 1500, name: '1500 AOT', rate: 210_000 / 1_000_000 }
    } else if (totalReferredStaked < 3000) {
      // Next tier: 3000 AOT, referral rate: 230_000 (23%)
      return { required: 3000, name: '3000 AOT', rate: 230_000 / 1_000_000 }
    } else if (totalReferredStaked < 6000) {
      // Next tier: 6000 AOT, referral rate: 260_000 (26%)
      return { required: 6000, name: '6000 AOT', rate: 260_000 / 1_000_000 }
    } else if (totalReferredStaked < 12000) {
      // Next tier: 12000 AOT, referral rate: 300_000 (30%)
      return { required: 12000, name: '12000 AOT', rate: 300_000 / 1_000_000 }
    } else if (totalReferredStaked < 24000) {
      // Next tier: 24000 AOT, referral rate: 350_000 (35%)
      return { required: 24000, name: '24000 AOT', rate: 350_000 / 1_000_000 }
    } else if (totalReferredStaked < 45000) {
      // Next tier: 45000 AOT, referral rate: 410_000 (41%)
      return { required: 45000, name: '45000 AOT', rate: 410_000 / 1_000_000 }
    } else if (totalReferredStaked < 90000) {
      // Next tier: 90000 AOT, referral rate: 480_000 (48%)
      return { required: 90000, name: '90000 AOT', rate: 480_000 / 1_000_000 }
    } else if (totalReferredStaked < 150000) {
      // Next tier: 150000 AOT, referral rate: 560_000 (56%)
      return { required: 150000, name: '150000 AOT', rate: 560_000 / 1_000_000 }
    }
    return null // Reached highest tier
  }

  const nextTier = getNextReferralTierInfo()
  const remainingToNext = nextTier ? Math.max(0, nextTier.required - totalReferredStaked) : 0
  
  // Calculate current referral rate display using the same formatting function as other pages
  // currentReferralRate is already in decimal form (e.g., 0.2 for 0.2%)
  const displayRate = formatReferralRate(currentReferralRate * 1_000_000) // Convert back to 1e6 precision for formatting
  
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
                {formatReferralRate(nextTier.rate * 1_000_000)}%
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
