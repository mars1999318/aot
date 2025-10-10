import { LucideIcon } from 'lucide-react'

interface ModernStatsCardProps {
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
}

export function ModernStatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
  trend,
  className = ''
}: ModernStatsCardProps) {
  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <div className={`
      bg-white rounded-xl shadow-sm border border-gray-200 p-6 
      transition-all duration-200 hover:shadow-md hover:scale-105
      ${className}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          
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
