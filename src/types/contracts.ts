export interface Stake {
  amount: string
  startTime: string
  lastClaimTime: string
  rate: number
  active: boolean
}

export interface UserInfo {
  userTotalStaked: string
  referrer: string
  totalReferred: string
  currentStakingRate: string
  currentReferralRate: string
}

export interface StakeDetails {
  amount: string
  startTime: string
  lastClaimTime: string
  rate: number
  active: boolean
  pendingReward: string
  withdrawFee: string
}

export interface GlobalStats {
  globalTotalStaked: string
  stakingConfigCount: string
  referralConfigCount: string
}

export interface ContractConfig {
  address: string
  abi: any[]
  chainId: number
}
