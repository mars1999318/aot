// 验证工具函数

export interface ValidationResult {
  isValid: boolean
  message?: string
}

// 验证以太坊地址
export function validateAddress(address: string): ValidationResult {
  if (!address) {
    return { isValid: false, message: '地址不能为空' }
  }
  
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { isValid: false, message: '请输入有效的以太坊地址' }
  }
  
  return { isValid: true }
}

// 验证数字
export function validateNumber(value: string, options: {
  min?: number
  max?: number
  required?: boolean
  allowDecimals?: boolean
} = {}): ValidationResult {
  const { min, max, required = true, allowDecimals = true } = options
  
  if (!value) {
    return required 
      ? { isValid: false, message: '请输入数值' }
      : { isValid: true }
  }
  
  const num = allowDecimals ? parseFloat(value) : parseInt(value)
  
  if (isNaN(num)) {
    return { isValid: false, message: '请输入有效的数字' }
  }
  
  if (min !== undefined && num < min) {
    return { isValid: false, message: `数值不能小于 ${min}` }
  }
  
  if (max !== undefined && num > max) {
    return { isValid: false, message: `数值不能大于 ${max}` }
  }
  
  return { isValid: true }
}

// 验证AOT代币数量
export function validateAOTAmount(amount: string, balance?: string): ValidationResult {
  const numResult = validateNumber(amount, {
    min: 0.01,
    max: 1000000,
    required: true,
    allowDecimals: true
  })
  
  if (!numResult.isValid) {
    return numResult
  }
  
  const amountNum = parseFloat(amount)
  const balanceNum = balance ? parseFloat(balance) : 0
  
  if (amountNum > balanceNum) {
    return { isValid: false, message: '余额不足' }
  }
  
  return { isValid: true }
}

// 验证推荐码
export function validateReferralCode(code: string): ValidationResult {
  if (!code) {
    return { isValid: true } // 推荐码是可选的
  }
  
  if (code.length < 6) {
    return { isValid: false, message: '推荐码至少需要6个字符' }
  }
  
  if (code.length > 50) {
    return { isValid: false, message: '推荐码不能超过50个字符' }
  }
  
  // 检查是否包含有效字符
  if (!/^[a-zA-Z0-9_-]+$/.test(code)) {
    return { isValid: false, message: '推荐码只能包含字母、数字、下划线和连字符' }
  }
  
  return { isValid: true }
}

// 验证交易哈希
export function validateTxHash(hash: string): ValidationResult {
  if (!hash) {
    return { isValid: false, message: '交易哈希不能为空' }
  }
  
  if (!/^0x[a-fA-F0-9]{64}$/.test(hash)) {
    return { isValid: false, message: '请输入有效的交易哈希' }
  }
  
  return { isValid: true }
}

// 验证密码强度
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: '密码不能为空' }
  }
  
  if (password.length < 8) {
    return { isValid: false, message: '密码至少需要8个字符' }
  }
  
  if (password.length > 128) {
    return { isValid: false, message: '密码不能超过128个字符' }
  }
  
  // 检查密码强度
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length
  
  if (strength < 3) {
    return { isValid: false, message: '密码强度不够，请包含大小写字母、数字和特殊字符' }
  }
  
  return { isValid: true }
}

// 验证邮箱
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, message: '邮箱不能为空' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: '请输入有效的邮箱地址' }
  }
  
  return { isValid: true }
}

// 验证URL
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, message: 'URL不能为空' }
  }
  
  try {
    new URL(url)
    return { isValid: true }
  } catch {
    return { isValid: false, message: '请输入有效的URL' }
  }
}
