import { useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { CURRENT_NETWORK } from '../constants/contracts'
import { ARRIVE_ON_TIME_ABI, AOT_TOKEN_ABI } from '../constants/abis'

export function useUserInfo() {
  const { address } = useAccount()
  
  const { data: userInfo, error: userInfoError } = useReadContract({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  const { data: pendingRewards, error: pendingRewardsError } = useReadContract({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    functionName: 'getPendingRewards',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  const { data: tokenBalance, error: tokenBalanceError } = useReadContract({
    address: CURRENT_NETWORK.AOTToken,
    abi: AOT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  const hasError = userInfoError || pendingRewardsError || tokenBalanceError
  const isLoading = !userInfo && !pendingRewards && !tokenBalance && !hasError

  return {
    userInfo,
    pendingRewards,
    tokenBalance,
    isLoading,
    hasError,
    error: hasError ? 'Failed to load user data' : null
  }
}