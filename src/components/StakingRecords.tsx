import React, { useState } from 'react'
import { useStakingRecords, StakingRecord } from '../hooks/useStakingRecords'
import { useTranslation } from '../hooks/useTranslation'
import { formatStakingRate } from '../utils/formatting'
import { 
  Coins, 
  Clock, 
  TrendingUp, 
  Users, 
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Percent,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface StakingRecordsProps {
  onWithdraw: (index: number) => void
}

interface ExpandableRecordProps {
  record: StakingRecord
  onWithdraw: (index: number) => void
  formatAmount: (amount: string) => string
  formatStakingAmount: (amount: string) => string
  formatDate: (timestamp: number) => string
  formatStakingDays: (timestamp: number) => string
  formatFeeReduction: (feeReduction: number) => string
  formatStakingRate: (rate: number) => string
  getStatusIcon: (isActive: boolean) => React.ReactNode
  getStatusBadge: (isActive: boolean) => React.ReactNode
}

// 可展开的质押记录组件
function ExpandableRecord({ 
  record, 
  onWithdraw, 
  formatAmount, 
  formatStakingAmount, 
  formatDate, 
  formatStakingDays, 
  formatFeeReduction, 
  formatStakingRate,
  getStatusIcon, 
  getStatusBadge 
}: ExpandableRecordProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="glass-card hover:shadow-lg transition-all duration-300">
      {/* 紧凑的摘要行 */}
      <div 
        className="p-3 cursor-pointer hover:bg-white/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon(record.isActive)}
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium glass-text-blue">
                  {t('staking.stake')}
                </h4>
                {getStatusBadge(record.isActive)}
              </div>
              <div className="text-xs glass-text-blue-light mt-1">
                {formatDate(record.timestamp)} • {formatStakingDays(record.timestamp)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-semibold glass-text-red">
                {formatStakingAmount(record.amount)} AOT
              </div>
              <div className="text-xs glass-text-blue">
                收益率: {formatStakingRate(record.stakingRate)}%
              </div>
              <div className="text-xs glass-text-gold">
                奖励: {formatAmount(record.pendingRewards)} AOT
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 展开的详细内容 */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-100 bg-gray-50">
          <div className="pt-3 space-y-3">
            {/* 基本信息 */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{t('staking.amount')}:</span>
                <span className="ml-1 font-medium">{formatStakingAmount(record.amount)} AOT</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{t('staking.date')}:</span>
                <span className="ml-1 font-medium">{formatDate(record.timestamp)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{t('staking.daysStaked')}:</span>
                <span className="ml-1 font-medium">{formatStakingDays(record.timestamp)}</span>
              </div>
              
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{t('staking.pendingRewards')}:</span>
                <span className="ml-1 font-medium text-green-600">{formatAmount(record.pendingRewards)} AOT</span>
              </div>
              
              <div className="flex items-center">
                <Percent className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-600">收益率:</span>
                <span className="ml-1 font-medium text-blue-600">{formatStakingRate(record.stakingRate)}%</span>
              </div>
            </div>

            {/* 手续费和推荐人信息 */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Percent className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">{t('staking.feeReduction')}:</span>
                <span className="ml-1 text-sm font-medium text-blue-600">
                  {record.feeReduction > 0 ? `${formatFeeReduction(record.feeReduction)}手续费` : formatFeeReduction(record.feeReduction)}
                </span>
              </div>
              
              {record.referrer !== '0x0000000000000000000000000000000000000000' && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-600">{t('staking.referrer')}:</span>
                  <span className="ml-1 text-sm font-mono text-purple-600">
                    {record.referrer.slice(0, 6)}...{record.referrer.slice(-4)}
                  </span>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            {record.isActive && (
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onWithdraw(record.index)
                  }}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  {t('staking.withdraw')}
                </button>
                <div className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded cursor-not-allowed">
                  统一领取奖励
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function StakingRecords({ onWithdraw }: StakingRecordsProps) {
  const { stakingRecords, isLoading, error } = useStakingRecords()
  const { t } = useTranslation()
  
  // 计算各个订单奖励的总和
  const totalIndividualRewards = stakingRecords.reduce((sum, record) => {
    return sum + parseFloat(record.pendingRewards || '0')
  }, 0)
  
  // 调试信息：比较总奖励和各个订单奖励的总和
  console.log('质押记录奖励数据对比:', {
    individualRewardsSum: totalIndividualRewards.toFixed(6),
    recordsCount: stakingRecords.length,
    records: stakingRecords.map(r => ({
      index: r.index,
      amount: r.amount,
      pendingRewards: r.pendingRewards,
      stakingRate: r.stakingRate
    }))
  })

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount)
    if (isNaN(num) || num === 0) return '0.00'
    
    // 如果数值很小，显示更多小数位
    if (num < 0.000001) {
      return num.toExponential(2)
    }
    
    // 正常情况显示6位小数，去除尾随零
    return num.toFixed(6).replace(/\.?0+$/, '')
  }

  // 专门用于格式化质押金额（需要从Wei转换）
  const formatStakingAmount = (amount: string) => {
    const num = parseFloat(amount)
    if (isNaN(num) || num === 0) return '0.00'
    
    // 从Wei转换为Ether
    return (num / 1e18).toFixed(6).replace(/\.?0+$/, '')
  }

  // 格式化质押率
  const formatStakingRateLocal = (rate: number) => {
    return formatStakingRate(rate)
  }

  // 格式化质押天数，显示更精确的时间
  const formatStakingDays = (timestamp: number) => {
    const now = Date.now()
    const startTime = timestamp
    const diffMs = now - startTime
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) {
      return `${days}天${hours}小时`
    } else if (hours > 0) {
      return `${hours}小时${minutes}分钟`
    } else {
      return `${minutes}分钟`
    }
  }

  // 格式化手续费递减，显示更精确的百分比
  const formatFeeReduction = (feeReduction: number) => {
    // 如果手续费为0，显示"无手续费"
    if (feeReduction === 0) {
      return '无手续费'
    }
    // 如果手续费很小（小于0.1%），显示"无手续费"
    if (feeReduction < 0.1) {
      return '无手续费'
    }
    // 如果手续费是整数，不显示小数
    if (feeReduction % 1 === 0) {
      return `${feeReduction}%`
    }
    // 否则显示2位小数，确保精确显示
    return `${feeReduction.toFixed(2)}%`
  }


  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  const getStatusBadge = (isActive: boolean) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
    return isActive ? (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        <CheckCircle className="h-3 w-3 mr-1" />
        {t('staking.active')}
      </span>
    ) : (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>
        <XCircle className="h-3 w-3 mr-1" />
        {t('staking.inactive')}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-6 border border-red-200/50">
        <div className="flex items-center">
          <XCircle className="h-5 w-5 text-red-500 mr-3" />
          <div className="flex-1">
            <h3 className="text-sm font-medium glass-text-red">
              {t('staking.loadError')}
            </h3>
            <p className="text-sm glass-text-red-light mt-1">{error}</p>
            <div className="mt-3">
              <button
                onClick={() => window.location.reload()}
                className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 过滤出活跃的质押订单
  const activeStakingRecords = stakingRecords.filter(record => record.isActive)
  
  if (activeStakingRecords.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="text-center">
          <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium glass-text-blue mb-2">
            {t('staking.noStakingRecords')}
          </h3>
          <p className="glass-text-blue-light">
            {t('staking.startStakingToSeeRecords')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('staking.stakingRecords')} ({activeStakingRecords.length})
        </h3>
      </div>

      <div className="space-y-2">
        {activeStakingRecords
          .sort((a, b) => b.timestamp - a.timestamp) // 按时间戳降序排列，最新的在前
          .map((record) => (
            <ExpandableRecord
              key={record.index}
              record={record}
              onWithdraw={onWithdraw}
              formatAmount={formatAmount}
              formatStakingAmount={formatStakingAmount}
              formatDate={formatDate}
              formatStakingDays={formatStakingDays}
              formatFeeReduction={formatFeeReduction}
              formatStakingRate={formatStakingRateLocal}
              getStatusIcon={getStatusIcon}
              getStatusBadge={getStatusBadge}
            />
          ))}
      </div>
    </div>
  )
}
