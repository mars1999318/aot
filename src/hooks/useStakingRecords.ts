import { useReadContract, useWatchContractEvent, usePublicClient } from 'wagmi'
import { useAccount } from 'wagmi'
import { CURRENT_NETWORK } from '../constants/contracts'
import { ARRIVE_ON_TIME_ABI } from '../constants/abis'
import { useState, useEffect } from 'react'
import { useUserInfo } from './useUserData'

export interface StakingRecord {
  index: number
  amount: string
  timestamp: number
  referrer: string
  isActive: boolean
  pendingRewards: string
  daysStaked: number
  feeReduction: number // Fee reduction percentage
  stakingRate: number // Staking rate (annualized)
}

export function useStakingRecords() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { userInfo } = useUserInfo()
  const [stakingRecords, setStakingRecords] = useState<StakingRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  // Remove dependency on useRewardsCalculation, use contract data directly

  // Get user staking records list
  const { data: userStakes, isLoading: isCountLoading, error: countError, refetch: refetchUserStakes } = useReadContract({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    functionName: 'getUserStakes',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // Listen for rewards claimed events
  useWatchContractEvent({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    eventName: 'RewardsClaimed',
    onLogs(logs) {
      console.log('RewardsClaimed event detected:', logs)
      // 当检测到奖励领取事件时，触发数据刷新
      setRefreshTrigger(prev => prev + 1)
    }
  })

  // 监听质押事件
  useWatchContractEvent({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    eventName: 'Staked',
    onLogs(logs) {
      console.log('Staked event detected:', logs)
      // 当检测到质押事件时，触发数据刷新
      setRefreshTrigger(prev => prev + 1)
    }
  })

  // 监听解押事件
  useWatchContractEvent({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    eventName: 'Unstaked',
    onLogs(logs) {
      console.log('Unstaked event detected:', logs)
      // 当检测到解押事件时，触发数据刷新
      setRefreshTrigger(prev => prev + 1)
    }
  })

  // 获取所有质押记录
  useEffect(() => {
    console.log('StakingRecords Debug:', {
      address,
      userStakes,
      isCountLoading,
      userStakesLength: userStakes?.length
    })

    if (!address || !userStakes || isCountLoading) return

    const fetchStakingRecords = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const records: StakingRecord[] = []
        
        // 如果没有质押记录，直接返回空数组
        if (!userStakes || userStakes.length === 0) {
          console.log('No staking records found')
          setStakingRecords([])
          setIsLoading(false)
          return
        }
        
        // 处理从合约获取的质押记录数据
        for (let index = 0; index < userStakes.length; index++) {
          const stake = userStakes[index]
          try {
            // 计算质押时间（毫秒）
            const startTimeMs = Number(stake.startTime) * 1000 // 转换为毫秒
            // 使用当前区块时间戳而不是Date.now()，与合约保持一致
            const nowMs = Math.floor(Date.now() / 1000) * 1000 // 转换为秒级时间戳再转回毫秒
            const stakingMs = nowMs - startTimeMs // 质押时间（毫秒）
            const stakingDays = stakingMs / (1000 * 60 * 60 * 24) // 精确的天数（包含小数）
            
            // 基于质押时间计算手续费递减（模拟合约逻辑）
            // 开始质押时：10%手续费，100天后递减到0%
            let feeReduction = 10  // 默认10%手续费
            if (stakingDays >= 100) {
              feeReduction = 0  // 100天后手续费递减到0%
            } else {
              // 100天内，手续费从10%线性递减到0%（精确到毫秒）
              feeReduction = Math.max(0, 10 - (stakingDays / 100) * 10)
            }
            
            // 使用链上数据获取每个质押记录的待领取奖励
            let pendingRewards = '0'
            try {
              if (publicClient) {
                const stakePendingRewards = await publicClient.readContract({
                  address: CURRENT_NETWORK.ArriveOnTime,
                  abi: ARRIVE_ON_TIME_ABI,
                  functionName: 'getStakePendingRewards',
                  args: [address, BigInt(index)]
                })
                pendingRewards = formatWeiToEther(stakePendingRewards.toString(), 18)
              }
            } catch (err) {
              console.error(`Error fetching pending rewards for stake ${index}:`, err)
              // 如果链上调用失败，使用本地计算作为备用
              const rawStakeRate = Number(stake.rate)
              const stakeRate = rawStakeRate / 1000000
              const dailyRate = stakeRate / 365
              const stakingAmount = parseFloat(stake.amount?.toString() || '0') / 1e18
              const lastClaimTimeMs = stake.lastClaimTime ? Number(stake.lastClaimTime) * 1000 : startTimeMs
              const claimTimeMs = Math.max(lastClaimTimeMs, startTimeMs)
              const rewardStakingMs = nowMs - claimTimeMs
              const rewardStakingDays = rewardStakingMs / (1000 * 60 * 60 * 24)
              pendingRewards = (stakingAmount * dailyRate * rewardStakingDays).toFixed(18)
            }
            
            
            console.log(`Stake ${index} calculation:`, {
              stakingDays,
              stakingAmount,
              stakeRate: stakeRate * 100, // 转换为百分比显示
              dailyRate: dailyRate * 100, // 转换为百分比显示
              pendingRewards,
              feeReduction,
              lastClaimTime: stake.lastClaimTime,
              claimTimeMs,
              rewardStakingDays
            })
            
            const userStakeRecord: StakingRecord = {
              index,
              amount: stake.amount?.toString() || '0',
              timestamp: startTimeMs, // 使用已计算的毫秒时间戳
              referrer: '0x0000000000000000000000000000000000000000',
              isActive: stake.active || false,
              pendingRewards: pendingRewards, // 基于 lastClaimTime 计算的奖励
              daysStaked: Math.floor(stakingDays), // 向下取整的天数
              feeReduction: feeReduction, // 基于质押时间的递减手续费
              stakingRate: rawStakeRate // 质押收益率（年化）- 使用原始值
            }
            records.push(userStakeRecord)
          } catch (err) {
            console.error(`Error processing stake record ${index}:`, err)
          }
        }
        setStakingRecords(records)
      } catch (err) {
        setError('Failed to fetch staking records')
        console.error('Error fetching staking records:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStakingRecords()
  }, [address, userStakes?.length, isCountLoading, refreshTrigger])

  // 如果有错误，显示错误信息
  useEffect(() => {
    if (countError) {
      console.error('Stake count error:', countError)
      setError(`Failed to fetch stake count: ${countError.message || 'Unknown error'}`)
    }
  }, [countError])

  // 调试信息 - 移除这个useEffect，它可能导致Hooks顺序问题
  // useEffect(() => {
  //   console.log('StakingRecords Debug:', {
  //     address,
  //     stakeCount: stakeCount ? Number(stakeCount) : 0,
  //     isCountLoading,
  //     isLoading,
  //     error,
  //     recordsCount: stakingRecords.length
  //   })
  // }, [address, stakeCount, isCountLoading, isLoading, error, stakingRecords.length])

  // 移除调试日志以避免无限循环

  // 暴露刷新函数供外部调用
  const refreshRecords = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return {
    stakingRecords,
    isLoading: isLoading || isCountLoading,
    error,
    stakeCount: userStakes ? userStakes.length : 0,
    refreshRecords
  }
}
