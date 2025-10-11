import React from 'react'
import { Home, Coins, Users, Heart } from 'lucide-react'
import { WalletConnect } from './WalletConnect'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from '../hooks/useTranslation'

interface MobileNavbarProps {
  className?: string
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MobileNavbar({ className = '', activeTab, setActiveTab }: MobileNavbarProps) {
  const { t } = useTranslation()
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  // 调试信息
  React.useEffect(() => {
    console.log('MobileNavbar rendered, activeTab:', activeTab)
  }, [activeTab])

  return (
    <div className={`lg:hidden ${className}`}>
      {/* Mobile Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 glass-navbar z-50 mobile-safe-area">
        <div className="flex items-center justify-between px-4 py-1.5">
          {/* Left: Logo + Title */}
          <div className="flex items-center space-x-3">
            <img 
              src="/aot/logo.png?v=3" 
              alt="ArriveOnTime Logo" 
              className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/30"
            />
                <span className="text-xl font-bold glass-text-blue">ArriveOnTime</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1">
            <LanguageSwitcher />
            <WalletConnect />
          </div>
        </div>
      </div>


      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-bottom-nav z-50 mobile-safe-area">
        <div className="flex items-center justify-around py-1">
          <button 
            onClick={() => handleTabClick('dashboard')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white font-bold shadow-lg border border-blue-400/50' 
                : 'text-gray-700 hover:bg-white/40 hover:text-gray-900 hover:shadow-md'
            }`}
          >
            <Home className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">{t('dashboard.title')}</span>
          </button>
          <button 
            onClick={() => handleTabClick('staking')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'staking' 
                ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white font-bold shadow-lg border border-blue-400/50' 
                : 'text-gray-700 hover:bg-white/40 hover:text-gray-900 hover:shadow-md'
            }`}
          >
            <Coins className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">{t('staking.title')}</span>
          </button>
          <button 
            onClick={() => handleTabClick('referral')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'referral' 
                ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white font-bold shadow-lg border border-blue-400/50' 
                : 'text-gray-700 hover:bg-white/40 hover:text-gray-900 hover:shadow-md'
            }`}
          >
            <Users className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">{t('referral.title')}</span>
          </button>
          <button 
            onClick={() => handleTabClick('charity')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'charity' 
                ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white font-bold shadow-lg border border-blue-400/50' 
                : 'text-gray-700 hover:bg-white/40 hover:text-gray-900 hover:shadow-md'
            }`}
          >
            <Heart className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">{t('charity.title')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
