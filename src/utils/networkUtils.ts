// 网络工具函数
export const BSC_RPC_URLS = [
  'https://bsc-dataseed1.binance.org/',
  'https://bsc-dataseed2.binance.org/',
  'https://bsc-dataseed3.binance.org/',
  'https://bsc-dataseed4.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed2.defibit.io/',
  'https://bsc-dataseed3.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/',
  'https://bsc-dataseed2.ninicoin.io/',
  'https://bsc-dataseed3.ninicoin.io/',
]

export function getRandomRPCUrl(): string {
  const randomIndex = Math.floor(Math.random() * BSC_RPC_URLS.length)
  return BSC_RPC_URLS[randomIndex]
}

export function isGasLimitError(error: any): boolean {
  return error?.message?.includes('gasLimit') || 
         error?.message?.includes('Cannot destructure property') ||
         error?.code === -32603
}

export function shouldRetryTransaction(error: any): boolean {
  return isGasLimitError(error) || 
         error?.message?.includes('timeout') ||
         error?.message?.includes('network')
}
