import { useAccount, useSwitchChain } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { AlertCircle, ExternalLink } from 'lucide-react'

export function NetworkSwitcher() {
  const { isConnected, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const { t } = useTranslation()

  const isCorrectNetwork = chainId === 56 // BSC主网

  if (!isConnected || isCorrectNetwork) {
    return null
  }

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: 56 })
    } catch (error) {
      console.error('Failed to switch network:', error)
      // 如果自动切换失败，提供手动添加网络的指导
      window.open('https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain', '_blank')
    }
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {t('network.wrongNetwork')}
          </h3>
          <p className="text-sm text-red-600 mt-1">
            {t('network.switchToBSC')}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSwitchNetwork}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            {t('network.switchNetwork')}
          </button>
          <button
            onClick={() => window.open('https://bscscan.com', '_blank')}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            BSCScan
          </button>
        </div>
      </div>
    </div>
  )
}
