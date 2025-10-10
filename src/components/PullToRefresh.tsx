import React, { useState, useEffect, useRef } from 'react'
import { RefreshCw } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

interface PullToRefreshProps {
  onRefresh: () => void
  children: React.ReactNode
  className?: string
}

export function PullToRefresh({ onRefresh, children, className = '' }: PullToRefreshProps) {
  const { t } = useTranslation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return

    currentY.current = e.touches[0].clientY
    const distance = Math.max(0, currentY.current - startY.current)
    
    if (distance > 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance, 80))
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance > 50) {
      setIsRefreshing(true)
      onRefresh()
      
      // Simulate refresh completion
      setTimeout(() => {
        setIsRefreshing(false)
        setPullDistance(0)
        setIsPulling(false)
      }, 1000)
    } else {
      setPullDistance(0)
      setIsPulling(false)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, pullDistance])

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${pullDistance}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull to refresh indicator */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300 ${
          pullDistance > 0 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: `${Math.min(pullDistance, 80)}px` }}
      >
        <div className="flex items-center space-x-2">
          <RefreshCw 
            className={`w-5 h-5 text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`}
            style={{
              transform: `rotate(${pullDistance * 4.5}deg)`
            }}
          />
          <span className="text-sm text-gray-600">
            {isRefreshing ? t('common.refreshing') : pullDistance > 50 ? t('common.releaseToRefresh') : t('common.pullToRefresh')}
          </span>
        </div>
      </div>

      {children}
    </div>
  )
}
