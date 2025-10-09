import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WalletProvider } from './providers/WalletProvider'
import { ToastProvider } from './contexts/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import './i18n'
import './index.css'

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