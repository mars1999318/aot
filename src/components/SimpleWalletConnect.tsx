import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'

export function SimpleWalletConnect() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()

  const handleConnect = async () => {
    try {
      console.log('尝试连接钱包...')
      console.log('可用连接器:', connectors)
      
      if (connectors.length > 0) {
        await connect({ connector: connectors[0] })
        console.log('钱包连接成功')
      } else {
        console.error('没有可用的钱包连接器')
        alert('没有检测到钱包，请安装MetaMask或其他钱包')
      }
    } catch (error) {
      console.error('钱包连接失败:', error)
      alert('钱包连接失败，请重试')
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
      className="modern-btn modern-btn-primary modern-btn-sm"
    >
      <span className="hidden sm:inline">连接钱包</span>
      <span className="sm:hidden">连接</span>
    </button>
  )
}
