import React from 'react'
import { Percent, Target, TrendingUp } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

interface StakingProgressCardProps {
  currentStaked: number
  currentRate: number
  className?: string
}

export function StakingProgressCard({ currentStaked, currentRate, className = '' }: StakingProgressCardProps) {
  const { t } = useTranslation()
  // 显示正确的质押率 - 使用合约返回的实际收益率
  // 按照Dashboard的方式转换：rawStakingRate / 1000000，然后乘以100显示为百分比
  const stakingRate = currentRate > 0 ? (currentRate / 1000000) : 0
  const displayRate = (stakingRate * 100).toFixed(4)
  
  // 基于合约真实配置的档位系统
  const getNextTierInfo = () => {
    // 根据合约构造函数中的真实配置：
    // stakingRateConfig.push(RateConfig({threshold: 0, rate: 700}));
    // stakingRateConfig.push(RateConfig({threshold: 500 ether, rate: 770}));
    // stakingRateConfig.push(RateConfig({threshold: 1_000 ether, rate: 840}));
    // stakingRateConfig.push(RateConfig({threshold: 2_000 ether, rate: 910}));
    // stakingRateConfig.push(RateConfig({threshold: 4_000 ether, rate: 980}));
    // stakingRateConfig.push(RateConfig({threshold: 8_000 ether, rate: 1_050}));
    // stakingRateConfig.push(RateConfig({threshold: 15_000 ether, rate: 1_120}));
    // stakingRateConfig.push(RateConfig({threshold: 30_000 ether, rate: 1_190}));
    // stakingRateConfig.push(RateConfig({threshold: 50_000 ether, rate: 1_260}));
    
    // 根据当前质押量计算下一档位
    if (currentStaked < 500) {
      // 下一档位：500 AOT，收益率：770 (0.077%)
      return { required: 500, name: '500 AOT', rate: 770 / 1000000 }
    } else if (currentStaked < 1000) {
      // 下一档位：1000 AOT，收益率：840 (0.084%)
      return { required: 1000, name: '1000 AOT', rate: 840 / 1000000 }
    } else if (currentStaked < 2000) {
      // 下一档位：2000 AOT，收益率：910 (0.091%)
      return { required: 2000, name: '2000 AOT', rate: 910 / 1000000 }
    } else if (currentStaked < 4000) {
      // 下一档位：4000 AOT，收益率：980 (0.098%)
      return { required: 4000, name: '4000 AOT', rate: 980 / 1000000 }
    } else if (currentStaked < 8000) {
      // 下一档位：8000 AOT，收益率：1050 (0.105%)
      return { required: 8000, name: '8000 AOT', rate: 1050 / 1000000 }
    } else if (currentStaked < 15000) {
      // 下一档位：15000 AOT，收益率：1120 (0.112%)
      return { required: 15000, name: '15000 AOT', rate: 1120 / 1000000 }
    } else if (currentStaked < 30000) {
      // 下一档位：30000 AOT，收益率：1190 (0.119%)
      return { required: 30000, name: '30000 AOT', rate: 1190 / 1000000 }
    } else if (currentStaked < 50000) {
      // 下一档位：50000 AOT，收益率：1260 (0.126%)
      return { required: 50000, name: '50000 AOT', rate: 1260 / 1000000 }
    }
    return null // 已达到最高档
  }

  const nextTier = getNextTierInfo()
  const remainingToNext = nextTier ? Math.max(0, nextTier.required - currentStaked) : 0

  return (
    <div className={`glass-card p-3 ${className}`}>
      <div className="space-y-3">
        {/* 当前质押率 */}
        <div>
          <div className="flex items-center mb-1">
            <Percent className="h-3 w-3 text-green-600 mr-1" />
            <span className="text-xs font-semibold glass-text-blue-light">{t('staking.currentStakingRate')}</span>
          </div>
          <div className="text-xl font-bold glass-text-red">
            {displayRate}%
          </div>
        </div>

        {/* 当前质押量 */}
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-white/20">
          <div className="text-center">
            <div className="text-sm font-semibold glass-text-gold">
              {currentStaked.toFixed(2)} AOT
            </div>
            <div className="text-xs glass-text-blue-light">{t('staking.currentStakingAmount')}</div>
          </div>
        </div>

        {/* 下一档位信息 */}
        {nextTier && (
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-3 w-3 text-blue-600 mr-1" />
                <span className="text-xs font-medium glass-text-blue">{t('staking.nextTier')}: {nextTier.name}</span>
              </div>
              <div className="text-sm font-bold glass-text-red mb-1">
                {(nextTier.rate * 100).toFixed(4)}%
              </div>
              <div className="text-xs glass-text-gold-light">
                {t('staking.needToStake')} <span className="font-semibold">{remainingToNext.toFixed(2)} AOT</span>
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
                <span className="text-xs font-semibold glass-text-gold">已达到最高档位</span>
              </div>
              <div className="text-xs glass-text-gold-light">
                享受最高质押收益率
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
