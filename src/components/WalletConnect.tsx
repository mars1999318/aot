import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from '../hooks/useTranslation'

export function WalletConnect() {
  const { t } = useTranslation()

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="modern-btn modern-btn-primary modern-btn-sm"
                  >
                    <span className="hidden sm:inline">{t('wallet.connectWallet')}</span>
                    <span className="sm:hidden">连接</span>
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="modern-btn modern-btn-error modern-btn-sm"
                  >
                    错误的网络
                  </button>
                )
              }

              return (
                <button
                  onClick={openAccountModal}
                  type="button"
                  className="modern-btn modern-btn-secondary modern-btn-sm"
                >
                  <span className="hidden sm:inline">{account.displayName}</span>
                  <span className="sm:hidden">钱包</span>
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}