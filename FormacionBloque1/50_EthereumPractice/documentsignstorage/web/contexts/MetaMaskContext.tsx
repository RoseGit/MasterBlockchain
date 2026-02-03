'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'

// RPC URL from environment variable, default to Anvil port 55556
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'http://localhost:55556'
console.log('RPC_URL', RPC_URL)

interface MetaMaskContextType {
  account: string | null
  isConnected: boolean
  isConnecting: boolean
  provider: ethers.Provider | null
  error: string | null
  connectExternal: () => Promise<void>
  disconnect: () => void
  signMessage: (message: string) => Promise<string>
  getSigner: () => Promise<ethers.Signer>
  hasExternalWallet: boolean
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined)

export function MetaMaskProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState<ethers.Provider | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasExternalWallet, setHasExternalWallet] = useState(false)

  // Check for external wallet on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ethereum = (window as any).ethereum
      if (ethereum) {
        setHasExternalWallet(true)
        console.log('🌐 External wallet detected:', ethereum.isMetaMask ? 'MetaMask' : 'Other')
      }
    }
  }, [])

  // Debug logging for state changes
  useEffect(() => {
    console.log('🔄 MetaMask Context state changed:', {
      account,
      isConnected,
      isConnecting,
      hasProvider: !!provider,
      error
    })
  }, [account, isConnected, isConnecting, provider, error])

  const connectExternal = async () => {
    console.log('🔌 Connecting to external wallet...')
    
    try {
      setIsConnecting(true)
      setError(null)
      
      const ethereum = (window as any).ethereum
      if (!ethereum) {
        throw new Error('No external wallet found. Please install MetaMask or another compatible wallet.')
      }

      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const accountAddress = accounts[0]
      console.log('📝 External wallet account:', accountAddress)
      
      // Create provider from external wallet
      const externalProvider = new ethers.BrowserProvider(ethereum)
      
      // Get network info
      const network = await externalProvider.getNetwork()
      console.log('🌐 Network:', network)
      
      // Update all states
      setAccount(accountAddress)
      setProvider(externalProvider)
      setIsConnected(true)
      setIsConnecting(false)
      
      console.log(`✅ Connected to external wallet: ${accountAddress}`)
      
      // Listen for account changes
      ethereum.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length > 0) {
          setAccount(newAccounts[0])
        } else {
          disconnect()
        }
      })
      
      // Listen for chain changes
      ethereum.on('chainChanged', () => {
        window.location.reload()
      })
      
    } catch (error: any) {
      console.error('❌ External wallet connection error:', error)
      setError(error.message || 'Failed to connect to external wallet')
      setIsConnecting(false)
      setIsConnected(false)
      setAccount(null)
    }
  }

  const disconnect = () => {
    console.log('🔌 Disconnecting wallet')
    setAccount(null)
    setIsConnected(false)
    setError(null)
  }

  const signMessage = async (message: string) => {
    console.log('✍️ signMessage called:', { 
      account, 
      isConnected,
      message: message.substring(0, 50) + '...'
    })
    
    if (!account || !isConnected || !provider) {
      console.error('❌ Cannot sign - not connected:', { 
        account,
        isConnected,
        hasProvider: !!provider
      })
      throw new Error('Not connected to wallet')
    }

    try {
      const signer = await getSigner()
      console.log('📝 Calling signer.signMessage...')
      const signature = await signer.signMessage(message)
      console.log('✅ Signature generated successfully:', signature.substring(0, 20) + '...')
      return signature
    } catch (error: any) {
      console.error('❌ Error in signMessage:', error)
      throw new Error(error.message || 'Failed to sign message')
    }
  }

  const getSigner = async () => {
    if (!account || !isConnected || !provider) {
      throw new Error('Not connected to wallet')
    }
    
    // For external wallets, get signer from provider
    // BrowserProvider has getSigner method
    if (provider instanceof ethers.BrowserProvider) {
      return await provider.getSigner()
    }
    // Fallback: try to cast
    const browserProvider = provider as ethers.BrowserProvider
    return await browserProvider.getSigner()
  }

  const value: MetaMaskContextType = {
    account,
    isConnected,
    isConnecting,
    provider,
    error,
    connectExternal,
    disconnect,
    signMessage,
    getSigner,
    hasExternalWallet
  }

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export function useMetaMask() {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider')
  }
  return context
}

