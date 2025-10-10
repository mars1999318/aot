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

