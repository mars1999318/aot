import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'

export function WalletConnect() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()

  const handleConnect = () => {
    if (connectors[0]) {
      connect({ connector: connectors[0] })
    }
  }

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="modern-btn modern-btn-error modern-btn-sm"
      >
        <span className="hidden sm:inline">{t('wallet.disconnect')}</span>
        <span className="sm:hidden">断开</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleConnect}
      className="modern-btn modern-btn-primary modern-btn-sm"
    >
      <span className="hidden sm:inline">{t('wallet.connectWallet')}</span>
      <span className="sm:hidden">连接</span>
    </button>
  )
}