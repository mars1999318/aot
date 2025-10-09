import { useState, useCallback } from 'react'
import { ValidationResult } from '../utils/validation'

export interface FormField {
  name: string
  value: string
  validation?: (value: string) => ValidationResult
  required?: boolean
}

export interface FormState {
  values: Record<string, string>
  errors: Record<string, string>
  isValid: boolean
  isSubmitting: boolean
}

export function useFormValidation(initialFields: FormField[]) {
  const [formState, setFormState] = useState<FormState>({
    values: initialFields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}),
    errors: {},
    isValid: false,
    isSubmitting: false
  })

  const validateField = useCallback((name: string, value: string, field: FormField): string | undefined => {
    if (field.required && !value.trim()) {
      return '此字段为必填项'
    }

    if (field.validation && value.trim()) {
      const result = field.validation(value)
      return result.isValid ? undefined : result.message
    }

    return undefined
  }, [])

  const validateForm = useCallback((fields: FormField[]): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {}
    let isValid = true

    fields.forEach(field => {
      const value = formState.values[field.name] || ''
      const error = validateField(field.name, value, field)
      
      if (error) {
        errors[field.name] = error
        isValid = false
      }
    })

    return { isValid, errors }
  }, [formState.values, validateField])

  const setFieldValue = useCallback((name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: '' } // 清除该字段的错误
    }))
  }, [])

  const setFieldError = useCallback((name: string, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error }
    }))
  }, [])

  const clearFieldError = useCallback((name: string) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors }
      delete newErrors[name]
      return { ...prev, errors: newErrors }
    })
  }, [])

  const clearAllErrors = useCallback(() => {
    setFormState(prev => ({ ...prev, errors: {} }))
  }, [])

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({ ...prev, isSubmitting }))
  }, [])

  const resetForm = useCallback((newValues?: Record<string, string>) => {
    setFormState({
      values: newValues || initialFields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}),
      errors: {},
      isValid: false,
      isSubmitting: false
    })
  }, [initialFields])

  const getFieldValue = useCallback((name: string): string => {
    return formState.values[name] || ''
  }, [formState.values])

  const getFieldError = useCallback((name: string): string | undefined => {
    return formState.errors[name]
  }, [formState.errors])

  const hasFieldError = useCallback((name: string): boolean => {
    return !!formState.errors[name]
  }, [formState.errors])

  const isFieldValid = useCallback((name: string): boolean => {
    return !formState.errors[name] && !!formState.values[name]
  }, [formState.errors, formState.values])

  return {
    formState,
    setFieldValue,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setSubmitting,
    resetForm,
    validateForm,
    getFieldValue,
    getFieldError,
    hasFieldError,
    isFieldValid
  }
}
