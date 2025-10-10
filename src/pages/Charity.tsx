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

        {/* Traditional vs Blockchain Charity Comparison */}
        <FadeIn delay={150}>
          <div className="max-w-6xl mx-auto py-12">
            {/* Module Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
                传统慈善 vs 区块链慈善
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
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">DAO 公益组织的兴起</h3>
                    <p className="text-gray-600 leading-relaxed">
                      随着 <strong>去中心化自治组织（DAO）</strong> 的普及，未来可能出现"全球公益 DAO"：
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• 捐赠者通过持有代币或 NFT，获得 <strong>投票权</strong>。</li>
                      <li>• 善款的流向由全球社区共同投票决定，而非某个单一机构拍板。</li>
                      <li>• 受助者可以通过链上申请与社区投票直接获得援助，减少繁琐的审批流程。</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      这将形成真正的 <strong>去中心化、共识驱动型公益生态</strong>。
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
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">公益金融化（CharityFi）</h3>
                    <p className="text-gray-600 leading-relaxed">
                      区块链不仅能筹款，还能通过 DeFi、质押、NFT、RWA 等模式让公益资金持续增值：
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• 公益基金池可进行低风险 DeFi 投资，让资金"活水化"，产生持续收益。</li>
                      <li>• 捐赠者可以获得链上凭证 NFT，不仅证明爱心行为，还能作为身份标识，甚至参与元宇宙公益活动。</li>
                      <li>• 未来的 RWA（现实资产上链）可以让部分捐赠与真实项目挂钩，例如教育贷款、绿色能源等，实现 <strong>公益+投资</strong> 的双赢。</li>
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
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">打破国界的全球援助</h3>
                    <p className="text-gray-600 leading-relaxed">
                      传统公益常常受 <strong>跨境金融体系、外汇限制、效率低下</strong> 的困扰。
                      区块链天然具有 <strong>全球结算</strong> 的优势：
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• 一笔捐款可在几分钟内从美国直达非洲、东南亚的受助人钱包。</li>
                      <li>• 避免高昂的国际转账手续费。</li>
                      <li>• 让全球任何一个角落只要有网络，就能收到援助。</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      这意味着区块链有潜力成为 <strong>全球化公益的底层金融基础设施</strong>。
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
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">年轻一代的参与热情</h3>
                    <p className="text-gray-600 leading-relaxed">
                      年轻人更愿意通过 <strong>Web3 工具</strong> 参与公益：
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• 他们习惯使用钱包、交易所、NFT 市场。</li>
                      <li>• 对链上治理、代币激励有更高接受度。</li>
                      <li>• "做公益还能获得链上身份与收益证明" 会成为吸引他们的重要动力。</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      这将使公益与 <strong>潮流文化、加密经济</strong> 深度结合，形成 <strong>新一代公益生态</strong>。
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
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">政府与机构的结合</h3>
                    <p className="text-gray-600 leading-relaxed">
                      未来，政府、联合国等国际组织，也可能采用区块链作为 <strong>公益资金监管与发放的标准工具</strong>。
                    </p>
                    <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
                      <li>• 提升国际援助的透明度。</li>
                      <li>• 打击腐败与资金挪用。</li>
                      <li>• 让全球公益逐步走向 <strong>公开化、标准化、可信化</strong>。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E5AA8' }}>✨ 结论</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  区块链公益的发展前景是：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">透</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">透明化</p>
                    <p className="text-xs text-gray-500">（打破黑箱）</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">全</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">全球化</p>
                    <p className="text-xs text-gray-500">（跨境无障碍）</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-yellow-600 font-bold">金</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">金融化</p>
                    <p className="text-xs text-gray-500">（资金持续增值）</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">自</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">自治化</p>
                    <p className="text-xs text-gray-500">（DAO治理）</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-pink-600 font-bold">年</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">年轻化</p>
                    <p className="text-xs text-gray-500">（吸引新一代）</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-bold">
                  未来十年，区块链将不只是金融工具，更可能成为 <strong>全球公益基础设施</strong>，让"爱心共识"真正上链，形成跨越国界、文化和时间的 <strong>人类慈善网络</strong>。
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

