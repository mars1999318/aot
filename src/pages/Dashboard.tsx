import React from 'react'
import { useAccount } from 'wagmi'
import { useUserInfo } from '../hooks/useUserData'
import { useReferral } from '../hooks/useReferral'
import { useTranslation } from '../hooks/useTranslation'
import { formatNumber, formatToken, formatWeiToEther, formatReferralRate, formatStakingRate } from '../utils/formatting'
import { StatsCard } from '../components/StatsCard'
import { ModernStatsCard } from '../components/ModernStatsCard'
import { MobileStatsCard, MobileStatsGrid } from '../components/MobileStatsCard'
import { ProfessionalStatsCard, ProfessionalStatsGrid } from '../components/ProfessionalStatsCard'
import { ModernCard, ModernCardHeader, ModernCardBody } from '../components/ModernCard'
import { MobileCard, MobileCardHeader, MobileCardBody } from '../components/MobileCard'
import { ProfessionalCard, ProfessionalCardHeader, ProfessionalCardBody } from '../components/ProfessionalCard'
import { ModernButton } from '../components/ModernButton'
import { MobileButton } from '../components/MobileButton'
import { WalletNotConnected } from '../components/WalletNotConnected'
import { ProfessionalButton } from '../components/ProfessionalButton'
import { SkeletonStatsCard, SkeletonCard } from '../components/SkeletonLoader'
import { PageTransition, FadeIn } from '../components/PageTransition'
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Gift,
  DollarSign,
  Clock
} from 'lucide-react'

