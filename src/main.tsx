import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WalletProvider } from './providers/WalletProvider'
import { ToastProvider } from './contexts/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import './i18n'
import './index.css'

// OPPO手机兼容性检测和修复
const isOPPODevice = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('oppo') || userAgent.includes('coloros') || userAgent.includes('oneplus')
}

// 检测并修复OPPO手机问题
if (isOPPODevice()) {
  console.log('检测到OPPO设备，应用兼容性修复')
  
  // 修复OPPO浏览器CSS渲染问题
  document.documentElement.style.setProperty('--webkit-transform', 'translateZ(0)')
  
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