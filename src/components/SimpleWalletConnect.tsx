import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'

export function SimpleWalletConnect() {
  const { isConnected, address, isConnecting } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  // Add connection state listener
  useEffect(() => {
    console.log('Connection state changed:', { isConnected, address, isConnecting })
  }, [isConnected, address, isConnecting])

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      console.log('Attempting to connect wallet...')
      console.log('Available connectors:', connectors)
      console.log('Current connection status:', { isConnected, address })
      
      if (connectors.length > 0) {
        const result = await connect({ connector: connectors[0] })
        console.log('Connection result:', result)
        
        // 等待连接状态更新
        setTimeout(() => {
          console.log('Post-connection status:', { isConnected, address })
          setIsLoading(false)
        }, 2000)
      } else {
        console.error('No available wallet connectors')
        alert('No wallet detected, please install MetaMask or other wallet')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
      alert('Wallet connection failed, please try again')
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    try {
      disconnect()
      console.log('Wallet disconnected')
    } catch (error) {
      console.error('Disconnect failed:', error)
    }
  }

  // 显示连接错误
  if (connectError) {
    console.error('Connection error:', connectError)
  }

  if (isConnected && address) {
    return (
      <button
        onClick={handleDisconnect}
        className="modern-btn modern-btn-error modern-btn-sm"
      >
        <span className="hidden sm:inline">{t('wallet.disconnect')}</span>
        <span className="sm:hidden">{t('wallet.disconnectShort')}</span>
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
          {isLoading || isConnecting ? t('wallet.connecting') : t('wallet.connectWallet')}
        </span>
        <span className="sm:hidden">
          {isLoading || isConnecting ? t('wallet.connecting') : t('wallet.connect')}
        </span>
    </button>
  )
}
