export const CONTRACTS = {
  BSC: {
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed1.binance.org/',
    blockExplorer: 'https://bscscan.com',
    ArriveOnTime: '0xF5714e8A5c2E5CACd60C8e95f53aC7481e1A9Cea' as `0x${string}`,
    AOTToken: '0xc9038115f11c5677D3c64aB1b83C892eE161B5C8' as `0x${string}`,
  },
  // 测试网络配置
  BSC_TESTNET: {
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorer: 'https://testnet.bscscan.com',
    ArriveOnTime: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    AOTToken: '0x1234567890123456789012345678901234567890' as `0x${string}`,
  }
}

// 当前使用的网络配置
export const CURRENT_NETWORK = CONTRACTS.BSC // 使用BSC主网