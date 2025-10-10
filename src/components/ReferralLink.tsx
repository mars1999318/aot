import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { ModernButton } from './ModernButton'
import { ModernCard, ModernCardHeader, ModernCardBody } from './ModernCard'
import { useToast } from '../contexts/ToastContext'

interface ReferralLinkProps {
  link: string
  className?: string
}

export function ReferralLink({ link, className = '' }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false)
  const { showSuccess } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      showSuccess('复制成功', '推荐链接已复制到剪贴板')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold glass-text-blue">推荐链接</h3>
      </div>
      <div className="bg-white/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm glass-text-gold break-all">{link}</p>
          </div>
          <button
            onClick={handleCopy}
            className="glass-button ml-2 flex-shrink-0 px-3 py-1 text-sm flex items-center"
          >
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    </div>
  )
}
