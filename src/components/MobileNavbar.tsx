import { Home, Coins, Users, Heart } from 'lucide-react'
import { WalletConnect } from './WalletConnect'
import { LanguageSwitcher } from './LanguageSwitcher'

interface MobileNavbarProps {
  className?: string
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MobileNavbar({ className = '', activeTab, setActiveTab }: MobileNavbarProps) {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={`lg:hidden ${className}`}>
      {/* 移动端顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 glass-navbar z-50 mobile-safe-area">
        <div className="flex items-center justify-between px-4 py-1.5">
          {/* 左侧：Logo + 标题 */}
          <div className="flex items-center space-x-3">
            <img 
              src="/aot/logo.png" 
              alt="ArriveOnTime Logo" 
              className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/30"
            />
                <span className="text-xl font-bold glass-text-blue">ArriveOnTime</span>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-1">
            <LanguageSwitcher />
            <WalletConnect />
          </div>
        </div>
      </div>


      {/* 移动端底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 glass-bottom-nav z-50 mobile-safe-area">
        <div className="flex items-center justify-around py-1">
          <button 
            onClick={() => handleTabClick('dashboard')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'dashboard' 
                ? 'bg-white/50 text-gray-800 font-semibold' 
                : 'text-gray-700 hover:bg-white/30 hover:text-gray-800'
            }`}
          >
            <Home className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">仪表板</span>
          </button>
          <button 
            onClick={() => handleTabClick('staking')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'staking' 
                ? 'bg-white/50 text-gray-800 font-semibold' 
                : 'text-gray-700 hover:bg-white/30 hover:text-gray-800'
            }`}
          >
            <Coins className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">质押</span>
          </button>
          <button 
            onClick={() => handleTabClick('referral')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'referral' 
                ? 'bg-white/50 text-gray-800 font-semibold' 
                : 'text-gray-700 hover:bg-white/30 hover:text-gray-800'
            }`}
          >
            <Users className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">推荐</span>
          </button>
          <button 
            onClick={() => handleTabClick('charity')}
            className={`flex flex-col items-center py-0.5 px-1 rounded-lg transition-smooth ${
              activeTab === 'charity' 
                ? 'bg-white/50 text-gray-800 font-semibold' 
                : 'text-gray-700 hover:bg-white/30 hover:text-gray-800'
            }`}
          >
            <Heart className="w-3 h-3 mb-0.5" />
            <span className="text-xs font-medium">公益</span>
          </button>
        </div>
      </div>
    </div>
  )
}
