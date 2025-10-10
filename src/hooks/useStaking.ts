import { useWriteContract, useWaitForTransactionReceipt, usePublicClient, useAccount } from 'wagmi'
import { useEffect } from 'react'
import { CURRENT_NETWORK } from '../constants/contracts'
import { ARRIVE_ON_TIME_ABI, AOT_TOKEN_ABI } from '../constants/abis'
import { useErrorHandler } from './useErrorHandler'
import { useToast } from '../contexts/ToastContext'
import { shouldRetryTransaction, isGasLimitError } from '../utils/networkUtils'
import { formatWeiToEther } from '../utils/formatting'

export function useStake() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  })
  const { handleError } = useErrorHandler()
  const { showSuccess, showError } = useToast()
  const publicClient = usePublicClient()

  const stake = async (amount: bigint, referrer: string) => {
    try {
      await writeContract({
        address: CURRENT_NETWORK.ArriveOnTime,
        abi: ARRIVE_ON_TIME_ABI,
        functionName: 'stake',
        args: [amount, referrer as `0x${string}`],
      })
      
      // Wait for transaction confirmation
      if (hash && publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        if (receipt.status === 'success') {
          return { success: true, hash }
        } else {
          throw new Error('Transaction failed')
        }
      }
    } catch (err) {
      console.error('Stake transaction error:', err)
      handleError(err, 'Stake')
      throw err
    }
  }

  // 移除直接错误处理，避免无限循环
  // 错误已经在 catch 块中处理了

  return {
    stake,
    isStakeLoading: isPending || isConfirming,
    stakeData: hash,
    error: error || confirmError
  }
}

export function useApprove() {
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: hash || undefined,
  })
  const publicClient = usePublicClient()

  const approve = async (spender: string, amount: bigint) => {
    try {
      await writeContract({
        address: CURRENT_NETWORK.AOTToken,
        abi: AOT_TOKEN_ABI,
        functionName: 'approve',
        args: [spender as `0x${string}`, amount],
      })
      
      // Wait for transaction confirmation
      if (hash && publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        if (receipt.status === 'success') {
          return { success: true, hash }
        } else {
          throw new Error('Transaction failed')
        }
      }
    } catch (err) {
      console.error('Approve transaction error:', err)
      throw err
    }
  }

  return {
    approve,
    isApproveLoading: isPending || isConfirming,
    approveData: hash,
  }
}

export function useWithdraw() {
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: hash || undefined,
  })
  const publicClient = usePublicClient()

  const withdraw = async (stakeIndex: number) => {
    try {
      await writeContract({
        address: CURRENT_NETWORK.ArriveOnTime,
        abi: ARRIVE_ON_TIME_ABI,
        functionName: 'withdraw',
        args: [BigInt(stakeIndex)],
      })
      
      // Wait for transaction confirmation
      if (hash && publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        if (receipt.status === 'success') {
          return { success: true, hash }
        } else {
          throw new Error('Transaction failed')
        }
      }
    } catch (err) {
      console.error('Withdraw transaction error:', err)
      throw err
    }
  }

  return {
    withdraw,
    isWithdrawLoading: isPending || isConfirming,
    withdrawData: hash,
  }
}

export function useClaimRewards() {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: hash || undefined,
  })
  const { handleError } = useErrorHandler()
  const publicClient = usePublicClient()

  const claimRewards = async () => {
    try {
      await writeContract({
        address: CURRENT_NETWORK.ArriveOnTime,
        abi: ARRIVE_ON_TIME_ABI,
        functionName: 'claimAllRewards',
      })
    } catch (err) {
      console.error('Claim rewards transaction error:', err)
      if (isGasLimitError(err)) {
        // 如果是gasLimit错误，提示用户刷新页面或切换网络
        console.log('Gas limit error detected, suggesting page refresh')
      }
      handleError(err, 'Claim Rewards')
      throw err
    }
  }

  // 监听交易确认，记录奖励
  const recordRewardClaim = async (txHash: string) => {
    console.log('recordRewardClaim called:', { txHash, publicClient: !!publicClient, address })
    if (!publicClient || !address) {
      console.log('Missing required parameters, exiting reward recording')
      return
    }

    try {
      // 获取交易详情
      const tx = await publicClient.getTransactionReceipt({ hash: txHash as `0x${string}` })
      if (!tx) return

      // 获取区块信息
      const block = await publicClient.getBlock({ blockNumber: tx.blockNumber })
      
      // 获取用户质押记录，计算实际领取的奖励
      const userStakes = await publicClient.readContract({
        address: CURRENT_NETWORK.ArriveOnTime,
        abi: ARRIVE_ON_TIME_ABI,
        functionName: 'getUserStakes',
        args: [address]
      }) as any[]

      let totalClaimedReward = 0

      if (Array.isArray(userStakes)) {
        userStakes.forEach((stake) => {
          const amount = Number(stake.amount || stake[0] || 0) / 1e18
          const startTime = Number(stake.startTime || stake[1] || 0) * 1000
          const lastClaimTime = Number(stake.lastClaimTime || stake[2] || 0) * 1000
          const rate = Number(stake.rate || stake[3] || 0)

          // 计算从上次领取到现在的奖励
          if (amount > 0 && lastClaimTime > startTime) {
            const dailyRate = rate / 1000000 // 转换为小数
            const claimedDays = (Number(block.timestamp) * 1000 - lastClaimTime) / (1000 * 60 * 60 * 24)
            const claimedReward = amount * dailyRate * claimedDays
            
            if (claimedReward > 0) {
              totalClaimedReward += claimedReward
            }
          }
        })
      }

      // 创建奖励记录
      const rewardRecord = {
        type: 'staking' as const,
        amount: totalClaimedReward.toFixed(6),
        timestamp: Number(block.timestamp) * 1000,
        status: 'claimed' as const,
        description: `质押奖励领取 - ${totalClaimedReward.toFixed(6)} AOT`,
        txHash: txHash,
        blockNumber: Number(tx.blockNumber)
      }

      // 保存到本地存储
      const storageKey = `aot_reward_records_${address}`
      console.log('Saving reward record, storage key:', storageKey)
      console.log('Reward record:', rewardRecord)
      
      const existingRecords = JSON.parse(localStorage.getItem(storageKey) || '[]')
      console.log('Existing records:', existingRecords)
      
      const newRecord = {
        ...rewardRecord,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      
      existingRecords.unshift(newRecord)
      console.log('Updated records:', existingRecords)
      
      localStorage.setItem(storageKey, JSON.stringify(existingRecords))
      console.log('Reward record saved to local storage')
    } catch (error) {
      console.error('Failed to record reward:', error)
    }
  }

  // 当交易确认时，记录奖励
  useEffect(() => {
    console.log('useClaimRewards useEffect:', { hash, isConfirming, address })
    if (hash && !isConfirming && address && publicClient) {
      console.log('Starting to record reward, transaction hash:', hash)
      recordRewardClaim(hash)
    }
  }, [hash, isConfirming, address, publicClient])

  return {
    claimRewards,
    isClaimLoading: isPending || isConfirming,
    claimData: hash,
  }
}