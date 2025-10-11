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
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 pb-20">
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

        {/* Traditional vs Blockchain Charity Comparison */}
        <FadeIn delay={150}>
          <div className="max-w-6xl mx-auto py-12">
            {/* Module Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
                {t('charity.comparisonTitle')}
              </h2>
              <div className="w-15 h-1 mx-auto" style={{ backgroundColor: '#D4AF37' }}></div>
            </div>

            {/* Comparison Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Traditional Charity */}
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                    {t('charity.traditionalCharity')}
                  </h3>
                </div>
                
                {/* Trust Mechanism */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.trustMechanism')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('charity.traditionalTrustDesc')}
                  </p>
                </div>

                {/* Participation Mode */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.participationMode')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('charity.traditionalParticipationDesc')}
                  </p>
                </div>

                {/* Limitations and Challenges */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.limitationsChallenges')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('charity.traditionalLimitationsDesc')}
                  </p>
                </div>
              </div>

              {/* Blockchain Charity */}
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E5AA8' }}>
                    {t('charity.blockchainCharity')}
                  </h3>
                </div>
                
                {/* Trust Mechanism */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.trustMechanism')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('charity.blockchainTrustDesc')}
                  </p>
                </div>

                {/* Participation Mode */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.participationMode')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('charity.blockchainParticipationDesc')}
                  </p>
                </div>

                {/* Limitations and Challenges */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.limitationsChallenges')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t('charity.blockchainLimitationsDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('charity.summary1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('charity.summary2')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('charity.summary3')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('charity.summary4')}
              </p>
              <p className="text-gray-700 leading-relaxed font-bold">
                {t('charity.summary5')}
              </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* DAO Global Aid Process Timeline */}
        <FadeIn delay={200}>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1E5AA8' }}>
                🌍 {t('charity.daoAidProcess')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('charity.daoAidSubtitle')}
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
                      {t('charity.step1Title')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('charity.step1Desc')}
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
                      {t('charity.step2Title')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('charity.step2Desc')}
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
                      {t('charity.step3Title')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('charity.step3Desc')}
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
                      {t('charity.step4Title')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('charity.step4Desc')}
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
                      {t('charity.step5Title')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('charity.step5Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Blockchain + Charity Development Prospects */}
        <FadeIn delay={300}>
          <div className="max-w-6xl mx-auto py-12">
            {/* Module Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
                {t('charity.prospectsTitle')}
              </h2>
              <div className="w-15 h-1 mx-auto" style={{ backgroundColor: '#D4AF37' }}></div>
            </div>

            {/* Development Points */}
            <div className="space-y-8 mb-12">
              {/* Point 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.point1Title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('charity.point1Desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.point2Title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('charity.point2Desc')}
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• {t('charity.point2List1')}</li>
                      <li>• {t('charity.point2List2')}</li>
                      <li>• {t('charity.point2List3')}</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      {t('charity.point2Conclusion')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.point3Title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('charity.point3Desc')}
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• {t('charity.point3List1')}</li>
                      <li>• {t('charity.point3List2')}</li>
                      <li>• {t('charity.point3List3')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Point 4 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.point4Title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('charity.point4Desc')}
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• {t('charity.point4List1')}</li>
                      <li>• {t('charity.point4List2')}</li>
                      <li>• {t('charity.point4List3')}</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      {t('charity.point4Conclusion')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 5 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.point5Title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('charity.point5Desc')}
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• {t('charity.point5List1')}</li>
                      <li>• {t('charity.point5List2')}</li>
                      <li>• {t('charity.point5List3')}</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      {t('charity.point5Conclusion')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 6 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">6</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('charity.point6Title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('charity.point6Desc')}
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• {t('charity.point6List1')}</li>
                      <li>• {t('charity.point6List2')}</li>
                      <li>• {t('charity.point6List3')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E5AA8' }}>{t('charity.conclusionTitle')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('charity.conclusionIntro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">{t('charity.transparencyChar')}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{t('charity.transparencyText')}</p>
                    <p className="text-xs text-gray-500">{t('charity.transparencyDesc')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">{t('charity.globalizationChar')}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{t('charity.globalizationText')}</p>
                    <p className="text-xs text-gray-500">{t('charity.globalizationDesc')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-yellow-600 font-bold">{t('charity.financializationChar')}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{t('charity.financializationText')}</p>
                    <p className="text-xs text-gray-500">{t('charity.financializationDesc')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">{t('charity.autonomyChar')}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{t('charity.autonomyText')}</p>
                    <p className="text-xs text-gray-500">{t('charity.autonomyDesc')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-pink-600 font-bold">{t('charity.youthChar')}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{t('charity.youthText')}</p>
                    <p className="text-xs text-gray-500">{t('charity.youthDesc')}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-bold">
                  {t('charity.conclusionFinal')}
                </p>
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