export function Dashboard() {
  const { isConnected, address } = useAccount()
  const { userInfo, pendingRewards, tokenBalance } = useUserInfo()
  const { referralStats, referralRecords, isLoading: isReferralLoading, refreshData, dataVersion } = useReferral()
  const { t } = useTranslation()

  // Add debug information
  console.log('Dashboard - isConnected:', isConnected)
  console.log('Dashboard - address:', address)
  console.log('Dashboard - userInfo:', userInfo)
  console.log('Dashboard - pendingRewards:', pendingRewards)
  console.log('Dashboard - tokenBalance:', tokenBalance)

  // If wallet is not connected, show connection prompt
  if (!isConnected) {
    return <WalletNotConnected />
  }

  // Add data loading state check
  const isDataLoading = !userInfo && !pendingRewards && !tokenBalance

  // Get real data from contract, using Wei to Ether conversion
  const totalStakedWei = userInfo?.[0]?.toString() || '0'
  const pendingRewardsWei = pendingRewards?.toString() || '0'
  const walletBalanceWei = tokenBalance?.toString() || '0'
  
  // Convert Wei to Ether (18 decimal places)
  const totalStaked = formatWeiToEther(totalStakedWei, 4)
  const pendingRewardsValue = formatWeiToEther(pendingRewardsWei, 4)
  const walletBalance = formatWeiToEther(walletBalanceWei, 4)
  
  // Calculate values for comparison
  const totalStakedNumber = parseFloat(totalStaked) || 0
  const pendingRewardsNumber = parseFloat(pendingRewardsValue) || 0
  const walletBalanceNumber = parseFloat(walletBalance) || 0
  
  // Calculate other metrics based on real data
  const totalReferrals = referralStats?.totalReferrals || 0 // Get referral count from referral hook
  // Prioritize aggregated referral records (active only) to avoid display inconsistency due to basic stats delay
  const aggregatedActiveReferred = Array.isArray(referralRecords)
    ? referralRecords.reduce((sum, r) => sum + (r.status === 'active' ? parseFloat(r.stakedAmount || '0') : 0), 0)
    : 0
  const displayTotalReferredStaked = (!isReferralLoading && Array.isArray(referralRecords) && referralRecords.length > 0)
    ? aggregatedActiveReferred.toFixed(4)
    : (referralStats?.totalReferredStaked || '0')
  
  // Debug information
  console.log('Dashboard referral data debug:', {
    referralStats,
    totalReferrals,
    displayTotalReferredStaked,
    aggregatedActiveReferred,
    userInfo: userInfo?.[2] // Contract returned totalReferred
  })
  // Get interest rate data directly from contract - using correct conversion
  const rawReferralRate = userInfo?.[4] ? Number(userInfo[4]) : 0
  const rawStakingRate = userInfo?.[3] ? Number(userInfo[3]) : 0
  
  // Unified referral rate and staking rate calculation, consistent with referral page
  // Referral rate: 260000 -> 0.026 (2.6%)
  // Staking rate: 910 -> 0.00091 (0.091%)
  const referralRate = rawReferralRate / 1000000 // Convert to decimal
  const stakingRate = rawStakingRate / 1000000   // Convert to decimal

  const stats = [
    {
      title: t('dashboard.totalStaked'),
      value: totalStakedNumber > 0 ? formatToken(totalStaked, 'AOT', 4) : '0 AOT',
      change: totalStakedNumber > 0 ? 'Active' : 'No Staking',
      changeType: totalStakedNumber > 0 ? 'positive' as const : 'neutral' as const,
      icon: Coins,
      color: 'bg-blue-500'
    },
    {
      title: t('dashboard.pendingRewards'),
      value: pendingRewardsNumber > 0 ? formatToken(pendingRewardsValue, 'AOT', 4) : '0 AOT',
      change: pendingRewardsNumber > 0 ? 'Available' : 'No Rewards',
      changeType: pendingRewardsNumber > 0 ? 'positive' as const : 'neutral' as const,
      icon: Gift,
      color: 'bg-green-500'
    },
    {
      title: t('dashboard.walletBalance'),
      value: walletBalanceNumber > 0 ? formatToken(walletBalance, 'AOT', 4) : '0 AOT',
      change: walletBalanceNumber > 0 ? 'Available' : 'Empty',
      changeType: walletBalanceNumber > 0 ? 'positive' as const : 'neutral' as const,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: t('dashboard.totalReferrals'),
      value: totalReferrals > 0 ? totalReferrals.toString() : '0',
      change: totalReferrals > 0 ? `${totalReferrals} ${t('dashboard.users')}` : t('dashboard.noReferrals'),
      changeType: totalReferrals > 0 ? 'positive' as const : 'neutral' as const,
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: t('dashboard.totalReferredStaked'),
      value: parseFloat(displayTotalReferredStaked) > 0 ? `${parseFloat(displayTotalReferredStaked).toFixed(4)} AOT` : '0 AOT',
      change: parseFloat(displayTotalReferredStaked) > 0 ? t('dashboard.referredStaked') : t('dashboard.noReferredStaked'),
      changeType: parseFloat(displayTotalReferredStaked) > 0 ? 'positive' as const : 'neutral' as const,
      icon: TrendingUp,
      color: 'bg-indigo-500'
    },
    {
      title: t('dashboard.referralRate'),
      value: `${formatReferralRate(rawReferralRate)}%`,
      change: rawReferralRate > 0 ? t('dashboard.referralRewardRate') : t('dashboard.noReferralReward'),
      changeType: rawReferralRate > 0 ? 'positive' as const : 'neutral' as const,
      icon: Gift,
      color: 'bg-green-500'
    },
    {
      title: t('dashboard.stakingRate'),
      value: `${formatStakingRate(rawStakingRate)}%`,
      change: rawStakingRate > 0 ? t('dashboard.dailyYieldRate') : t('dashboard.noStakingReward'),
      changeType: rawStakingRate > 0 ? 'positive' as const : 'neutral' as const,
      icon: Coins,
      color: 'bg-blue-500'
    }
  ]

  // 如果数据正在加载，显示骨架屏
  if (isDataLoading) {
    return (
      <PageTransition className="p-6">
        <FadeIn delay={0}>
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <SkeletonStatsCard key={i} />
            ))}
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <SkeletonCard />
        </FadeIn>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-20">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold glass-text-blue mb-4">
              {t('dashboard.welcome')}
            </h1>
            <p className="text-lg glass-text-gold max-w-2xl mx-auto mb-6">
              {t('dashboard.subtitle')}
            </p>
            
            {/* 金色装饰线 */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full mx-4"></div>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
            
          </div>
        </FadeIn>

        {/* 统计卡片 - 玻璃拟态设计 */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const gradientColors = [
                'gradient-bg-primary',
                'gradient-bg-secondary', 
                'gradient-bg-accent',
                'gradient-bg-gold'
              ]
              
              return (
                <FadeIn key={index} delay={200 + index * 50}>
                  <div className={`glass-stats-card ${gradientColors[index % gradientColors.length]} p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="w-6 h-6 text-gray-700" />
                      <h3 className="text-xs font-medium glass-text-blue-light">{stat.title}</h3>
                    </div>
                    <div className="text-xl font-bold mb-1 glass-text-red">{stat.value}</div>
                    <div className="text-xs glass-text-gold-light">{stat.change}</div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </FadeIn>

      </div>
    </PageTransition>
  )
}
