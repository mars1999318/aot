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
  const { isConnected } = useAccount()
  const { t } = useTranslation()

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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold glass-text-red mb-4">
              让每一笔捐赠公开透明，按时送达
            </h1>
            
            {/* 金色装饰线 */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full mx-4"></div>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
          </div>
        </FadeIn>

        {/* 公益资金池数据区 */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-stats-card gradient-bg-primary p-6 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-4 text-gray-700" />
              <h3 className="text-2xl font-bold mb-2 glass-text-red">
                {charityStats.totalBalance.toLocaleString()}
              </h3>
              <p className="glass-text-blue-light">公益资金池余额 (AOT)</p>
            </div>
            
            <div className="glass-stats-card gradient-bg-secondary p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-gray-700" />
              <h3 className="text-2xl font-bold mb-2 glass-text-gold">
                {charityStats.totalDonations.toLocaleString()}
              </h3>
              <p className="glass-text-blue-light">累计捐赠笔数</p>
            </div>
            
            <div className="glass-stats-card gradient-bg-accent p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-gray-700" />
              <h3 className="text-2xl font-bold mb-2 glass-text-blue">
                {charityStats.totalBeneficiaries.toLocaleString()}
              </h3>
              <p className="glass-text-blue-light">累计受助人数</p>
            </div>
          </div>
        </FadeIn>

        {/* 捐赠入口区 */}
        <FadeIn delay={200}>
          <div className="glass-card p-8 mb-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold glass-text-dark text-center mb-8">
                立即捐赠
              </h2>
              
              {!address ? (
                <div className="text-center">
                  <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="glass-text-dark mb-6">请先连接钱包以进行捐赠</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    连接钱包
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      捐赠金额
                    </label>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="请输入捐赠金额"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      选择币种
                    </label>
                    <select
                      value={selectedToken}
                      onChange={(e) => setSelectedToken(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="AOT">AOT</option>
                      <option value="USDT">USDT</option>
                      <option value="USDC">USDC</option>
                    </select>
                  </div>
                  
                  {donationSuccess ? (
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        捐赠成功！
                      </h3>
                      <p className="text-green-600 mb-4">
                        感谢您的爱心捐赠 {donationAmount} {selectedToken}
                      </p>
                      <div className="text-sm text-gray-600">
                        <p>交易哈希：</p>
                        <p className="font-mono break-all">{txHash}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleDonate}
                      disabled={!donationAmount || isDonating}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      {isDonating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          处理中...
                        </>
                      ) : (
                        '立即捐赠'
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* 捐赠记录区 */}
        <FadeIn delay={300}>
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold glass-text-dark mr-4">近期捐赠记录</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
            </div>
            
            <div className="glass-card overflow-hidden">
              <div className="divide-y divide-gray-100">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="p-6 hover:bg-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                          <Heart className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-semibold glass-text-dark">
                            {donation.amount} AOT
                          </p>
                          <p className="text-sm glass-text-dark">
                            {donation.address}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm glass-text-dark flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {donation.time}
                        </p>
                        <a
                          href={`https://bscscan.com/tx/${donation.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
                        >
                          查看交易
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
