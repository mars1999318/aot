import { useState } from 'react'
import { User, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { ModernCard, ModernCardHeader, ModernCardBody } from './ModernCard'
import { ModernBadge } from './ModernBadge'
import { ReferralRecord } from '../hooks/useReferral'

interface ReferralHistoryProps {
  records: ReferralRecord[]
  isLoading?: boolean
  className?: string
  dataVersion?: number
}

export function ReferralHistory({ records, isLoading = false, className = '', dataVersion }: ReferralHistoryProps) {
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const formatDate = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return `${days}天前`
    } else if (hours > 0) {
      return `${hours}小时前`
    } else {
      return '刚刚'
    }
  }

  const formatStakeAmount = (amount: string) => {
    const num = parseFloat(amount)
    if (num === 0) return '0'
    if (num < 0.0001) return '< 0.0001'
    return num.toFixed(4)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <ModernBadge variant="success" size="sm" icon={<CheckCircle className="h-3 w-3" />}>
        活跃
      </ModernBadge>
    ) : (
      <ModernBadge variant="error" size="sm" icon={<XCircle className="h-3 w-3" />}>
        非活跃
      </ModernBadge>
    )
  }

  const sortedRecords = [...records].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'date':
        comparison = a.timestamp - b.timestamp
        break
      case 'amount':
        comparison = parseFloat(a.stakedAmount) - parseFloat(b.stakedAmount)
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  if (isLoading) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold glass-text-blue">推荐历史</h3>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-white/20 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  // 检查是否有真实数据（质押金额不为0）
  const hasRealData = records.length > 0 && records.some(record => record.stakedAmount !== '0')
  
  if (!hasRealData && records.length > 0) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold glass-text-blue">推荐历史</h3>
        </div>
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium glass-text-gold mb-2">推荐历史</h3>
          <p className="glass-text-blue-light mb-4">您有 {records.length} 个推荐人，正在加载详细信息...</p>
          <div className="bg-white/20 border border-white/30 rounded-lg p-4 text-left">
            <div className="text-sm glass-text-blue-light">
              <p>
                <strong className="glass-text-red">正在获取推荐人详细信息：</strong><br/>
                包括质押金额、质押时间、质押状态等
              </p>
              <div className="mt-2">
                <strong className="glass-text-red">推荐人地址：</strong>
                {records.map((record, index) => (
                  <div key={record.id} className="mt-2 text-xs">
                    {index + 1}. {record.address}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold glass-text-blue">推荐历史</h3>
        </div>
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium glass-text-gold mb-2">暂无推荐记录</h3>
          <p className="glass-text-blue-light">分享您的推荐链接，当有人通过您的链接首次质押时，您将获得推荐奖励</p>
          <p className="text-sm glass-text-blue-light mt-2">推荐关系在首次质押时建立，且不可更改</p>
        </div>
      </div>
    )
  }


  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold glass-text-blue">被推荐人记录 ({records.length})</h3>
            <p className="text-xs glass-text-blue-light mt-1">
              * 基于真实推荐关系生成的示例数据，推荐关系在首次质押时建立
              {dataVersion && <span className="ml-2 text-blue-600">v{dataVersion}</span>}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status')}
              className="glass-input px-3 py-1 text-sm"
            >
              <option value="date">按日期</option>
              <option value="amount">按金额</option>
              <option value="status">按状态</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="glass-button px-3 py-1 text-sm"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-4">
          {sortedRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium glass-text-red">{formatAddress(record.address)}</p>
                  <p className="text-sm glass-text-blue-light">{formatDate(record.timestamp)}</p>
                  <p className="text-xs glass-text-gold-light">通过推荐链接首次质押</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium glass-text-gold">质押 {formatStakeAmount(record.stakedAmount)} AOT</p>
                  <p className="text-sm glass-text-blue-light">{formatDate(record.timestamp)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(record.status)}
                  <button
                    onClick={() => window.open(`https://bscscan.com/address/${record.address}`, '_blank')}
                    className="glass-button px-3 py-1 text-sm flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    查看
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
