import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNavbar } from './MobileNavbar'
import { NetworkDebug } from './NetworkDebug'
import { MobileDetector } from './MobileDetector'
import { PullToRefresh } from './PullToRefresh'
import { MobileDebug } from './MobileDebug'
import { TokenPocketFix } from './TokenPocketFix'
import { Dashboard } from '../pages/Dashboard'
import { Staking } from '../pages/Staking'
import { Referral } from '../pages/Referral'
import { Charity } from '../pages/Charity'

export function Layout() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [refreshKey, setRefreshKey] = useState(0)

  // Add mobile detection debugging
  React.useEffect(() => {
    console.log('Screen width:', window.innerWidth)
    console.log('User agent:', navigator.userAgent)
    console.log('Is mobile device:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  // Handle page switching, ensure scrolling to top
  const handleTabChange = (tab: string) => {
    // Immediately scroll to top without animation
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Force set scrollTop to 0
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // Then switch page
    setActiveTab(tab)
    // Force re-render
    setRefreshKey(prev => prev + 1)
  }

  // Listen for page switching, ensure scrolling to top on each switch
  useEffect(() => {
    // Use setTimeout to ensure scrolling after DOM updates
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    
    // Execute immediately once
    scrollToTop()
    
    // Execute once after delay to ensure page content is loaded
    const timeoutId = setTimeout(scrollToTop, 10)
    
    return () => clearTimeout(timeoutId)
  }, [activeTab])

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
    // Trigger page re-render and data refresh without full page reload
    // The refreshKey change will trigger component re-renders and data refetch
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
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="flex-1 ml-64">
          <PullToRefresh onRefresh={handleRefresh}>
            {renderContent()}
          </PullToRefresh>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-screen flex flex-col">
        <MobileNavbar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="flex-1 overflow-y-auto pt-20 pb-20">
          <PullToRefresh onRefresh={handleRefresh}>
            {renderContent()}
          </PullToRefresh>
        </main>
      </div>
      
      {/* Mobile Debug Component */}
      <MobileDebug />
      
      {/* TokenPocket Fix Component */}
      <TokenPocketFix />
    </div>
  )
}
