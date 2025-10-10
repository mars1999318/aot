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
  AlertCircle,
  Lightbulb,
  HandHeart,
  FileCheck
} from 'lucide-react'

export function Charity() {
  const { isConnected, address } = useAccount()
  const { t } = useTranslation()

  // Add debug information
  console.log('Charity - isConnected:', isConnected)
  console.log('Charity - address:', address)

  // If wallet is not connected, show connection prompt
  if (!isConnected) {
    return <WalletNotConnected />
  }
  
  // State management
  const [donationAmount, setDonationAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState('AOT')
  const [isDonating, setIsDonating] = useState(false)
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [txHash, setTxHash] = useState('')

  // Mock data
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
      time: t('charity.twoHoursAgo'),
      txHash: '0xabcd1234...'
    },
    {
      id: 2,
      amount: 1000,
      address: '0x9876...5432',
      time: t('charity.fiveHoursAgo'),
      txHash: '0xefgh5678...'
    },
    {
      id: 3,
      amount: 200,
      address: '0x4567...8901',
      time: t('charity.oneDayAgo'),
      txHash: '0xijkl9012...'
    }
  ]

  // Handle donation
  const handleDonate = async () => {
    if (!donationAmount || !address) return
    
    setIsDonating(true)
    
    // Simulate donation process
    setTimeout(() => {
      setIsDonating(false)
      setDonationSuccess(true)
      setTxHash('0x' + Math.random().toString(16).substr(2, 64))
    }, 2000)
  }

  return (
    <PageTransition className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-20">
        {/* Top Banner Area */}
        <FadeIn delay={0}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold glass-text-red mb-2">
              {t('charity.title')}
            </h1>
            <p className="text-sm glass-text-blue-light">
              {t('charity.subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* Charity Fund Pool Data Area */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-stats-card gradient-bg-primary p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <h3 className="text-lg font-bold mb-1 glass-text-red">
                {charityStats.totalBalance.toLocaleString()}
              </h3>
              <p className="text-sm glass-text-blue-light">{t('charity.fundPoolBalance')}</p>
            </div>
            
            <div className="glass-stats-card gradient-bg-secondary p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <h3 className="text-lg font-bold mb-1 glass-text-gold">
                {charityStats.totalDonations.toLocaleString()}
              </h3>
              <p className="text-sm glass-text-blue-light">{t('charity.totalDonationCount')}</p>
            </div>
            
            <div className="glass-stats-card gradient-bg-accent p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <h3 className="text-lg font-bold mb-1 glass-text-blue">
                {charityStats.totalBeneficiaries.toLocaleString()}
              </h3>
              <p className="text-sm glass-text-blue-light">{t('charity.totalBeneficiaries')}</p>
            </div>
          </div>
        </FadeIn>

        {/* DAO Global Aid Process Timeline */}
        <FadeIn delay={200}>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1E5AA8' }}>
                🌍 DAO 全球援助流程
              </h2>
              <p className="text-gray-600 text-sm">
                从提案、投票、募捐到执行与反馈，每一步都公开透明，链上可查。
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#D4AF37' }}></div>
              
              {/* Timeline Steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white border-4 shadow-lg" style={{ borderColor: '#D4AF37' }}>
                    <Lightbulb className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                      发起援助提案
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      当某个地区发生灾害或紧急需求时，任何 DAO 成员都可在链上发起提案，公开描述援助背景与计划。
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white border-4 shadow-lg" style={{ borderColor: '#D4AF37' }}>
                    <Users className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                      社区公开投票
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      提案发布后，全球社区成员将对提案进行链上投票，结果公开透明、不可篡改，确保每一票都真实有效。
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white border-4 shadow-lg" style={{ borderColor: '#D4AF37' }}>
                    <HandHeart className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                      全球募捐
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      投票通过后，系统进入全球募捐阶段。用户可使用稳定币或代币捐赠，所有资金进入智能合约资金池，过程公开透明。
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white border-4 shadow-lg" style={{ borderColor: '#D4AF37' }}>
                    <Wallet className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                      拨款与执行
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      募捐完成后，DAO 依据提案内容，通过多签钱包或合约自动拨款，确保资金精准送达受援方。
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white border-4 shadow-lg" style={{ borderColor: '#D4AF37' }}>
                    <FileCheck className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                      援助反馈与结案
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      援助完成后，提案方需提交资金使用与援助成果报告，所有资料上链存证，形成完整透明的援助闭环。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Description */}
        <FadeIn delay={400}>
          <div className="text-center text-gray-600">
            <p className="mb-2">
              💝 {t('charity.blockchainTransparency')}
            </p>
            <p className="text-sm">
              {t('charity.loveTransmission')}
            </p>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  )
}

