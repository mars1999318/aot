import { CONTRACTS } from '../constants/contracts'
import { ARRIVE_ON_TIME_ABI, AOT_TOKEN_ABI } from '../constants/abis'

export function useArriveOnTimeContract() {
  return {
    address: CONTRACTS.BSC.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
  }
}

export function useAOTTokenContract() {
  return {
    address: CONTRACTS.BSC.AOTToken,
    abi: AOT_TOKEN_ABI,
  }
}