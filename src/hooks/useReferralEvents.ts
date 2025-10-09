import { useState, useEffect } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { CURRENT_NETWORK } from '../constants/contracts'
import { ARRIVE_ON_TIME_ABI } from '../constants/abis'

export interface ReferralEvent {
  address: string
  amount: string
  timestamp: number
  type: 'stake' | 'unstake' | 'claim'
}

export function useReferralEvents(referralAddresses: string[]) {
  const [events, setEvents] = useState<ReferralEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 监听质押事件
  useWatchContractEvent({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    eventName: 'Staked',
    onLogs(logs) {
      console.log('Staked events:', logs)
      
      const newEvents: ReferralEvent[] = logs.map(log => ({
        address: log.args.user as string,
        amount: log.args.amount?.toString() || '0',
        timestamp: Date.now(),
        type: 'stake'
      }))
      
      setEvents(prev => [...prev, ...newEvents])
    }
  })

  // 监听解押事件
  useWatchContractEvent({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    eventName: 'Unstaked',
    onLogs(logs) {
      console.log('Unstaked events:', logs)
      
      const newEvents: ReferralEvent[] = logs.map(log => ({
        address: log.args.user as string,
        amount: log.args.amount?.toString() || '0',
        timestamp: Date.now(),
        type: 'unstake'
      }))
      
      setEvents(prev => [...prev, ...newEvents])
    }
  })

  // 监听奖励领取事件
  useWatchContractEvent({
    address: CURRENT_NETWORK.ArriveOnTime,
    abi: ARRIVE_ON_TIME_ABI,
    eventName: 'RewardsClaimed',
    onLogs(logs) {
      console.log('RewardsClaimed events:', logs)
      
      const newEvents: ReferralEvent[] = logs.map(log => ({
        address: log.args.user as string,
        amount: log.args.amount?.toString() || '0',
        timestamp: Date.now(),
        type: 'claim'
      }))
      
      setEvents(prev => [...prev, ...newEvents])
    }
  })

  // 过滤出推荐人的事件
  const referralEvents = events.filter(event => 
    referralAddresses.includes(event.address)
  )

  return {
    events: referralEvents,
    isLoading,
    allEvents: events
  }
}
