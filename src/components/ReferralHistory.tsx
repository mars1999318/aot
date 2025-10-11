import { useState } from 'react'
import { User, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { ModernCard, ModernCardHeader, ModernCardBody } from './ModernCard'
import { ModernBadge } from './ModernBadge'
import { useTranslation } from '../hooks/useTranslation'
import { ReferralRecord } from '../hooks/useReferral'

interface ReferralHistoryProps {
  records: ReferralRecord[]
  isLoading?: boolean
  className?: string
  dataVersion?: number
}

export function ReferralHistory({ records, isLoading = false, className = '', dataVersion }: ReferralHistoryProps) {
  const { t } = useTranslation()
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const formatDate = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return `${days}${t('common.daysAgo')}`
    } else if (hours > 0) {
      return `${hours}${t('common.hoursAgo')}`
    } else {
      return t('common.justNow')
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
        {t('staking.active')}
      </ModernBadge>
    ) : (
      <ModernBadge variant="error" size="sm" icon={<XCircle className="h-3 w-3" />}>
        {t('staking.inactive')}
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
          <h3 className="text-lg font-semibold glass-text-blue">{t('data.referralHistory')}</h3>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-white/20 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  // Check if there is real data (staked amount is not 0)
  const hasRealData = records.length > 0 && records.some(record => record.stakedAmount !== '0')
  
  if (!hasRealData && records.length > 0) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold glass-text-blue">{t('data.referralHistory')}</h3>
        </div>
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium glass-text-gold mb-2">{t('data.referralHistory')}</h3>
          <p className="glass-text-blue-light mb-4">{t('data.referralCount', { count: records.length })}</p>
          <div className="bg-white/20 border border-white/30 rounded-lg p-4 text-left">
            <div className="text-sm glass-text-blue-light">
              <p>
                <strong className="glass-text-red">{t('data.loadingDetails')}</strong><br/>
                {t('data.loadingDetailsDesc')}
              </p>
              <div className="mt-2">
                <strong className="glass-text-red">{t('data.referrerAddresses')}:</strong>
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
          <h3 className="text-lg font-semibold glass-text-blue">{t('data.referralHistory')}</h3>
        </div>
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium glass-text-gold mb-2">{t('data.noReferralRecords')}</h3>
          <p className="glass-text-blue-light">{t('data.shareReferralLink')}</p>
          <p className="text-sm glass-text-blue-light mt-2">{t('data.referralRelationship')}</p>
        </div>
      </div>
    )
  }


  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold glass-text-blue">{t('data.referralRecords')} ({records.length})</h3>
            <p className="text-xs glass-text-blue-light mt-1">
              * {t('data.sampleDataDescription')}
              {dataVersion && <span className="ml-2 text-blue-600">v{dataVersion}</span>}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status')}
              className="glass-input px-3 py-1 text-sm"
            >
              <option value="date">{t('data.sortByDate')}</option>
              <option value="amount">{t('data.sortByAmount')}</option>
              <option value="status">{t('data.sortByStatus')}</option>
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
        <div className="space-y-3">
          {sortedRecords.map((record) => (
            <div key={record.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors gap-3 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold glass-text-red text-sm sm:text-base truncate">{formatAddress(record.address)}</p>
                  <p className="text-xs sm:text-sm glass-text-blue-light mt-1">{formatDate(record.timestamp)}</p>
                  <p className="text-xs glass-text-gold-light hidden sm:block mt-1">{t('data.firstStakeViaReferral')}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                <div className="text-left sm:text-right">
                  <p className="font-bold glass-text-gold text-sm sm:text-base">{t('data.staked')} {formatStakeAmount(record.stakedAmount)} AOT</p>
                  <p className="text-xs glass-text-blue-light sm:hidden mt-1">{formatDate(record.timestamp)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(record.status)}
                  <button
                    onClick={() => window.open(`https://bscscan.com/address/${record.address}`, '_blank')}
                    className="glass-button px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm flex items-center text-gray-800 font-semibold"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden sm:inline">{t('common.view')}</span>
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
