import React, { useEffect } from 'react'

export function TokenPocketFix() {
  useEffect(() => {
    // 检测OPPO设备
    const userAgent = navigator.userAgent.toLowerCase()
    const isOPPO = userAgent.includes('oppo') || 
                   userAgent.includes('coloros') || 
                   userAgent.includes('oneplus')
    
    if (isOPPO) {
      console.log('检测到OPPO设备，应用强制修复')
      
      // 强制设置样式
      document.documentElement.style.setProperty('-webkit-transform', 'translateZ(0)')
      document.documentElement.style.setProperty('transform', 'translateZ(0)')
      document.body.style.setProperty('-webkit-transform', 'translateZ(0)')
      document.body.style.setProperty('transform', 'translateZ(0)')
      document.body.style.setProperty('opacity', '1')
      document.body.style.setProperty('visibility', 'visible')
      
      // 强制重绘
      const forceRedraw = () => {
        const root = document.getElementById('root')
        if (root) {
          root.style.display = 'none'
          root.offsetHeight
          root.style.display = ''
          root.style.opacity = '1'
          root.style.visibility = 'visible'
        }
        
        // 强制所有元素显示
        const allElements = document.querySelectorAll('*')
        allElements.forEach(el => {
          (el as HTMLElement).style.opacity = '1'
          ;(el as HTMLElement).style.visibility = 'visible'
        })
      }
      
      // 立即执行
      forceRedraw()
      
      // 延迟执行
      setTimeout(forceRedraw, 100)
      setTimeout(forceRedraw, 500)
      setTimeout(forceRedraw, 1000)
      
      // 监听页面加载
      window.addEventListener('load', forceRedraw)
      document.addEventListener('DOMContentLoaded', forceRedraw)
    }
  }, [])

  return null
}
