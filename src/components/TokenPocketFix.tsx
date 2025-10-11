import React, { useEffect, useState } from 'react'

export function TokenPocketFix() {
  const [isTokenPocket, setIsTokenPocket] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检测TokenPocket钱包
    const checkTokenPocket = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isTP = userAgent.includes('tokenpocket') || 
                   userAgent.includes('tpwallet') ||
                   window.location.href.includes('tokenpocket') ||
                   (window.ethereum && window.ethereum.isTokenPocket)
      
      setIsTokenPocket(isTP)
      
      if (isTP) {
        console.log('检测到TokenPocket钱包，应用特定修复')
        
        // 强制重新渲染
        setTimeout(() => {
          const root = document.getElementById('root')
          if (root) {
            root.style.display = 'none'
            root.offsetHeight // 触发重排
            root.style.display = ''
          }
        }, 200)
        
        // 再次强制渲染
        setTimeout(() => {
          const root = document.getElementById('root')
          if (root) {
            root.style.opacity = '0'
            root.offsetHeight // 触发重排
            root.style.opacity = '1'
          }
        }, 500)
      }
      
      setIsLoading(false)
    }

    checkTokenPocket()
  }, [])

  return null
}
