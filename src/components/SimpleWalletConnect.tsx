import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'

export function SimpleWalletConnect() {
  const { isConnected, address, isConnecting } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  // 添加连接状态监听
  useEffect(() => {
    console.log('连接状态变化:', { isConnected, address, isConnecting })
  }, [isConnected, address, isConnecting])

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      console.log('尝试连接钱包...')
      console.log('可用连接器:', connectors)
      console.log('当前连接状态:', { isConnected, address })
      
      if (connectors.length > 0) {
        const result = await connect({ connector: connectors[0] })
        console.log('连接结果:', result)
        
        // 等待连接状态更新
        setTimeout(() => {
          console.log('连接后状态:', { isConnected, address })
          setIsLoading(false)
        }, 2000)
      } else {
        console.error('没有可用的钱包连接器')
        alert('没有检测到钱包，请安装MetaMask或其他钱包')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('钱包连接失败:', error)
      alert('钱包连接失败，请重试')
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    try {
      disconnect()
      console.log('钱包已断开连接')
    } catch (error) {
      console.error('断开连接失败:', error)
    }
  }

  // 显示连接错误
  if (connectError) {
    console.error('连接错误:', connectError)
  }

  if (isConnected && address) {
    return (
      <button
        onClick={handleDisconnect}
        className="modern-btn modern-btn-error modern-btn-sm"
      >
        <span className="hidden sm:inline">断开连接</span>
        <span className="sm:hidden">断开</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading || isConnecting}
      className="modern-btn modern-btn-primary modern-btn-sm"
    >
      <span className="hidden sm:inline">
        {isLoading || isConnecting ? '连接中...' : '连接钱包'}
      </span>
      <span className="sm:hidden">
        {isLoading || isConnecting ? '连接中...' : '连接'}
      </span>
    </button>
  )
}
