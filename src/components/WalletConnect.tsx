import React from 'react'
import { SimpleWalletConnect } from './SimpleWalletConnect'

export function WalletConnect() {
  // 统一使用简单版本，避免RainbowKit的复杂配置问题
  return <SimpleWalletConnect />
}