import React from 'react'
import { Users, Target, TrendingUp, ArrowRight } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

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
  
  // 基于合约真实配置的推荐档位系统
  const getNextReferralTierInfo = () => {
    // 根据合约构造函数中的真实配置：
    // referralRateConfig.push(RateConfig({threshold: 0, rate: 200}));
    // referralRateConfig.push(RateConfig({threshold: 1000 ether, rate: 250}));
    // referralRateConfig.push(RateConfig({threshold: 5000 ether, rate: 300}));
    // referralRateConfig.push(RateConfig({threshold: 10000 ether, rate: 350}));
    // referralRateConfig.push(RateConfig({threshold: 20000 ether, rate: 400}));
    // referralRateConfig.push(RateConfig({threshold: 50000 ether, rate: 450}));
    // referralRateConfig.push(RateConfig({threshold: 100000 ether, rate: 500}));
    
    // 根据当前推荐质押量计算下一档位
    if (totalReferredStaked < 1000) {
      // 下一档位：1000 AOT，推荐率：250 (0.025%)
      return { required: 1000, name: '1000 AOT', rate: 250 / 1000000 }
    } else if (totalReferredStaked < 5000) {
      // 下一档位：5000 AOT，推荐率：300 (0.030%)
      return { required: 5000, name: '5000 AOT', rate: 300 / 1000000 }
    } else if (totalReferredStaked < 10000) {
      // 下一档位：10000 AOT，推荐率：350 (0.035%)
      return { required: 10000, name: '10000 AOT', rate: 350 / 1000000 }
    } else if (totalReferredStaked < 20000) {
      // 下一档位：20000 AOT，推荐率：400 (0.040%)
      return { required: 20000, name: '20000 AOT', rate: 400 / 1000000 }
    } else if (totalReferredStaked < 50000) {
      // 下一档位：50000 AOT，推荐率：450 (0.045%)
      return { required: 50000, name: '50000 AOT', rate: 450 / 1000000 }
    } else if (totalReferredStaked < 100000) {
      // 下一档位：100000 AOT，推荐率：500 (0.050%)
      return { required: 100000, name: '100000 AOT', rate: 500 / 1000000 }
    }
    return null // 已达到最高档
  }

  const nextTier = getNextReferralTierInfo()
  const remainingToNext = nextTier ? Math.max(0, nextTier.required - totalReferredStaked) : 0
  
  // 计算当前推荐率显示
  const currentRate = currentReferralRate > 0 ? (currentReferralRate / 1000000) : 0
  const displayRate = (currentRate * 100).toFixed(4)
  
  // 计算进度百分比
  const progressPercentage = nextTier ? Math.min(100, (totalReferredStaked / nextTier.required) * 100) : 100

  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="space-y-4">
        {/* 标题 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold glass-text-blue">
              {t('referral.progressTitle')}
            </h3>
          </div>
          <div className="text-sm glass-text-gold">
            {totalReferredStaked.toFixed(2)} AOT
          </div>
        </div>

        {/* 当前推荐率 */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-semibold glass-text-blue-light">
              {t('referral.currentReferralRate')}
            </span>
          </div>
          <div className="text-2xl font-bold glass-text-red">
            {displayRate}%
          </div>
        </div>

        {/* 进度条 */}
        {nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs glass-text-blue-light">
              <span>{t('referral.progress')}</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* 下一档位信息 */}
        {nextTier ? (
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium glass-text-blue">
                  {t('referral.nextTier')}: {nextTier.name}
                </span>
              </div>
              <div className="text-lg font-bold glass-text-red mb-2">
                {(nextTier.rate * 100).toFixed(4)}%
              </div>
              <div className="text-sm glass-text-gold-light">
                {t('referral.needToRefer')} <span className="font-semibold">{remainingToNext.toFixed(2)} AOT</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-400/30">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium glass-text-green">
                  {t('referral.maxTierReached')}
                </span>
              </div>
              <div className="text-sm glass-text-green-light">
                {t('referral.maxTierMessage')}
              </div>
            </div>
          </div>
        )}

        {/* 激励信息 */}
        {nextTier && (
          <div className="text-center">
            <div className="text-xs glass-text-blue-light">
              {t('referral.incentiveMessage')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
