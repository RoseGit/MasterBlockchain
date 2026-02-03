'use client'

import { useState, useEffect } from 'react'
import { useMetaMask } from '../hooks/useMetaMask'
import { FileUploader } from '../components/FileUploader'
import { DocumentSigner } from '../components/DocumentSigner'
import { DocumentVerifier } from '../components/DocumentVerifier'
import { DocumentHistory } from '../components/DocumentHistory'
import { FileText, Shield, CheckCircle, History, Wallet, AlertCircle } from 'lucide-react'

export default function Home() {
  const { account, isConnected, connectExternal, disconnect, isConnecting, error, hasExternalWallet } = useMetaMask()
  const [activeTab, setActiveTab] = useState<'upload' | 'verify' | 'history'>('upload')
  const [documentHash, setDocumentHash] = useState<string>('')

  // Debug info
  useEffect(() => {
    console.log('MetaMask Status:', { account, isConnected, isConnecting, error })
  }, [account, isConnected, isConnecting, error])

  const tabs = [
    { id: 'upload', label: 'Upload & Sign', icon: FileText, description: 'Upload files and sign them with your wallet' },
    { id: 'verify', label: 'Verify', icon: Shield, description: 'Verify document authenticity' },
    { id: 'history', label: 'History', icon: History, description: 'View document history' }
  ]

  const handleFileHash = (hash: string) => {
    setDocumentHash(hash)
  }

  const handleSigned = (signature: string, timestamp: number) => {
    console.log('Document signed:', { signature, timestamp })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Document Registry
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Blockchain Document Verification
                </p>
              </div>
            </div>
            
            {/* Wallet Connection */}
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={disconnect}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div>
                  {hasExternalWallet ? (
                    <button
                      onClick={connectExternal}
                      disabled={isConnecting}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                    </button>
                  ) : (
                    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Please install a wallet extension (MetaMask, Coinbase Wallet, etc.)
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Secure Document Verification
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Store, sign, and verify document hashes on the blockchain with complete transparency and security.
          </p>
        </div>

        {/* Debug Info
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-8 border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Debug Info:</h3>
            <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
              <div>Account: {account || 'None'}</div>
              <div>Connecting: {isConnecting ? 'Yes' : 'No'}</div>
              <div>Error: {error || 'None'}</div>
              <div>Document Hash: {documentHash || 'None'}</div>
              <div>Contract Address: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'Not configured'}</div>
            </div>
          </div>
        )} */}

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-3 py-6 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div>{tab.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                        {tab.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {!isConnected ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Connect Your Wallet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Please connect your wallet to access the dApp features and start verifying documents.
              </p>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4 border border-red-200 dark:border-red-800 max-w-md mx-auto">
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
              <div className="max-w-md mx-auto">
                {hasExternalWallet ? (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Connect Wallet</h4>
                    <button
                      onClick={connectExternal}
                      disabled={isConnecting}
                      className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <Wallet className="w-5 h-5" />
                      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                      Works with MetaMask, Coinbase Wallet, and other compatible wallets
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm text-center">
                      No wallet extension detected. Please install a wallet extension like MetaMask or Coinbase Wallet to continue.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'upload' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Upload & Sign Document
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upload a file, generate its hash, and sign it with your wallet
                    </p>
                  </div>
                  <FileUploader onFileHash={handleFileHash} />
                  <DocumentSigner documentHash={documentHash} onSigned={handleSigned} />
                </div>
              )}

              {activeTab === 'verify' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Verify Document
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Verify a document's authenticity by providing the file and signer address
                    </p>
                  </div>
                  <DocumentVerifier />
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Document History
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      View all documents stored in the registry
                    </p>
                  </div>
                  <DocumentHistory />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}