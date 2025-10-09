import React from 'react'
import { LucideIcon } from 'lucide-react'

interface MobileStatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  color: string
  trend?: {
    value: number
    period: string
  }
  className?: string
  compact?: boolean
}

export function MobileStatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
  trend,
  className = '',
  compact = false
}: MobileStatsCardProps) {
  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  if (compact) {
    return (
      <div className={`
        mobile-card bg-white rounded-lg shadow-sm border border-gray-200 p-3
        transition-all duration-200 active:scale-98
        ${className}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3
              ${color}
            `}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">{title}</p>
              <p className="text-sm font-bold text-gray-900">{value}</p>
            </div>
          </div>
          {change && (
            <span className={`text-xs font-medium ${changeColorClasses[changeType]}`}>
              {change}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`
      mobile-card bg-white rounded-lg shadow-sm border border-gray-200 p-4
      transition-all duration-200 active:scale-98
      ${className}
    `}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900 mb-2">{value}</p>
          
          {change && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${changeColorClasses[changeType]}`}>
                {change}
              </span>
              {trend && (
                <span className="text-xs text-gray-500 ml-2">
                  {trend.value > 0 ? '+' : ''}{trend.value}% {trend.period}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center text-white
          ${color}
        `}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

interface MobileStatsGridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3
}

export function MobileStatsGrid({ 
  children, 
  className = '', 
  columns = 2 
}: MobileStatsGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  }

  return (
    <div className={`
      grid gap-4 ${gridClasses[columns]}
      ${className}
    `}>
      {children}
    </div>
  )
}
