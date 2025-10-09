/**
 * 数据格式化工具函数
 */

/**
 * 格式化数字，移除多余的零
 * @param value 数值
 * @param decimals 小数位数，默认2位
 * @returns 格式化后的字符串
 */
export function formatNumber(value: string | number | bigint, decimals: number = 2): string {
  if (!value || value === '0' || value === 0) return '0'
  
  const num = typeof value === 'bigint' ? Number(value) : Number(value)
  
  if (isNaN(num)) return '0'
  
  // 如果数值很小，使用科学计数法
  if (num < 0.000001 && num > 0) {
    return num.toExponential(2)
  }
  
  // 格式化数字，移除末尾的零
  const formatted = num.toFixed(decimals)
  return parseFloat(formatted).toString()
}

/**
 * 格式化代币数量
 * @param value 代币数量
 * @param symbol 代币符号
 * @param decimals 小数位数
 * @returns 格式化后的代币字符串
 */
export function formatToken(value: string | number | bigint, symbol: string = 'AOT', decimals: number = 2): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${symbol}`
}

/**
 * 格式化地址，显示前6位和后4位
 * @param address 地址
 * @returns 格式化后的地址
 */
export function formatAddress(address: string): string {
  if (!address) return ''
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * 格式化百分比
 * @param value 数值
 * @param decimals 小数位数
 * @returns 格式化后的百分比
 */
export function formatPercentage(value: string | number, decimals: number = 1): string {
  const num = Number(value)
  if (isNaN(num)) return '0%'
  
  const formatted = formatNumber(num, decimals)
  return `${formatted}%`
}

/**
 * 格式化大数字，添加千分位分隔符
 * @param value 数值
 * @param decimals 小数位数
 * @returns 格式化后的大数字
 */
export function formatLargeNumber(value: string | number | bigint, decimals: number = 0): string {
  const num = typeof value === 'bigint' ? Number(value) : Number(value)
  
  if (isNaN(num)) return '0'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  
  return formatNumber(num, decimals)
}

/**
 * 格式化时间戳为相对时间
 * @param timestamp 时间戳
 * @returns 相对时间字符串
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小时前`
  if (minutes > 0) return `${minutes}分钟前`
  return '刚刚'
}

/**
 * 格式化Wei到Ether
 * @param wei Wei值
 * @param decimals 小数位数
 * @returns 格式化后的Ether值
 */
export function formatWeiToEther(wei: string | bigint, decimals: number = 4): string {
  if (!wei || wei === '0' || wei === 0) return '0'
  
  try {
    const weiValue = typeof wei === 'bigint' ? wei : BigInt(wei)
    const etherValue = Number(weiValue) / Math.pow(10, 18)
    
    if (isNaN(etherValue) || !isFinite(etherValue)) return '0'
    
    // 如果数值很小，使用科学计数法
    if (etherValue < 0.000001 && etherValue > 0) {
      return etherValue.toExponential(2)
    }
    
    // 格式化数字，移除末尾的零
    const formatted = etherValue.toFixed(decimals)
    return parseFloat(formatted).toString()
  } catch (error) {
    console.error('Error formatting Wei to Ether:', error)
    return '0'
  }
}

/**
 * 格式化Ether到Wei
 * @param ether Ether值
 * @returns Wei值
 */
export function formatEtherToWei(ether: string | number): bigint {
  const etherValue = Number(ether)
  return BigInt(Math.floor(etherValue * Math.pow(10, 18)))
}

/**
 * 统一推荐率格式化函数
 * @param rawRate 原始推荐率（从合约获取的原始值）
 * @returns 格式化后的推荐率百分比字符串
 */
export function formatReferralRate(rawRate: number): string {
  if (rawRate === 0) return '0'
  const rate = rawRate / 1000000 // 转换为小数
  const percentage = rate * 100 // 转换为百分比
  return percentage % 1 === 0 ? percentage.toString() : percentage.toFixed(3)
}

/**
 * 统一质押率格式化函数
 * @param rawRate 原始质押率（从合约获取的原始值）
 * @returns 格式化后的质押率百分比字符串
 */
export function formatStakingRate(rawRate: number): string {
  if (rawRate === 0) return '0.0000'
  const rate = rawRate / 1000000 // 转换为小数
  const percentage = rate * 100 // 转换为百分比
  return percentage.toFixed(4)
}
