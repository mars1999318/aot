import { useCallback } from 'react'
import { useToast } from '../contexts/ToastContext'

export interface ErrorInfo {
  code?: string | number
  message: string
  details?: string
  action?: string
}

export function useErrorHandler() {
  const { showError, showWarning, showInfo } = useToast()

  const handleError = useCallback((error: Error | ErrorInfo | unknown, context?: string) => {
    console.error('Error occurred:', error, 'Context:', context)

    let errorInfo: ErrorInfo

    if (error instanceof Error) {
      errorInfo = {
        message: error.message,
        details: error.stack
      }
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorInfo = error as ErrorInfo
    } else {
      errorInfo = {
        message: 'An unexpected error occurred',
        details: String(error)
      }
    }

    // 根据错误类型显示不同的提示
    if (errorInfo.code === 'NETWORK_ERROR' || errorInfo.message.includes('network')) {
      showError(
        '网络连接错误',
        '无法连接到区块链网络，请检查您的网络连接或稍后重试。',
        10000
      )
    } else if (errorInfo.code === 'USER_REJECTED' || errorInfo.message.includes('User rejected')) {
      showWarning(
        '交易被取消',
        '您取消了交易，没有进行任何操作。',
        5000
      )
    } else if (errorInfo.code === 'INSUFFICIENT_FUNDS' || errorInfo.message.includes('insufficient funds')) {
      showError(
        '余额不足',
        '您的账户余额不足以完成此交易，请检查您的BNB余额。',
        8000
      )
    } else if (errorInfo.code === 'GAS_ESTIMATION_FAILED' || errorInfo.message.includes('gas')) {
      showError(
        'Gas估算失败',
        '无法估算交易Gas费用，请检查合约状态或稍后重试。',
        8000
      )
    } else if (errorInfo.code === 'CONTRACT_ERROR' || errorInfo.message.includes('contract')) {
      showError(
        '合约交互错误',
        '与智能合约交互时发生错误，请检查合约状态或稍后重试。',
        8000
      )
    } else if (errorInfo.message.includes('timeout')) {
      showWarning(
        '请求超时',
        '操作超时，请检查网络连接或稍后重试。',
        6000
      )
    } else if (errorInfo.message.includes('Transaction does not have a transaction hash') || 
               errorInfo.message.includes('RPC Error')) {
      showError(
        '交易提交失败',
        '交易未能成功提交到区块链，请检查网络连接、Gas费用设置，或稍后重试。',
        10000
      )
    } else if (errorInfo.message.includes('Cannot destructure property')) {
      showError(
        '交易参数错误',
        '交易参数不完整，可能是gas设置问题。请刷新页面后重试。',
        8000
      )
    } else if (errorInfo.message.includes('gasLimit') && errorInfo.message.includes('null')) {
      showError(
        'Gas估算失败',
        '无法获取Gas限制，可能是网络连接问题。请检查网络连接或切换RPC节点后重试。',
        10000
      )
    } else if (errorInfo.message.includes('MetaMask')) {
      showError(
        'MetaMask错误',
        'MetaMask钱包出现问题，请检查钱包状态或重新连接。',
        8000
      )
    } else {
      showError(
        '操作失败',
        errorInfo.message || '发生未知错误，请稍后重试。',
        8000
      )
    }
  }, [showError, showWarning])

  const handleNetworkError = useCallback((error: unknown) => {
    handleError({
      code: 'NETWORK_ERROR',
      message: 'Network connection failed',
      details: String(error)
    }, 'Network')
  }, [handleError])

  const handleContractError = useCallback((error: unknown) => {
    handleError({
      code: 'CONTRACT_ERROR',
      message: 'Contract interaction failed',
      details: String(error)
    }, 'Contract')
  }, [handleError])

  const handleTransactionError = useCallback((error: unknown) => {
    handleError({
      code: 'TRANSACTION_ERROR',
      message: 'Transaction failed',
      details: String(error)
    }, 'Transaction')
  }, [handleError])

  const handleRPCError = useCallback((error: unknown) => {
    handleError({
      code: 'RPC_ERROR',
      message: 'RPC connection failed',
      details: String(error)
    }, 'RPC')
  }, [handleError])

  return {
    handleError,
    handleNetworkError,
    handleContractError,
    handleTransactionError,
    handleRPCError
  }
}
