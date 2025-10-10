import React from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { CURRENT_NETWORK } from '../constants/contracts'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'ArriveOnTime',
  projectId: 'your-project-id', // 可以留空或使用默认值
  chains: [bsc],
  transports: {
    [bsc.id]: http(CURRENT_NETWORK.rpcUrl),
  },
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}