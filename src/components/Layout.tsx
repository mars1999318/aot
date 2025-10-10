import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNavbar } from './MobileNavbar'
import { NetworkDebug } from './NetworkDebug'
import { MobileDetector } from './MobileDetector'
import { Dashboard } from '../pages/Dashboard'
import { Staking } from '../pages/Staking'
import { Referral } from '../pages/Referral'
import { Charity } from '../pages/Charity'

export function Layout() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // 添加移动端检测调试
  React.useEffect(() => {
    console.log('屏幕宽度:', window.innerWidth)
    console.log('用户代理:', navigator.userAgent)
    console.log('是否为移动设备:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  // 处理页面切换，确保滚动到顶部
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // 立即滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'staking':
        return <Staking />
      case 'referral':
        return <Referral />
      case 'charity':
        return <Charity />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 桌面端布局 */}
      <div className="hidden lg:flex">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="flex-1 ml-64">
          {renderContent()}
        </main>
      </div>

      {/* 移动端布局 */}
      <div className="lg:hidden">
        <MobileNavbar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="pt-20 pb-20">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
