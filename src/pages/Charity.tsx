import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from '../hooks/useTranslation'
import { PageTransition, FadeIn } from '../components/PageTransition'
import { WalletNotConnected } from '../components/WalletNotConnected'
import { 
  Heart, 
  Wallet,
  ExternalLink,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export function Charity() {
  const { isConnected, address } = useAccount()
  const { t } = useTranslation()

  // 添加调试信息
  console.log('Charity - isConnected:', isConnected)
  console.log('Charity - address:', address)

  // 如果钱包没有连接，显示连接提示
  if (!isConnected) {
    return <WalletNotConnected />
  }
  
  // 状态管理
  const [donationAmount, setDonationAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState('AOT')
  const [isDonating, setIsDonating] = useState(false)
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [txHash, setTxHash] = useState('')

  // 模拟数据
  const charityStats = {
    totalBalance: 1250000,
    totalDonations: 15420,
    totalBeneficiaries: 8920
  }

  const recentDonations = [
    {
      id: 1,
      amount: 500,
      address: '0x1234...5678',
      time: '2小时前',
      txHash: '0xabcd1234...'
    },
    {
      id: 2,
      amount: 1000,
      address: '0x9876...5432',
      time: '5小时前',
      txHash: '0xefgh5678...'
    },
    {
      id: 3,
      amount: 200,
      address: '0x4567...8901',
      time: '1天前',
      txHash: '0xijkl9012...'
    }
  ]

  // 处理捐赠
  const handleDonate = async () => {
    if (!donationAmount || !address) return
    
    setIsDonating(true)
    
    // 模拟捐赠过程
    setTimeout(() => {
      setIsDonating(false)
      setDonationSuccess(true)
      setTxHash('0x' + Math.random().toString(16).substr(2, 64))
    }, 2000)
  }

  return (
    <PageTransition className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-20">
        {/* 顶部Banner区 */}
        <FadeIn delay={0}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold glass-text-red mb-2">
              让每一笔捐赠公开透明，按时送达
            </h1>
          </div>
        </FadeIn>

        {/* 公益资金池数据区 */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-stats-card gradient-bg-primary p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <h3 className="text-lg font-bold mb-1 glass-text-red">
                {charityStats.totalBalance.toLocaleString()}
              </h3>
              <p className="text-sm glass-text-blue-light">公益资金池余额 (AOT)</p>
            </div>
            
            <div className="glass-stats-card gradient-bg-secondary p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <h3 className="text-lg font-bold mb-1 glass-text-gold">
                {charityStats.totalDonations.toLocaleString()}
              </h3>
              <p className="text-sm glass-text-blue-light">累计捐赠笔数</p>
            </div>
            
            <div className="glass-stats-card gradient-bg-accent p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <h3 className="text-lg font-bold mb-1 glass-text-blue">
                {charityStats.totalBeneficiaries.toLocaleString()}
              </h3>
              <p className="text-sm glass-text-blue-light">累计受助人数</p>
            </div>
          </div>
        </FadeIn>


        {/* 底部说明 */}
        <FadeIn delay={400}>
          <div className="text-center text-gray-600">
            <p className="mb-2">
              💝 每一笔捐赠都将记录在区块链上，确保透明可查
            </p>
            <p className="text-sm">
              让爱心传递，让世界更美好
            </p>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  )
}

