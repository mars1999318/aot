import React, { useState, useEffect } from 'react'

export function MobileDetector() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const isMobileDevice = width < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
      console.log('移动端检测:', { width, isMobileDevice, userAgent: navigator.userAgent })
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>屏幕宽度: {window.innerWidth}px</div>
      <div>移动端: {isMobile ? '是' : '否'}</div>
      <div>断点: {window.innerWidth < 640 ? 'sm' : window.innerWidth < 768 ? 'md' : window.innerWidth < 1024 ? 'lg' : 'xl'}</div>
    </div>
  )
}
