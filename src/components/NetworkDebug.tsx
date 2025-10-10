import React from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'

export function NetworkDebug() {
  const { isConnected, address, chainId } = useAccount()
  const { t } = useTranslation()

  // 只在开发环境或调试时显示
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50">
      <div className="font-bold mb-2">网络调试信息</div>
      <div>连接状态: {isConnected ? '✅ 已连接' : '❌ 未连接'}</div>
      <div>地址: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '无'}</div>
      <div>链ID: {chainId || '无'}</div>
      <div>环境: {process.env.NODE_ENV}</div>
      <div>域名: {window.location.hostname}</div>
      <div>协议: {window.location.protocol}</div>
    </div>
  )
}
