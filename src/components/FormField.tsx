import React, { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

interface FormFieldProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  success?: string
  helpText?: string
  className?: string
  validation?: (value: string) => { isValid: boolean; message?: string }
  debounceMs?: number
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  success,
  helpText,
  className = '',
  validation,
  debounceMs = 300
}: FormFieldProps) {
  const [internalValue, setInternalValue] = useState(value)
  const [validationError, setValidationError] = useState<string | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // 防抖验证
  useEffect(() => {
    if (!validation || !internalValue) {
      setValidationError(undefined)
      return
    }

    setIsValidating(true)
    const timer = setTimeout(() => {
      const result = validation(internalValue)
      setValidationError(result.isValid ? undefined : result.message)
      setIsValidating(false)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [internalValue, validation, debounceMs])

  // 同步外部值
  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleChange = (newValue: string) => {
    setInternalValue(newValue)
    onChange(newValue)
  }

  const displayError = error || validationError
  const displaySuccess = success && !displayError

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={inputType}
          value={internalValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-colors
            ${displayError 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : displaySuccess 
                ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          `}
        />
        
        {/* 密码显示/隐藏按钮 */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        
        {/* 验证状态图标 */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValidating && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          )}
          {!isValidating && displayError && (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          {!isValidating && displaySuccess && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
      </div>
      
      {/* 帮助文本 */}
      {helpText && !displayError && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
      
      {/* 错误信息 */}
      {displayError && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}
      
      {/* 成功信息 */}
      {displaySuccess && (
        <div className="flex items-center text-sm text-green-600">
          <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}
    </div>
  )
}
