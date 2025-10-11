import React, { useEffect, useState } from 'react'

export function TokenPocketFix() {
  const [isTokenPocket, setIsTokenPocket] = useState(false)
  const [isOPPO, setIsOPPO] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检测TokenPocket钱包和OPPO设备
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isTP = userAgent.includes('tokenpocket') || 
                   userAgent.includes('tpwallet') ||
                   window.location.href.includes('tokenpocket') ||
                   (window.ethereum && window.ethereum.isTokenPocket)
      
      const isOPPODevice = userAgent.includes('oppo') || 
                           userAgent.includes('coloros') || 
                           userAgent.includes('oneplus')
      
      setIsTokenPocket(isTP)
      setIsOPPO(isOPPODevice)
      
      if (isTP || isOPPODevice) {
        console.log('检测到TokenPocket钱包或OPPO设备，应用特定修复')
        
        // 强制设置CSS属性
        document.documentElement.style.setProperty('-webkit-transform', 'translateZ(0)')
        document.documentElement.style.setProperty('transform', 'translateZ(0)')
        document.documentElement.style.setProperty('-webkit-backface-visibility', 'hidden')
        document.documentElement.style.setProperty('backface-visibility', 'hidden')
        
        // 强制body样式
        document.body.style.setProperty('-webkit-transform', 'translateZ(0)')
        document.body.style.setProperty('transform', 'translateZ(0)')
        document.body.style.setProperty('-webkit-backface-visibility', 'hidden')
        document.body.style.setProperty('backface-visibility', 'hidden')
        document.body.style.setProperty('opacity', '1')
        document.body.style.setProperty('visibility', 'visible')
        
        // 强制#root样式
        const root = document.getElementById('root')
        if (root) {
          root.style.setProperty('-webkit-transform', 'translateZ(0)')
          root.style.setProperty('transform', 'translateZ(0)')
          root.style.setProperty('-webkit-backface-visibility', 'hidden')
          root.style.setProperty('backface-visibility', 'hidden')
          root.style.setProperty('opacity', '1')
          root.style.setProperty('visibility', 'visible')
        }
        
        // 多次强制重绘
        const forceRedraw = () => {
          document.body.style.display = 'none'
          document.body.offsetHeight
          document.body.style.display = ''
          if (root) {
            root.style.display = 'none'
            root.offsetHeight
            root.style.display = ''
          }
        }
        
        // 立即执行重绘
        forceRedraw()
        
        // 延迟执行重绘
        setTimeout(forceRedraw, 100)
        setTimeout(forceRedraw, 500)
        setTimeout(forceRedraw, 1000)
        
        // 监听页面加载完成
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', forceRedraw)
        }
        
        // 监听窗口加载完成
        window.addEventListener('load', forceRedraw)
        
        // 监听窗口大小变化
        window.addEventListener('resize', forceRedraw)
        window.addEventListener('orientationchange', forceRedraw)
      }
      
      setIsLoading(false)
    }

    checkDevice()
  }, [])

  return null
}
