import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from '../hooks/useTranslation'

export function WalletConnect() {
  const { t } = useTranslation()

  return (
    <ConnectButton />
  )
}