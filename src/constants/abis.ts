export const ARRIVE_ON_TIME_ABI = [
  // 质押功能
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'referrer', type: 'address' }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 提取功能
  {
    inputs: [{ name: 'stakeIndex', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 领取奖励
  {
    inputs: [],
    name: 'claimAllRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 查询用户信息
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserInfo',
    outputs: [
      { name: 'userTotalStaked', type: 'uint256' },
      { name: 'referrer', type: 'address' },
      { name: 'totalReferred', type: 'uint256' },
      { name: 'currentStakingRate', type: 'uint256' },
      { name: 'currentReferralRate', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询待领取奖励
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getPendingRewards',
    outputs: [{ name: 'totalPending', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询用户质押记录数量
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserStakeCount',
    outputs: [{ name: 'count', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询特定质押记录
  {
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'index', type: 'uint256' }
    ],
    name: 'getUserStake',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'referrer', type: 'address' },
      { name: 'isActive', type: 'bool' },
      { name: 'pendingRewards', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询用户质押列表
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserStakes',
    outputs: [
      {
        components: [
          { name: 'amount', type: 'uint256' },
          { name: 'startTime', type: 'uint256' },
          { name: 'lastClaimTime', type: 'uint256' },
          { name: 'rate', type: 'uint16' },
          { name: 'active', type: 'bool' }
        ],
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询质押详情
  {
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'stakeIndex', type: 'uint256' }
    ],
    name: 'getStakeDetails',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'lastClaimTime', type: 'uint256' },
      { name: 'rate', type: 'uint16' },
      { name: 'active', type: 'bool' },
      { name: 'pendingReward', type: 'uint256' },
      { name: 'withdrawFee', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询全局统计
  {
    inputs: [],
    name: 'getGlobalStats',
    outputs: [
      { name: 'globalTotalStaked', type: 'uint256' },
      { name: 'stakingConfigCount', type: 'uint256' },
      { name: 'referralConfigCount', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // 查询推荐人列表
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getReferralList',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export const AOT_TOKEN_ABI = [
  // 查询余额
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // 授权
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 查询授权额度
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // 转账
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 代币信息
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const