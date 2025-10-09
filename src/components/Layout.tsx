import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNavbar } from './MobileNavbar'
import { Dashboard } from '../pages/Dashboard'
import { Staking } from '../pages/Staking'
import { Referral } from '../pages/Referral'
import { Charity } from '../pages/Charity'

export function Layout() {
  const [activeTab, setActiveTab] = useState('dashboard')

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
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 ml-64">
          {renderContent()}
        </main>
      </div>

      {/* 移动端布局 */}
      <div className="lg:hidden">
        <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="pt-20 pb-20">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
