import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WalletProvider } from './providers/WalletProvider'
import { ToastProvider } from './contexts/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import './i18n'
import './index.css'

// OPPO手机和TokenPocket钱包兼容性检测和修复
const isOPPODevice = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('oppo') || userAgent.includes('coloros') || userAgent.includes('oneplus')
}

const isTokenPocketWallet = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('tokenpocket') || userAgent.includes('tpwallet') || 
         window.location.href.includes('tokenpocket') ||
         window.ethereum?.isTokenPocket
}

// 检测并修复OPPO手机和TokenPocket钱包问题
if (isOPPODevice() || isTokenPocketWallet()) {
  console.log('检测到OPPO设备或TokenPocket钱包，应用兼容性修复')
  
  // 修复OPPO浏览器CSS渲染问题
  document.documentElement.style.setProperty('--webkit-transform', 'translateZ(0)')
  
  // TokenPocket钱包特定修复
  if (isTokenPocketWallet()) {
    console.log('检测到TokenPocket钱包，应用钱包特定修复')
    
    // 修复TokenPocket钱包的WebView问题
    document.documentElement.style.setProperty('--webkit-backface-visibility', 'hidden')
    document.documentElement.style.setProperty('--webkit-perspective', '1000px')
    
    // 强制重新渲染
    setTimeout(() => {
      document.body.style.display = 'none'
      document.body.offsetHeight // 触发重排
      document.body.style.display = ''
    }, 100)
  }
  
  // 修复触摸事件
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }, { passive: false })
  
  // 修复滚动问题
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }, { passive: false })
}

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <ToastProvider>
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        </ToastProvider>
      </WalletProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)