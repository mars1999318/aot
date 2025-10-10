import { useState, useEffect } from 'react'
import { useAccount, usePublicClient, useReadContract, useWatchContractEvent } from 'wagmi'
import { CURRENT_NETWORK } from '../constants/contracts'
import { ARRIVE_ON_TIME_ABI } from '../constants/abis'
import { formatWeiToEther } from '../utils/formatting'
// 移除已删除的hooks导入

export interface ReferralStats {
  totalReferrals: number
  totalReferredStaked: string
  currentReferralRate: number
  totalEarnedRewards: string
}

export interface ReferralRecord {
  id: string
  address: string
  stakedAmount: string
  timestamp: number
  status: 'active' | 'inactive'
}

export function useReferral() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null)
  const [referralRecords, setReferralRecords] = useState<ReferralRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdateTime, setLastUpdateTime] = useState(0)
  const [dataVersion, setDataVersion] = useState(0) // 数据版本号，用于强制刷新
  const [lastProcessedData, setLastProcessedData] = useState<string>('') // 上次处理的数据哈希

  // 获取用户信息（包含推荐数据）
  const { data: userInfo, isLoading: isUserInfoLoading } = useReadContract({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // 获取推荐人列表
  const { data: referralList, isLoading: isReferralListLoading } = useReadContract({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    functionName: 'getReferralList',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // 获取待领取奖励
  const { data: pendingRewards, isLoading: isPendingRewardsLoading } = useReadContract({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    functionName: 'getPendingRewards',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // 定时刷新机制，因为ABI中没有事件定义
  useEffect(() => {
    if (!address) return

    // 每10秒自动刷新一次数据，确保及时检测到变化
    const interval = setInterval(() => {
      console.log('定时刷新推荐数据')
      setDataVersion(prev => prev + 1)
    }, 10000) // 10秒

    return () => clearInterval(interval)
  }, [address])

  // 移除已删除的hooks调用

  // 合约分析结果：
  // 1. 合约没有提供"获取某个用户的所有被推荐人"的函数
  // 2. 合约没有事件定义，无法通过事件监听获取推荐数据
  // 3. 前端无法遍历所有用户来查找推荐关系
  // 4. 只能获取用户自己的推荐统计信息，无法获取被推荐人的详细列表

  // 生成推荐链接
  const generateReferralLink = (): string => {
    if (!address) return ''
    const baseUrl = window.location.origin
    const referralCode = address.slice(0, 8).toLowerCase()
    const link = `${baseUrl}/?ref=${referralCode}`
    return link
  }

  // 获取推荐码
  const getReferralCode = (): string => {
    if (!address) return ''
    return address.slice(0, 8).toLowerCase()
  }

  // 处理推荐数据 - 分离基础数据和详细数据
  useEffect(() => {
    if (!address) return

    const loading = isUserInfoLoading || isReferralListLoading || isPendingRewardsLoading
    setIsLoading(loading)

    // 基础数据必须存在
    if (loading || !userInfo) return

    // 立即处理基础推荐数据，不依赖详细质押数据
    const processBasicReferralData = () => {
      try {
        console.log('处理基础推荐数据:', { userInfo, referralList, pendingRewards })
        
        // 从合约数据构建推荐统计（推荐相关数据）
        // 根据合约分析，getUserInfo返回：
        // [0] userTotalStaked, [1] referrer, [2] totalReferred, [3] currentStakingRate, [4] currentReferralRate
        const totalReferredStaked = userInfo[2] ? formatWeiToEther(userInfo[2].toString(), 4) : '0' // totalReferred - 推荐总质押量
        const userTotalStaked = userInfo[0] ? formatWeiToEther(userInfo[0].toString(), 4) : '0' // 用户自己的质押量
        // 使用合约提供的推荐率，保持与仪表盘/质押页一致（不自行推导）
        const currentReferralRate = userInfo[4] ? Number(userInfo[4]) / 1000000 : 0 // 小数形式，例如 0.026 表示 2.6%
        const totalEarnedRewards = pendingRewards ? formatWeiToEther(pendingRewards.toString(), 6) : '0'
        
        // 获取真实的推荐人数
        const referralAddresses = Array.isArray(referralList) ? referralList : []
        const totalReferrals = referralAddresses.length

        // 推荐日收益（展示用）：总推荐质押量 × 当前推荐日化率
        const totalReferredStakedNumber = parseFloat(totalReferredStaked || '0')
        const userTotalStakedNumber = parseFloat(userTotalStaked || '0')
        
        const basicStats = {
          totalReferrals,
          totalReferredStaked: totalReferredStakedNumber.toFixed(4),
          currentReferralRate, // 直接使用合约推荐率，保持一致
          totalEarnedRewards
        }

        console.log('基础推荐统计:', basicStats)
        setReferralStats(basicStats)
        setError(null)
      } catch (err) {
        setError('Failed to load basic referral data')
        console.error('Error loading basic referral data:', err)
      }
    }

    // 处理详细推荐数据（异步）
    const processDetailedReferralData = async () => {
      try {
        const referralAddresses = Array.isArray(referralList) ? referralList : []
        console.log('处理详细推荐数据，地址数量:', referralAddresses.length, '数据版本:', dataVersion)

        if (referralAddresses.length === 0 || !publicClient) {
          setReferralRecords([])
          return
        }

        const records: ReferralRecord[] = []
        // 仅统计当前有效(未提现)质押量
        let computedTotalReferredStaked = 0

        // 并行处理所有地址，提高效率
        const promises = referralAddresses.map(async (referralAddress: string, index: number) => {
          try {
            console.log(`正在读取地址 ${referralAddress} 的最新质押数据...`)
            const stakes: any[] = await publicClient.readContract({
              address: CURRENT_NETWORK.ArriveOnTime,
              abi: ARRIVE_ON_TIME_ABI as any,
              functionName: 'getUserStakes',
              args: [referralAddress]
            }) as any[]

            let sumActiveAmount = 0
            let latestActiveTime = 0
            let hasActive = false

            if (Array.isArray(stakes)) {
              stakes.forEach((s: any) => {
                const amount = Number(s.amount ?? s[0] ?? 0) / 1e18
                const startTime = Number(s.startTime ?? s[1] ?? 0) * 1000
                const active = Boolean(s.active ?? s[4] ?? false)
                if (active && amount > 0) {
                  sumActiveAmount += amount
                  if (startTime > latestActiveTime) latestActiveTime = startTime
                }
                if (active) hasActive = true
              })
            }

            console.log(`地址 ${referralAddress} 最新质押数据(仅活跃统计):`, { sumActiveAmount, latestActiveTime, hasActive, stakesCount: stakes.length })

            return {
              id: `ref-${index + 1}`,
              address: referralAddress,
              stakedAmount: (hasActive ? sumActiveAmount : 0).toFixed(4),
              timestamp: (hasActive ? latestActiveTime : Date.now()),
              status: hasActive ? 'active' : 'inactive',
              sumAmount: hasActive ? sumActiveAmount : 0
            }
          } catch (innerErr) {
            console.error(`读取地址 ${referralAddress} 质押数据失败:`, innerErr)
            return {
              id: `ref-${index + 1}`,
              address: referralAddress,
              stakedAmount: '0',
              timestamp: Date.now(),
              status: 'inactive' as const,
              sumAmount: 0
            }
          }
        })

        // 等待所有地址处理完成
        const results = await Promise.all(promises)
        
        // 处理结果
        results.forEach(result => {
          computedTotalReferredStaked += result.sumAmount
          records.push({
            id: result.id,
            address: result.address,
            stakedAmount: result.stakedAmount,
            timestamp: result.timestamp,
            status: result.status as 'active' | 'inactive'
          })
        })

        // 生成数据哈希，用于检测变化
        const dataHash = JSON.stringify({
          records: records.map(r => ({ address: r.address, stakedAmount: r.stakedAmount, status: r.status })),
          totalStaked: computedTotalReferredStaked
        })

        console.log('详细推荐记录 (最新数据):', records)
        console.log('计算的总推荐质押量(仅活跃):', computedTotalReferredStaked)
        console.log('数据哈希:', dataHash.substring(0, 50) + '...')
        
        // 检查数据是否发生变化
        if (dataHash !== lastProcessedData) {
          console.log('检测到数据变化，更新推荐记录')
          setLastProcessedData(dataHash)
          
        // 更新推荐记录（活跃优先显示）
          setReferralRecords(records.sort((a, b) => b.timestamp - a.timestamp))
          
        // 使用当前活跃总质押量作为“总推荐质押”显示
        const currentStats = referralStats
        if (currentStats && currentStats.totalReferredStaked !== computedTotalReferredStaked.toFixed(4)) {
          console.log('更新基础统计为活跃质押总量')
          setReferralStats({
            ...currentStats,
            totalReferredStaked: computedTotalReferredStaked.toFixed(4)
          })
        }
        } else {
          console.log('数据未发生变化，跳过更新')
        }
      } catch (err) {
        console.error('Error loading detailed referral data:', err)
      }
    }

    // 立即处理基础数据
    processBasicReferralData()
    
    // 异步处理详细数据
    processDetailedReferralData()
    
    // 更新数据版本号
    setDataVersion(prev => prev + 1)
  }, [address, userInfo, pendingRewards, isUserInfoLoading, isPendingRewardsLoading, referralList, publicClient])

  // 添加数据验证和强制刷新机制
  useEffect(() => {
    if (!referralStats) return

    // 验证数据一致性
    const validateData = () => {
      const { totalReferrals, totalReferredStaked } = referralStats
      const referralAddresses = Array.isArray(referralList) ? referralList : []
      
      console.log('数据验证:', {
        totalReferrals,
        actualReferralCount: referralAddresses.length,
        totalReferredStaked,
        dataVersion
      })

      // 如果推荐人数不匹配，强制刷新
      if (totalReferrals !== referralAddresses.length) {
        console.warn('推荐人数不匹配，强制刷新数据')
        setDataVersion(prev => prev + 1)
      }
    }

    validateData()
  }, [referralStats, referralList, dataVersion])

  // 手动刷新数据
  const refreshData = () => {
    console.log('手动刷新推荐数据')
    setDataVersion(prev => prev + 1)
    setLastUpdateTime(0) // 重置防抖时间
  }

  return {
    referralStats,
    referralRecords,
    isLoading,
    error,
    generateReferralLink,
    getReferralCode,
    refreshData,
    dataVersion
  }
}
