import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Declaración de tipos para chrome
declare const chrome: {
  runtime: {
    sendMessage: (message: unknown, callback?: (response: { result?: unknown; error?: string }) => void) => void;
    lastError?: { message: string };
  };
  storage: {
    local: {
      get: (keys: string | string[], callback: (result: Record<string, unknown>) => void) => void;
      set: (items: Record<string, unknown>, callback?: () => void) => void;
      remove: (keys: string | string[], callback?: () => void) => void;
    };
  };
};

// Función auxiliar para enviar mensajes RPC al background script
async function sendRPCToBackground(method: string, params?: unknown[]): Promise<unknown> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: 'CODECRYPTO_RPC',
        method: method,
        params: params || []
      },
      (response: { result?: unknown; error?: string }) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
          return
        }
        if (response.error) {
          reject(new Error(response.error))
          return
        }
        resolve(response.result)
      }
    )
  })
}

interface Log {
  type: 'call' | 'event' | 'error' | 'message'
  timestamp: string
  content: string
}

interface TransferSectionProps {
  accounts: string[]
  currentAccountIndex: number
  onTransfer: (toAccountIndex: number, amount: string) => Promise<string | undefined>
}

function TransferSection({ accounts, currentAccountIndex, onTransfer }: TransferSectionProps) {
  const [toAccount, setToAccount] = useState(0)
  const [amount, setAmount] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [txHash, setTxHash] = useState('')

  // Actualizar cuenta destino cuando cambia la cuenta actual
  useEffect(() => {
    // Seleccionar la siguiente cuenta por defecto
    const nextAccount = (currentAccountIndex + 1) % accounts.length
    setToAccount(nextAccount)
  }, [currentAccountIndex, accounts.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor ingresa un monto válido')
      return
    }

    if (toAccount === currentAccountIndex) {
      alert('No puedes transferir a la misma cuenta')
      return
    }

    setIsTransferring(true)
    setTxHash('')

    try {
      const hash = await onTransfer(toAccount, amount)
      if (hash) {
        setTxHash(hash)
        setAmount('')
      }
    } catch (error) {
      const err = error as Error
      alert(`Error en transferencia: ${err.message}`)
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <div className="info-section transfer-section">
      <h3>💸 Transferir entre Cuentas</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cuenta Destino:</label>
          <select 
            value={toAccount} 
            onChange={(e) => setToAccount(parseInt(e.target.value))}
            disabled={isTransferring}
          >
            {accounts.map((acc, i) => (
              <option 
                key={i} 
                value={i}
                disabled={i === currentAccountIndex}
              >
                Cuenta {i}: {acc.slice(0, 6)}...{acc.slice(-4)}
                {i === currentAccountIndex ? ' (actual)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Monto (ETH):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            disabled={isTransferring}
          />
        </div>

        <button 
          type="submit" 
          className="transfer-button"
          disabled={isTransferring}
        >
          {isTransferring ? '⏳ Transfiriendo...' : '💸 Transferir'}
        </button>

        {txHash && (
          <div className="tx-success">
            ✅ Transacción exitosa!
            <br />
            <small>{txHash.slice(0, 20)}...{txHash.slice(-20)}</small>
          </div>
        )}
      </form>
    </div>
  )
}

function App() {
  const [mnemonic, setMnemonic] = useState('')
  const [isWalletLoaded, setIsWalletLoaded] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0)
  const [balance, setBalance] = useState('0')
  const [chainId, setChainId] = useState('0x7a69') // 31337 en hex (Hardhat)
  const [logs, setLogs] = useState<Log[]>([])
  const [isLoading, setIsLoading] = useState(true)

  console.log('📱 App renderizado - Estado actual:', { 
    isWalletLoaded, 
    accountsCount: accounts.length, 
    mnemonicLength: mnemonic.length 
  })

  const addLog = useCallback((type: Log['type'], content: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { type, timestamp, content }])
  }, [])

  // Función para cargar wallet desde mnemonic (delega al background script)
  const loadWalletFromMnemonic = useCallback(async (mnemonicPhrase: string, savedChainId?: string, savedAccountIndex?: number) => {
    console.log('🚀 loadWalletFromMnemonic iniciado')
    console.log('Mnemonic recibido:', mnemonicPhrase)
    console.log('Saved account index:', savedAccountIndex)
    console.log('Saved chain ID:', savedChainId)
    
    try {
      const words = mnemonicPhrase.trim().split(/\s+/)
      console.log('Palabras detectadas:', words.length)
      
      if (words.length !== 12) {
        console.error('❌ Error: No son 12 palabras')
        addLog('error', 'La frase debe tener exactamente 12 palabras')
        setIsLoading(false)
        return
      }

      console.log('✅ Enviando mnemonic al background para derivar cuentas...')
      
      // Enviar al background script para validar y derivar cuentas
      const derivedAccounts = await sendRPCToBackground('wallet_deriveAccounts', [mnemonicPhrase.trim(), 5]) as string[]
      
      console.log('✅ Cuentas derivadas recibidas:', derivedAccounts)
      
      // Restaurar cuenta guardada si existe
      const accountIndex = savedAccountIndex !== undefined ? savedAccountIndex : 0
      
      // Actualizar estado
      setAccounts(derivedAccounts)
      setCurrentAccountIndex(accountIndex)
      setIsWalletLoaded(true)
      
      if (savedChainId) {
        setChainId(savedChainId)
      }
      
      addLog('event', `Wallet cargado. Cuenta actual: ${derivedAccounts[accountIndex]}`)
      setIsLoading(false)

      console.log('✅ Wallet cargado exitosamente')
      
      // Guardar en localStorage para compatibilidad (modo desarrollo)
      localStorage.setItem('codecrypto_wallet_loaded', 'true')
      localStorage.setItem('codecrypto_accounts', JSON.stringify(derivedAccounts))
      localStorage.setItem('codecrypto_current_account', accountIndex.toString())
      localStorage.setItem('codecrypto_chain_id', savedChainId || chainId)
      
      // También actualizar chrome.storage con las cuentas si no están
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        chrome.storage.local.set({
          codecrypto_accounts: derivedAccounts
        }, () => {
          console.log('✅ Cuentas actualizadas en chrome.storage')
        })
      }
      
      // Emitir evento personalizado para notificar a otras pestañas
      window.dispatchEvent(new CustomEvent('codecrypto_wallet_ready', {
        detail: { accounts: derivedAccounts }
      }))
    } catch (error) {
      const err = error as Error
      console.error('❌ Error al cargar wallet:', err)
      console.error('Stack:', err.stack)
      addLog('error', `Error al cargar wallet: ${err.message}`)
      setIsLoading(false)
    }
  }, [addLog, chainId])

  // Cargar wallet desde chrome.storage al iniciar
  useEffect(() => {
    const loadWalletFromStorage = async () => {
      try {
        console.log('🔍 Verificando si hay wallet guardada...')
        
        // Usar chrome.storage si está disponible, sino localStorage
        if (typeof chrome !== 'undefined' && chrome.storage?.local) {
          // Chrome storage (extensión)
          chrome.storage.local.get(['codecrypto_mnemonic', 'codecrypto_accounts', 'codecrypto_current_account', 'codecrypto_chain_id'], (result: Record<string, unknown>) => {
            console.log('📦 Datos de storage:', result)
            
            if (result.codecrypto_mnemonic) {
              console.log('✅ Wallet encontrada en storage, cargando...')
              
              // Cargar wallet desde el mnemonic guardado
              const savedMnemonic = result.codecrypto_mnemonic as string
              const savedAccountIndex = parseInt((result.codecrypto_current_account as string) || '0')
              const savedChainId = (result.codecrypto_chain_id as string) || '0x7a69'
              
              setMnemonic(savedMnemonic)
              setChainId(savedChainId)
              
              // Recrear wallets
              loadWalletFromMnemonic(savedMnemonic, savedChainId, savedAccountIndex)
            } else {
              console.log('ℹ️ No hay wallet guardada, mostrando formulario')
              setIsLoading(false)
            }
          })
        } else {
          // Fallback a localStorage (desarrollo)
          const savedMnemonic = localStorage.getItem('codecrypto_mnemonic')
          
          if (savedMnemonic) {
            console.log('✅ Wallet encontrada en localStorage, cargando...')
            setMnemonic(savedMnemonic)
            
            const savedAccountIndex = parseInt(localStorage.getItem('codecrypto_current_account') || '0')
            const savedChainId = localStorage.getItem('codecrypto_chain_id') || '0x7a69'
            setChainId(savedChainId)
            
            loadWalletFromMnemonic(savedMnemonic, savedChainId, savedAccountIndex)
          } else {
            console.log('ℹ️ No hay wallet guardada, mostrando formulario')
            setIsLoading(false)
          }
        }
      } catch (error) {
        const err = error as Error
        console.error('❌ Error cargando desde storage:', err)
        setIsLoading(false)
      }
    }

    loadWalletFromStorage()
  }, [loadWalletFromMnemonic])

  // Handler para el botón de cargar wallet (primera vez)
  const handleLoadWallet = async () => {
    console.log('🔘 Botón "Cargar Wallet" clickeado')
    
    const words = mnemonic.trim().split(/\s+/)
    if (words.length !== 12) {
      addLog('error', 'La frase debe tener exactamente 12 palabras')
      return
    }

    try {
      // Validar y derivar cuentas usando el background script
      console.log('🔑 Validando y derivando cuentas...')
      
      const derivedAccounts = await sendRPCToBackground('wallet_deriveAccounts', [mnemonic.trim(), 5]) as string[]
      
      console.log('✅ Cuentas derivadas:', derivedAccounts)
      
      // Guardar en chrome.storage con las cuentas derivadas
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        console.log('💾 Guardando en chrome.storage...')
        chrome.storage.local.set({
          codecrypto_mnemonic: mnemonic.trim(),
          codecrypto_accounts: derivedAccounts,
          codecrypto_current_account: '0',
          codecrypto_chain_id: chainId
        }, () => {
          console.log('✅ Guardado en chrome.storage')
          loadWalletFromMnemonic(mnemonic.trim())
        })
      } else {
        console.log('💾 Guardando en localStorage...')
        localStorage.setItem('codecrypto_mnemonic', mnemonic.trim())
        localStorage.setItem('codecrypto_accounts', JSON.stringify(derivedAccounts))
        loadWalletFromMnemonic(mnemonic.trim())
      }
    } catch (error) {
      const err = error as Error
      console.error('❌ Error validando mnemonic:', err)
      addLog('error', `Error: ${err.message}`)
    }
  }

  // El proveedor ya está inyectado desde inject.js
  // No necesitamos inyectar desde el popup

  // Función para actualizar balance (delega al background script)
  const updateBalance = useCallback(async () => {
    if (!isWalletLoaded || !accounts.length) return
    
    try {
      const balanceHex = await sendRPCToBackground('eth_getBalance', [accounts[currentAccountIndex], 'latest']) as string
      // Convertir de hex a decimal y luego a ETH
      const balanceWei = BigInt(balanceHex)
      const balanceEth = Number(balanceWei) / 1e18
      setBalance(balanceEth.toFixed(6))
    } catch (error) {
      // Silenciar errores de polling
      console.error('Error actualizando balance:', error)
    }
  }, [isWalletLoaded, accounts, currentAccountIndex])

  // Polling de balance cada 5 segundos
  useEffect(() => {
    if (!isWalletLoaded || !accounts.length) return

    updateBalance()
    const interval = setInterval(updateBalance, 5000)

    return () => clearInterval(interval)
  }, [isWalletLoaded, accounts, currentAccountIndex, chainId, updateBalance])

  // Cambiar cuenta
  const changeAccount = (index: number) => {
    console.log('🔄 Cambiando a cuenta:', index)
    console.log('Total cuentas disponibles:', accounts.length)
    console.log('Nueva dirección:', accounts[index])
    
    if (index >= accounts.length || index < 0) {
      console.error('❌ Índice de cuenta inválido:', index)
      addLog('error', 'Índice de cuenta inválido')
      return
    }
    
    // Actualizar índice de cuenta actual
    setCurrentAccountIndex(index)
    console.log('✅ Cuenta actualizada a índice:', index)
    addLog('event', `Cuenta cambiada a: ${accounts[index]}`)
    
    // Guardar en storage
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({ codecrypto_current_account: index.toString() }, () => {
        console.log('✅ Cuenta guardada en chrome.storage:', index)
        
        // Emitir evento a través del background script
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({
            type: 'ACCOUNT_CHANGED',
            accountIndex: index,
            account: accounts[index]
          })
        }
      })
    } else {
      localStorage.setItem('codecrypto_current_account', index.toString())
    }
  }

  // Cambiar red
  const changeChain = (newChainId: string) => {
    console.log('🌐 Cambiando a red:', newChainId)
    
    // Actualizar estado local
    setChainId(newChainId)
    addLog('event', `Red cambiada a chainId: ${newChainId}`)
    
    // Guardar en storage
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({ codecrypto_chain_id: newChainId }, () => {
        console.log('✅ Red guardada en chrome.storage:', newChainId)
        
        // Emitir evento a través del background script
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({
            type: 'CHAIN_CHANGED',
            chainId: newChainId
          })
        }
      })
    } else {
      localStorage.setItem('codecrypto_chain_id', newChainId)
    }
  }

  // Resetear wallet
  const resetWallet = () => {
    console.log('🔄 Reseteando wallet...')
    addLog('event', 'Reseteando wallet...')
    
    // Limpiar chrome.storage
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      console.log('🗑️ Limpiando chrome.storage...')
      chrome.storage.local.remove(['codecrypto_mnemonic', 'codecrypto_accounts', 'codecrypto_current_account', 'codecrypto_chain_id'], () => {
        console.log('✅ Chrome storage limpiado')
        addLog('event', 'Datos de extensión limpiados')
      })
    } else {
      console.log('🗑️ Limpiando localStorage...')
      localStorage.removeItem('codecrypto_mnemonic')
      localStorage.removeItem('codecrypto_wallet_loaded')
      localStorage.removeItem('codecrypto_accounts')
      localStorage.removeItem('codecrypto_current_account')
      localStorage.removeItem('codecrypto_chain_id')
    }
    
    // Resetear estado (mantener logs para ver el historial)
    setIsWalletLoaded(false)
    setAccounts([])
    setCurrentAccountIndex(0)
    setBalance('0')
    setChainId('0x7a69')
    setMnemonic('')
    
    console.log('✅ Wallet reseteada - Volviendo a pantalla de entrada')
    addLog('event', '✅ Wallet reseteada - Ingresa un nuevo mnemonic')
  }

  // Transferir entre cuentas (delega al background script)
  const handleTransfer = async (toAccountIndex: number, amount: string) => {
    if (!isWalletLoaded) return

    try {
      console.log('💸 Iniciando transferencia...')
      addLog('message', `Transferencia: ${amount} ETH a Cuenta ${toAccountIndex}`)

      const toAddress = accounts[toAccountIndex]

      console.log('From:', accounts[currentAccountIndex])
      console.log('To:', toAddress)
      console.log('Amount:', amount, 'ETH')

      // Convertir amount a wei (hex)
      const valueWei = BigInt(parseFloat(amount) * 1e18)
      const valueHex = '0x' + valueWei.toString(16)

      // Preparar transacción
      const tx = {
        to: toAddress,
        value: valueHex,
        from: accounts[currentAccountIndex]
      }

      // Enviar transacción a través del background script
      // El background script manejará la aprobación del usuario y la firma
      const txHash = await sendRPCToBackground('eth_sendTransaction', [tx]) as string
      addLog('event', `Transacción enviada: ${txHash}`)
      
      console.log('✅ Transacción enviada:', txHash)
      
      // Esperar un poco antes de actualizar el balance
      addLog('event', 'Esperando confirmación...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Actualizar balance
      await updateBalance()

      addLog('event', `✅ Transacción confirmada`)

      return txHash
    } catch (error) {
      const err = error as Error
      console.error('❌ Error en transferencia:', err)
      addLog('error', `Error en transferencia: ${err.message}`)
      throw err
    }
  }

  return (
    <div className="app">
      <h1>CodeCrypto Wallet Extension</h1>

      {isLoading ? (
        <div className="wallet-setup-container">
          <div className="wallet-setup">
            <h2>⏳ Cargando wallet...</h2>
            <p style={{ textAlign: 'center', color: '#888' }}>
              Verificando si hay una wallet guardada
            </p>
          </div>
        </div>
      ) : !isWalletLoaded ? (
        <div className="wallet-setup-container">
          <div className="wallet-setup">
            <h2>Ingresa tu frase de recuperación (12 palabras)</h2>
            <textarea
              value={mnemonic}
              onChange={(e) => {
                console.log('✏️ Mnemonic cambiado:', e.target.value)
                setMnemonic(e.target.value)
              }}
              placeholder="palabra1 palabra2 palabra3 ..."
              rows={3}
            />
            <button onClick={handleLoadWallet}>Cargar Wallet</button>
            
            <div className="mnemonic-hint">
              <p>💡 <strong>Mnemonic de prueba:</strong></p>
              <code 
                onClick={() => {
                  const testMnemonic = 'test test test test test test test test test test test junk'
                  setMnemonic(testMnemonic)
                  console.log('📋 Mnemonic de prueba copiado al campo')
                  addLog('event', 'Mnemonic de prueba cargado')
                }}
                title="Click para usar este mnemonic"
              >
                test test test test test test test test test test test junk
              </code>
            </div>
          </div>
          
          {logs.length > 0 && (
            <div className="logs-section">
              <h3>Historial</h3>
              <div className="logs">
                {logs.map((log, i) => (
                  <div key={i} className={`log log-${log.type}`}>
                    <span className="log-timestamp">[{log.timestamp}]</span>
                    <span className="log-type">[{log.type.toUpperCase()}]</span>
                    <span className="log-content">{log.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="wallet-info">
          <div className="wallet-header">
            <button className="reset-button" onClick={resetWallet}>
              🔄 Reset Wallet
            </button>
          </div>
          
          <div className="info-section">
            <h3>Cuenta Actual</h3>
            <p className="address">{accounts[currentAccountIndex]}</p>
            <p className="balance">Balance: {balance} ETH</p>
            
            <div className="account-selector">
              <label>Cambiar cuenta: </label>
              <select 
                value={currentAccountIndex} 
                onChange={(e) => changeAccount(parseInt(e.target.value))}
              >
                {accounts.map((acc, i) => (
                  <option key={i} value={i}>
                    Cuenta {i}: {acc.slice(0, 6)}...{acc.slice(-4)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="info-section">
            <h3>Red</h3>
            <p>Chain ID: {chainId} ({parseInt(chainId, 16)})</p>
            <div className="chain-buttons">
              <button 
                onClick={() => changeChain('0x7a69')}
                disabled={chainId === '0x7a69'}
              >
                Localhost (31337)
              </button>
              <button 
                onClick={() => changeChain('0xaa36a7')}
                disabled={chainId === '0xaa36a7'}
              >
                Sepolia (11155111)
              </button>
            </div>
          </div>

          <TransferSection 
            accounts={accounts}
            currentAccountIndex={currentAccountIndex}
            onTransfer={handleTransfer}
          />

          <div className="logs-section">
            <h3>Logs de Interacción</h3>
            <div className="logs">
              {logs.map((log, i) => (
                <div key={i} className={`log log-${log.type}`}>
                  <span className="log-timestamp">[{log.timestamp}]</span>
                  <span className="log-type">[{log.type.toUpperCase()}]</span>
                  <span className="log-content">{log.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    
      </div>
  )
}

export default App
