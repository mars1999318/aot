import React, { useEffect } from 'react'

export function TokenPocketFix() {
  useEffect(() => {
    // 检测OPPO设备
    const userAgent = navigator.userAgent.toLowerCase()
    const isOPPO = userAgent.includes('oppo') || 
                   userAgent.includes('coloros') || 
                   userAgent.includes('oneplus')
    
    if (isOPPO) {
      console.log('检测到OPPO设备，应用基础修复')
      
      // 简单的重绘修复
      setTimeout(() => {
        const root = document.getElementById('root')
        if (root) {
          root.style.display = 'none'
          root.offsetHeight
          root.style.display = ''
        }
      }, 100)
    }
  }, [])

  return null
}
