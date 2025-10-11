import React, { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export function MobileDebug() {
  const { t } = useTranslation()
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      touchSupport: 'ontouchstart' in window,
      isOPPO: navigator.userAgent.toLowerCase().includes('oppo') || 
              navigator.userAgent.toLowerCase().includes('coloros'),
      isTokenPocket: navigator.userAgent.toLowerCase().includes('tokenpocket') || 
                     navigator.userAgent.toLowerCase().includes('tpwallet') ||
                     window.location.href.includes('tokenpocket') ||
                     (window.ethereum && window.ethereum.isTokenPocket),
      isAndroid: /Android/i.test(navigator.userAgent),
      isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
      viewport: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
    setDebugInfo(info)
  }, [])

  // 只在开发环境、OPPO设备或TokenPocket钱包上显示
  const shouldShow = process.env.NODE_ENV === 'development' || debugInfo.isOPPO || debugInfo.isTokenPocket

  if (!shouldShow) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-red-500 text-white p-2 rounded-full text-xs"
      >
        Debug
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-black text-white p-4 rounded-lg text-xs max-w-xs max-h-64 overflow-auto">
          <div className="space-y-1">
            <div><strong>设备信息:</strong></div>
            <div>OPPO: {debugInfo.isOPPO ? '是' : '否'}</div>
            <div>TokenPocket: {debugInfo.isTokenPocket ? '是' : '否'}</div>
            <div>Android: {debugInfo.isAndroid ? '是' : '否'}</div>
            <div>iOS: {debugInfo.isIOS ? '是' : '否'}</div>
            <div>屏幕: {debugInfo.screenWidth}x{debugInfo.screenHeight}</div>
            <div>视口: {debugInfo.innerWidth}x{debugInfo.innerHeight}</div>
            <div>像素比: {debugInfo.devicePixelRatio}</div>
            <div>触摸: {debugInfo.touchSupport ? '支持' : '不支持'}</div>
            <div>在线: {debugInfo.onLine ? '是' : '否'}</div>
            <div className="mt-2"><strong>User Agent:</strong></div>
            <div className="text-xs break-all">{debugInfo.userAgent}</div>
          </div>
        </div>
      )}
    </div>
  )
}
