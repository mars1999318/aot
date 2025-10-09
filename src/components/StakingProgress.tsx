import React from 'react'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface StakingProgressProps {
  step: 'approve' | 'stake' | 'complete'
  isLoading: boolean
}

export function StakingProgress({ step, isLoading }: StakingProgressProps) {
  const steps = [
    { id: 'approve', label: 'Approve', icon: CheckCircle },
    { id: 'stake', label: 'Stake', icon: Clock },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ]

  const getStepStatus = (stepId: string) => {
    const currentStepIndex = steps.findIndex(s => s.id === step)
    const stepIndex = steps.findIndex(s => s.id === stepId)
    
    if (stepIndex < currentStepIndex) return 'completed'
    if (stepIndex === currentStepIndex) return isLoading ? 'loading' : 'current'
    return 'pending'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Staking Progress</h3>
      <div className="space-y-4">
        {steps.map((stepItem, index) => {
          const status = getStepStatus(stepItem.id)
          const Icon = stepItem.icon
          
          return (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                status === 'completed' ? 'bg-green-500' :
                status === 'current' ? 'bg-blue-500' :
                status === 'loading' ? 'bg-blue-500 animate-pulse' :
                'bg-gray-300'
              }`}>
                {status === 'loading' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Icon className={`h-4 w-4 ${
                    status === 'completed' || status === 'current' ? 'text-white' : 'text-gray-500'
                  }`} />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  status === 'completed' ? 'text-green-600' :
                  status === 'current' ? 'text-blue-600' :
                  'text-gray-500'
                }`}>
                  {stepItem.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`ml-4 flex-1 h-0.5 ${
                  status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
