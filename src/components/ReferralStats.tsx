import React from 'react'
import { Users, TrendingUp, DollarSign } from 'lucide-react'
import { ModernStatsCard } from './ModernStatsCard'
import { ModernCard, ModernCardHeader, ModernCardBody } from './ModernCard'
import { ReferralStats } from '../hooks/useReferral'
import { formatReferralRate } from '../utils/formatting'

interface ReferralStatsProps {
  stats: ReferralStats
  className?: string
}

export function ReferralStatsComponent({ stats, className = '' }: ReferralStatsProps) {
  // 使用统一的推荐率格式化函数
  const referralRatePercent = formatReferralRate(stats.currentReferralRate * 1000000) // 转换为原始值
  
  const statCards = [
    {
      title: '推荐人数',
      value: stats.totalReferrals.toString(),
      change: `${stats.totalReferrals} 人`,
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500',
      trend: {
        value: 0,
        period: 'total referrals'
      }
    },
    {
      title: '推荐质押总量',
      value: `${stats.totalReferredStaked} AOT`,
      change: '被推荐人质押总量',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: {
        value: 0,
        period: 'total staked'
      }
    },
    {
      title: '推荐收益率',
      value: `${referralRatePercent}%`,
      change: '当前推荐率',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const gradientColors = [
            'gradient-bg-primary',
            'gradient-bg-secondary', 
            'gradient-bg-accent'
          ]
          
          return (
            <div key={index} className={`glass-stats-card ${gradientColors[index % gradientColors.length]} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-6 h-6 text-gray-700" />
                <h3 className="text-xs font-medium glass-text-blue-light">{stat.title}</h3>
              </div>
              <div className="text-xl font-bold mb-1 glass-text-red">{stat.value}</div>
              <div className="text-xs glass-text-gold-light">{stat.change}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
