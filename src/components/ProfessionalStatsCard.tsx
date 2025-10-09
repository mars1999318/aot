import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ProfessionalStatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  gradient?: string
  trend?: {
    value: number
    period: string
  }
  className?: string
  glow?: boolean
  animated?: boolean
}

export function ProfessionalStatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  gradient = 'from-blue-500 to-purple-600',
  trend,
  className = '',
  glow = false,
  animated = true
}: ProfessionalStatsCardProps) {
  const changeColorClasses = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400'
  }

  const glowClass = glow ? 'hover:shadow-2xl hover:shadow-blue-500/25' : ''
  const animatedClass = animated ? 'professional-fade-in' : ''

  return (
    <div className={`
      professional-stats-card
      ${glowClass}
      ${animatedClass}
      ${className}
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          
          {change && (
            <div className="flex items-center">
              <span className={`text-sm font-semibold ${changeColorClasses[changeType]}`}>
                {change}
              </span>
              {trend && (
                <span className="text-xs text-gray-400 ml-2">
                  {trend.value > 0 ? '+' : ''}{trend.value}% {trend.period}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center text-white
          bg-gradient-to-br ${gradient}
          shadow-lg
          ${animated ? 'professional-bounce' : ''}
        `}>
          <Icon className="h-8 w-8" />
        </div>
      </div>

      {/* 装饰性渐变条 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  )
}

interface ProfessionalStatsGridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

export function ProfessionalStatsGrid({ 
  children, 
  className = '', 
  columns = 3,
  gap = 'md'
}: ProfessionalStatsGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }

  return (
    <div className={`
      professional-grid
      ${gridClasses[columns]}
      ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  )
}

interface ProfessionalMetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  gradient?: string
  className?: string
}

export function ProfessionalMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = 'from-blue-500 to-purple-600',
  className = ''
}: ProfessionalMetricCardProps) {
  return (
    <div className={`
      professional-card p-6
      ${className}
    `}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          bg-gradient-to-br ${gradient}
          shadow-lg
        `}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
