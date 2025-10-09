import React from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CURRENT_NETWORK } from '../constants/contracts'

const config = createConfig({
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
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}