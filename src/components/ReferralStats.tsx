import React from 'react'
import { Users, TrendingUp, DollarSign } from 'lucide-react'
import { ModernStatsCard } from './ModernStatsCard'
import { ModernCard, ModernCardHeader, ModernCardBody } from './ModernCard'
import { ReferralStats } from '../hooks/useReferral'
import { formatReferralRate } from '../utils/formatting'
import { useTranslation } from '../hooks/useTranslation'

interface ReferralStatsProps {
  stats: ReferralStats
  className?: string
}

export function ReferralStatsComponent({ stats, className = '' }: ReferralStatsProps) {
  const { t } = useTranslation()
  
  // Use unified referral rate formatting function
  // stats.currentReferralRate is already in decimal form (e.g., 0.2 for 0.2%)
  const referralRatePercent = formatReferralRate(stats.currentReferralRate * 1_000_000) // Convert back to 1e6 precision for formatting
  
  const statCards = [
    {
      title: t('referral.totalReferrals'),
      value: stats.totalReferrals.toString(),
      change: `${stats.totalReferrals} ${t('referral.people')}`,
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500',
      trend: {
        value: 0,
        period: 'total referrals'
      }
    },
    {
      title: t('referral.totalReferredStaked'),
      value: `${stats.totalReferredStaked} AOT`,
      change: t('referral.referredStakedTotal'),
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: {
        value: 0,
        period: 'total staked'
      }
    },
    {
      title: t('referral.referralRate'),
      value: `${referralRatePercent}%`,
      change: t('referral.currentReferralRate'),
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-yellow-500',
      trend: {
        value: 0,
        period: 'current rate'
      }
    }
  ]

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const gradientColors = [
            'gradient-bg-primary',
            'gradient-bg-secondary', 
            'gradient-bg-accent'
          ]
          
          return (
            <div key={index} className={`glass-stats-card ${gradientColors[index % gradientColors.length]} p-4`}>
              {/* 图标和标题行 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <stat.icon className="w-6 h-6 text-gray-600 mr-2 flex-shrink-0" />
                  <h3 className="text-sm font-semibold glass-text-blue-light">{stat.title}</h3>
                </div>
              </div>
              
              {/* 数值显示 */}
              <div className="mb-2">
                <div className="text-2xl sm:text-3xl font-bold glass-text-red text-left leading-tight">{stat.value}</div>
              </div>
              
              {/* 描述信息 */}
              <div className="text-xs glass-text-gold-light text-left leading-relaxed">{stat.change}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
