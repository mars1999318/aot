import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SimpleWalletConnect } from './SimpleWalletConnect'
import { useTranslation } from '../hooks/useTranslation'

export function WalletConnect() {
  const { t } = useTranslation()

  // 在生产环境使用简单版本，避免RainbowKit的复杂配置问题
  if (process.env.NODE_ENV === 'production') {
    return <SimpleWalletConnect />
  }

  // 开发环境使用RainbowKit
  return <ConnectButton />
}