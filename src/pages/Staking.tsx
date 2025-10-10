import React, { useState, useEffect } from 'react'
import { useUserInfo } from '../hooks/useUserData'
import { useStake, useApprove, useWithdraw, useClaimRewards } from '../hooks/useStaking'
import { usePublicClient } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { useToast } from '../contexts/ToastContext'
import { RetryButton } from '../components/RetryButton'
import { LoadingButton } from '../components/LoadingButton'
import { ModernButton } from '../components/ModernButton'
import { ModernCard, ModernCardHeader, ModernCardBody } from '../components/ModernCard'
import { ModernBadge } from '../components/ModernBadge'
import { PageTransition, FadeIn } from '../components/PageTransition'
import { FormField } from '../components/FormField'
import { useFormValidation } from '../hooks/useFormValidation'
import { validateAOTAmount, validateReferralCode } from '../utils/validation'
import { formatNumber, formatToken, formatWeiToEther, formatReferralRate, formatStakingRate } from '../utils/formatting'
import { CURRENT_NETWORK } from '../constants/contracts'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { StakingRecords } from '../components/StakingRecords'
import { StakingProgressCard } from '../components/StakingProgressCard'
import { WalletNotConnected } from '../components/WalletNotConnected'
import { 
  Coins, 
  TrendingUp, 
  Clock, 
  Users, 
  Gift,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// 计算质押收益进度
function getStakingProgress(amount: number, stakingRate: number): number {
  // 基于质押数量计算进度，最大100%
  if (amount >= 10000) return 100
  if (amount >= 1000) return Math.min(100, ((amount - 1000) / 9000) * 50 + 50)
  if (amount >= 100) return Math.min(50, ((amount - 100) / 900) * 50)
  return Math.min(25, (amount / 100) * 25)
}

export function Staking() {
  const { isConnected } = useAccount()
  const { userInfo, pendingRewards, tokenBalance } = useUserInfo()
  const { stake, isStakeLoading } = useStake()
  const { approve, isApproveLoading } = useApprove()
  const { withdraw, isWithdrawLoading } = useWithdraw()
  const { claimRewards, isClaimLoading } = useClaimRewards()
  const publicClient = usePublicClient()
  const { t } = useTranslation()

  // 如果钱包没有连接，显示连接提示
  if (!isConnected) {
    return <WalletNotConnected />
  }
  const { showSuccess, showError, showWarning } = useToast()

  const [isApproved, setIsApproved] = useState(false)
  const [estimatedRewards, setEstimatedRewards] = useState('0')
  const [lastError, setLastError] = useState<string | null>(null)
  
  // 防抖和状态管理
  const [isProcessing, setIsProcessing] = useState(false)
  const [operationType, setOperationType] = useState<'approve' | 'stake' | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [lastOperationTime, setLastOperationTime] = useState(0)

  // 表单验证
  const { formState, setFieldValue, getFieldValue, getFieldError, hasFieldError, isFieldValid } = useFormValidation([
    {
      name: 'stakeAmount',
      value: '',
      validation: (value) => validateAOTAmount(value, walletBalance),
      required: true
    },
    {
      name: 'referralCode',
      value: userInfo?.[1] || '', // 如果已有推荐人，默认填充推荐人地址
      validation: validateReferralCode,
      required: false
    }
  ])

  // 检查用户是否已有推荐人
  const hasReferrer = userInfo?.[1] && userInfo[1] !== '0x0000000000000000000000000000000000000000'

  // 防抖检查 - 防止快速重复操作
  const canPerformOperation = () => {
    const now = Date.now()
    const timeSinceLastOperation = now - lastOperationTime
    
    // 如果正在处理中，不允许新操作
    if (isProcessing) {
      showWarning('操作进行中', '请等待当前操作完成后再试。')
      return false
    }
    
    // 如果距离上次操作不足2秒，不允许新操作
    if (timeSinceLastOperation < 2000) {
      showWarning('操作过于频繁', '请稍等2秒后再试。')
      return false
    }
    
    return true
  }

  // 重置操作状态
  const resetOperationState = () => {
    setIsProcessing(false)
    setOperationType(null)
    setLastError(null)
  }

  // 设置操作状态
  const setOperationState = (type: 'approve' | 'stake') => {
    setIsProcessing(true)
    setOperationType(type)
    setLastOperationTime(Date.now())
  }

  // 模拟收益计算
  useEffect(() => {
    const stakeAmount = getFieldValue('stakeAmount')
    if (stakeAmount && !isNaN(Number(stakeAmount))) {
      const amount = Number(stakeAmount)
      const dailyReward = amount * 0.01 // 1% 日收益率
      setEstimatedRewards(dailyReward.toFixed(2))
    } else {
      setEstimatedRewards('0')
    }
  }, [getFieldValue])

  const handleApprove = async () => {
    const stakeAmount = getFieldValue('stakeAmount')
    if (!stakeAmount || hasFieldError('stakeAmount')) return
    
    // 防抖检查
    if (!canPerformOperation()) return
    
    // 设置操作状态
    setOperationState('approve')
    
    try {
      const amount = BigInt(Number(stakeAmount) * 10**18) // 转换为wei
      await approve(CURRENT_NETWORK.ArriveOnTime, amount)
      // 等待交易确认后再显示成功提示
      setIsApproved(true)
      resetOperationState() // 重置操作状态
      showSuccess('授权成功', 'AOT代币授权成功，您现在可以进行质押操作。')
    } catch (error: any) {
      console.error('Approve failed:', error)
      
      // 记录错误状态
      setLastError(error?.message || '授权失败')
      
      // 根据具体错误类型提供更详细的提示
      if (error?.message?.includes('Transaction does not have a transaction hash')) {
        showError(
          '交易提交失败', 
          '交易未能成功提交到区块链。这通常是由于网络拥堵或Gas费用设置过低。请尝试：\n1. 增加Gas费用\n2. 稍后重试\n3. 检查网络连接'
        )
      } else if (error?.message?.includes('RPC Error')) {
        showError(
          'RPC连接错误', 
          '与区块链网络连接出现问题。请尝试：\n1. 刷新页面\n2. 切换网络\n3. 稍后重试'
        )
      } else if (error?.message?.includes('User rejected')) {
        showWarning('交易被取消', '您取消了授权操作。')
        resetOperationState() // 用户取消，重置状态
      } else {
        showError('授权失败', `AOT代币授权失败：${error?.message || '未知错误'}，请重试。`)
      }
      
      // 延迟重置状态，避免立即重试
      setTimeout(() => {
        resetOperationState()
      }, 3000)
    }
  }

  const handleStake = async () => {
    const stakeAmount = getFieldValue('stakeAmount')
    const referralCode = getFieldValue('referralCode')
    
    if (!stakeAmount || hasFieldError('stakeAmount') || (!hasReferrer && hasFieldError('referralCode'))) return
    
    // 防抖检查
    if (!canPerformOperation()) return
    
    // 设置操作状态
    setOperationState('stake')
    
    try {
      const amount = BigInt(Number(stakeAmount) * 10**18)
      // 如果已有推荐人，使用现有推荐人；否则使用输入的推荐码或零地址
      const referrer = hasReferrer ? userInfo[1] : (referralCode || '0x0000000000000000000000000000000000000000')
      await stake(amount, referrer)
      // 等待交易确认后再显示成功提示和重置表单
      resetOperationState() // 重置操作状态
      showSuccess('质押成功', `成功质押 ${stakeAmount} AOT代币！`)
      setFieldValue('stakeAmount', '')
      if (!hasReferrer) {
        setFieldValue('referralCode', '')
      }
      setIsApproved(false)
    } catch (error: any) {
      console.error('Stake failed:', error)
      
      // 记录错误状态
      setLastError(error?.message || '质押失败')
      
      // 根据具体错误类型提供更详细的提示
      if (error?.message?.includes('Transaction does not have a transaction hash')) {
        showError(
          '交易提交失败', 
          '质押交易未能成功提交到区块链。这通常是由于网络拥堵或Gas费用设置过低。请尝试：\n1. 增加Gas费用\n2. 稍后重试\n3. 检查网络连接'
        )
      } else if (error?.message?.includes('RPC Error')) {
        showError(
          'RPC连接错误', 
          '与区块链网络连接出现问题。请尝试：\n1. 刷新页面\n2. 切换网络\n3. 稍后重试'
        )
      } else if (error?.message?.includes('User rejected')) {
        showWarning('交易被取消', '您取消了质押操作。')
        resetOperationState() // 用户取消，重置状态
      } else if (error?.message?.includes('insufficient funds')) {
        showError('余额不足', '您的BNB余额不足以支付Gas费用，请充值后重试。')
      } else {
        showError('质押失败', `质押操作失败：${error?.message || '未知错误'}，请重试。`)
      }
      
      // 延迟重置状态，避免立即重试
      setTimeout(() => {
        resetOperationState()
      }, 3000)
    }
  }

  const handleWithdraw = async (stakeIndex: number) => {
    await withdraw(stakeIndex)
  }

  const handleClaim = async (stakeIndex: number) => {
    // 这里应该实现单个质押记录的奖励领取
    // 暂时使用全部领取
    await claimRewards()
  }

  const handleClaimRewards = async () => {
    try {
      await claimRewards()
      // 奖励领取成功后，显示成功提示
      showSuccess('奖励领取成功！', '您的奖励已成功领取到钱包。')
      
      // 等待一段时间后，使用准确奖励记录系统
      setTimeout(async () => {
        console.log('奖励领取成功')
      }, 3000) // 等待3秒后记录
    } catch (error) {
      console.error('Claim rewards error:', error)
      showError('奖励领取失败', '请重试')
    }
  }

  // 使用Wei到Ether转换，减少精度显示
  const totalStakedWei = userInfo?.[0]?.toString() || '0'
  const pendingRewardsWei = pendingRewards?.toString() || '0'
  const walletBalanceWei = tokenBalance?.toString() || '0'
  
  // 转换为Ether并简化显示
  const totalStaked = formatWeiToEther(totalStakedWei, 6)
  const pendingRewardsValue = formatWeiToEther(pendingRewardsWei, 6)
  const walletBalance = formatWeiToEther(walletBalanceWei, 2)
  
  // 计算数值用于等级系统
  const totalStakedNumber = parseFloat(totalStaked) || 0
  
  // 从合约获取实际收益率数据
  const currentStakingRate = userInfo?.[3] ? Number(userInfo[3]) : 0 // currentStakingRate
  const currentReferralRate = userInfo?.[4] ? Number(userInfo[4]) : 0 // currentReferralRate
  
  // 调试信息
  console.log('质押页面调试:', { userInfo, pendingRewards, tokenBalance })
  console.log('当前质押率:', currentStakingRate, '当前推荐率:', currentReferralRate)
  console.log('合约总奖励:', pendingRewardsValue, 'AOT')
  
  // 收益率转换 - 使用统一的格式化函数
  let stakingRatePercent = '0.0000'
  let referralRatePercent = '0'
  
  try {
    stakingRatePercent = formatStakingRate(currentStakingRate)
    referralRatePercent = formatReferralRate(currentReferralRate)
    console.log('格式化成功:', { stakingRatePercent, referralRatePercent })
  } catch (error) {
    console.error('格式化错误:', error)
    stakingRatePercent = '0.0000'
    referralRatePercent = '0'
  }

  return (
    <PageTransition className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-20">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold glass-text-red mb-4">{t('staking.title')}</h1>
            <p className="text-lg glass-text-blue max-w-2xl mx-auto mb-6">{t('staking.subtitle')}</p>
            
            {/* 金色装饰线 */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full mx-4"></div>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
          </div>
        </FadeIn>

      <NetworkSwitcher />

      {/* 错误状态显示 */}
      {lastError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">操作失败</h3>
              <p className="text-sm text-red-600 mt-1">
                {lastError}
              </p>
            </div>
            <RetryButton
              onRetry={() => window.location.reload()}
              error=""
              className="ml-4"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 质押表单 */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold glass-text-gold">{t('staking.stakeTokens')}</h2>
            </div>
            <div>
            
            <div className="space-y-6">
              {/* 质押金额 */}
              <FormField
                label={`${t('staking.amount')} (AOT)`}
                type="number"
                value={getFieldValue('stakeAmount')}
                onChange={(value) => setFieldValue('stakeAmount', value)}
                placeholder="0.00"
                required
                error={getFieldError('stakeAmount')}
                helpText={`${t('staking.availableBalance')}: ${formatToken(walletBalance, 'AOT', 2)} | 最小质押: 100 AOT`}
                validation={(value) => validateAOTAmount(value, walletBalance)}
              />

              {/* 推荐码 */}
              <FormField
                label={t('staking.referralCode')}
                type="text"
                value={getFieldValue('referralCode')}
                onChange={(value) => setFieldValue('referralCode', value)}
                placeholder={hasReferrer ? '已绑定推荐人' : t('staking.referralCodePlaceholder')}
                disabled={hasReferrer}
                error={getFieldError('referralCode')}
                helpText={hasReferrer ? '您已绑定推荐人，无需重复填写' : t('staking.referralCodeHelp')}
                validation={validateReferralCode}
              />

              {/* 操作按钮 */}
              <div className="space-y-3">
                {/* 紧急重置按钮 - 只在处理中时显示 */}
                {isProcessing && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm text-yellow-800">
                          {operationType === 'approve' ? '授权操作进行中...' : '质押操作进行中...'}
                        </span>
                      </div>
                      <button
                        onClick={resetOperationState}
                        className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                      >
                        重置状态
                      </button>
                    </div>
                  </div>
                )}
                {!isApproved ? (
                  <LoadingButton
                    loading={isApproveLoading || (isProcessing && operationType === 'approve')}
                    onClick={handleApprove}
                    disabled={!getFieldValue('stakeAmount') || hasFieldError('stakeAmount') || isProcessing}
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loadingText={isProcessing ? '处理中...' : t('common.loading')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isProcessing && operationType === 'approve' ? '授权中...' : t('staking.approve')}
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    loading={isStakeLoading || (isProcessing && operationType === 'stake')}
                    onClick={handleStake}
                    disabled={!getFieldValue('stakeAmount') || hasFieldError('stakeAmount') || (!hasReferrer && hasFieldError('referralCode')) || isProcessing}
                    variant="gold"
                    size="lg"
                    className="w-full"
                    loadingText={isProcessing ? '处理中...' : t('common.loading')}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    {isProcessing && operationType === 'stake' ? '质押中...' : t('staking.stake')}
                  </LoadingButton>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* 侧边栏信息 */}
        <div className="space-y-6">
          {/* 当前质押信息 */}
          <div className="glass-card p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold glass-text-blue">{t('staking.currentStake')}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="glass-text-blue-light">{t('staking.totalStaked')}</span>
                <span className="font-medium glass-text-red">{totalStaked} AOT</span>
              </div>
              <div className="flex justify-between">
                <span className="glass-text-blue-light">{t('staking.pendingRewards')}</span>
                <span className="font-medium glass-text-gold">{pendingRewardsValue} AOT</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <LoadingButton
                loading={isClaimLoading}
                onClick={handleClaimRewards}
                disabled={!pendingRewardsValue}
                variant="success"
                size="md"
                className="w-full"
                loadingText={t('common.loading')}
              >
                {t('rewards.claimRewards')}
              </LoadingButton>
            </div>
          </div>

          {/* 质押收益信息 */}
          <StakingProgressCard 
            currentStaked={totalStakedNumber}
            currentRate={currentStakingRate}
          />
        </div>
      </div>

        {/* 质押记录 */}
        <FadeIn delay={1000}>
          <div className="mt-8">
            <StakingRecords 
              onWithdraw={handleWithdraw}
            />
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  )
}
