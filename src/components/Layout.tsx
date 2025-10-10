import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNavbar } from './MobileNavbar'
import { NetworkDebug } from './NetworkDebug'
import { MobileDetector } from './MobileDetector'
import { PullToRefresh } from './PullToRefresh'
import { Dashboard } from '../pages/Dashboard'
import { Staking } from '../pages/Staking'
import { Referral } from '../pages/Referral'
import { Charity } from '../pages/Charity'

export function Layout() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [refreshKey, setRefreshKey] = useState(0)

  // 添加移动端检测调试
  React.useEffect(() => {
    console.log('屏幕宽度:', window.innerWidth)
    console.log('用户代理:', navigator.userAgent)
    console.log('是否为移动设备:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  // 处理页面切换，确保滚动到顶部
  const handleTabChange = (tab: string) => {
    // 立即滚动到顶部，不使用动画
    window.scrollTo({ top: 0, behavior: 'instant' })
    // 强制设置scrollTop为0
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // 然后切换页面
    setActiveTab(tab)
  }

  // 监听页面切换，确保每次切换都滚动到顶部
  useEffect(() => {
    // 使用setTimeout确保DOM更新后再滚动
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    
    // 立即执行一次
    scrollToTop()
    
    // 延迟执行一次，确保页面内容加载完成
    const timeoutId = setTimeout(scrollToTop, 10)
    
    return () => clearTimeout(timeoutId)
  }, [activeTab])

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
    // 触发页面重新渲染和数据刷新
    window.location.reload()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key={`dashboard-${refreshKey}`} />
      case 'staking':
        return <Staking key={`staking-${refreshKey}`} />
      case 'referral':
        return <Referral key={`referral-${refreshKey}`} />
      case 'charity':
        return <Charity key={`charity-${refreshKey}`} />
      default:
        return <Dashboard key={`dashboard-${refreshKey}`} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 桌面端布局 */}
      <div className="hidden lg:flex">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="flex-1 ml-64">
          <PullToRefresh onRefresh={handleRefresh}>
            {renderContent()}
          </PullToRefresh>
        </main>
      </div>

      {/* 移动端布局 */}
      <div className="lg:hidden">
        <MobileNavbar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="pt-20 pb-20">
          <PullToRefresh onRefresh={handleRefresh}>
            {renderContent()}
          </PullToRefresh>
        </main>
      </div>
    </div>
  )
}
