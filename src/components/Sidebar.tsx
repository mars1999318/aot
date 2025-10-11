import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { 
  Home, 
  Coins, 
  Users,
  Heart
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'dashboard.title' },
  { id: 'staking', icon: Coins, label: 'staking.title' },
  { id: 'referral', icon: Users, label: 'referral.title' },
  { id: 'charity', icon: Heart, label: 'charity.title' }
]

export function Sidebar({ activeTab, setActiveTab }: { 
  activeTab: string
  setActiveTab: (tab: string) => void 
}) {
  const { t } = useTranslation()

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
        <div className="fixed left-0 top-0 h-full w-64 glass-sidebar z-50">
      <div className="p-3 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.png?v=3" 
            alt="ArriveOnTime Logo" 
            className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-white/30"
          />
            <span className="text-lg font-bold glass-text-blue">ArriveOnTime</span>
        </div>
      </div>
      <div className="p-2">
        <nav className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center px-2.5 py-2 text-left rounded-lg transition-smooth ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white font-bold shadow-lg border border-blue-400/50' 
                        : 'text-gray-700 hover:bg-white/40 hover:text-gray-900 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2.5" />
                    {t(item.label)}
                  </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
