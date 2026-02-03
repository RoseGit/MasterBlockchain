import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'

interface ConnectData {
  requestId: number
  origin: string
  accounts: string[]
  currentAccountIndex: number
}

interface AccountWithBalance {
  address: string
  balance: string
  index: number
}

function Connect() {
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState<AccountWithBalance[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [data, setData] = useState<ConnectData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingBalances, setLoadingBalances] = useState(true)

  useEffect(() => {
    loadConnectionRequest()
  }, [])

  const loadConnectionRequest = async () => {
    try {
      const storage = (window as any).chrome?.storage?.local
      if (!storage) {
        throw new Error('Chrome storage no disponible')
      }

      // Obtener datos de la solicitud de conexión
      const result: any = await new Promise((resolve) => {
        storage.get(['codecrypto_connect_request', 'codecrypto_accounts', 'codecrypto_current_account', 'codecrypto_chain_id'], resolve)
      })

      if (!result.codecrypto_connect_request) {
        throw new Error('No hay solicitud de conexión pendiente')
      }

      const connectRequest = result.codecrypto_connect_request
      const accountsList = result.codecrypto_accounts || []
      const currentIdx = parseInt(result.codecrypto_current_account || '0')
      const chainId = result.codecrypto_chain_id || '0x7a69'

      setData(connectRequest)
      setSelectedIndex(currentIdx)
      setLoading(false)

      // Cargar balances de las cuentas
      loadBalances(accountsList, chainId)

    } catch (err: any) {
      console.error('Error cargando solicitud:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  const loadBalances = async (accountsList: string[], chainId: string) => {
    try {
      const rpcUrl = chainId === '0x7a69' 
        ? 'http://localhost:8545' 
        : 'https://rpc.sepolia.org'
      
      const provider = new ethers.JsonRpcProvider(rpcUrl)

      const accountsWithBalance: AccountWithBalance[] = []

      for (let i = 0; i < accountsList.length; i++) {
        try {
          const balance = await provider.getBalance(accountsList[i])
          accountsWithBalance.push({
            address: accountsList[i],
            balance: ethers.formatEther(balance),
            index: i
          })
        } catch {
          accountsWithBalance.push({
            address: accountsList[i],
            balance: '0',
            index: i
          })
        }
      }

      setAccounts(accountsWithBalance)
      setLoadingBalances(false)
    } catch (err) {
      console.error('Error cargando balances:', err)
      // Continuar sin balances
      const accountsWithoutBalance = (accountsList || []).map((addr: string, i: number) => ({
        address: addr,
        balance: '?',
        index: i
      }))
      setAccounts(accountsWithoutBalance)
      setLoadingBalances(false)
    }
  }

  const handleConnect = async () => {
    if (!data) return

    try {
      setLoading(true)

      // Actualizar cuenta actual en storage
      const storage = (window as any).chrome?.storage?.local
      await new Promise<void>((resolve) => {
        storage.set({ codecrypto_current_account: selectedIndex.toString() }, resolve)
      })

      // Enviar respuesta al background
      const chromeRuntime = (window as any).chrome?.runtime
      if (chromeRuntime) {
        const response = {
          type: 'CONNECT_RESPONSE',
          success: true,
          account: accounts[selectedIndex].address,
          accountIndex: selectedIndex,
          requestId: data.requestId
        }
        
        console.log('📤 Enviando conexión al background:', response)
        
        chromeRuntime.sendMessage(response, () => {
          if ((window as any).chrome?.runtime?.lastError) {
            console.error('❌ Error enviando mensaje:', (window as any).chrome.runtime.lastError)
          } else {
            console.log('✅ Conexión enviada correctamente')
          }
          
          // Cerrar ventana
          console.log('🪟 Cerrando ventana de conexión...')
          setTimeout(() => window.close(), 300)
        })
      } else {
        console.error('❌ chrome.runtime no disponible')
        window.close()
      }
    } catch (err: any) {
      console.error('❌ Error conectando:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (!data) return

    console.log('❌ Usuario canceló la conexión')

    // Enviar rechazo al background
    const chromeRuntime = (window as any).chrome?.runtime
    if (chromeRuntime) {
      const response = {
        type: 'CONNECT_RESPONSE',
        success: false,
        error: 'User rejected connection',
        requestId: data?.requestId
      }
      
      console.log('📤 Enviando rechazo al background:', response)
      
      chromeRuntime.sendMessage(response, () => {
        console.log('✅ Rechazo enviado')
        window.close()
      })
    } else {
      window.close()
    }
  }

  if (loading) {
    return (
      <div className="notification-container">
        <div className="notification-content">
          <h2>⏳ Cargando...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="notification-container">
        <div className="notification-content">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.close()}>Cerrar</button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="notification-container">
        <div className="notification-content">
          <h2>❌ No hay solicitud de conexión</h2>
          <button onClick={() => window.close()}>Cerrar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h1>🔐 CodeCrypto Wallet</h1>
        <p>Solicitud de Conexión</p>
      </div>

      <div className="notification-content">
        <h2>🌐 Conectar a dApp</h2>
        
        <div className="connect-origin">
          <div className="origin-label">Origen:</div>
          <div className="origin-value">{data.origin || 'Aplicación Web'}</div>
        </div>

        <div className="connect-info">
          <p>Selecciona la cuenta que deseas conectar a esta aplicación:</p>
        </div>

        <div className="accounts-list">
          {accounts.length === 0 ? (
            <div className="account-item">
              <p>No hay cuentas disponibles</p>
            </div>
          ) : (
            accounts.map((account) => (
              <div
                key={account.index}
                className={`account-item ${selectedIndex === account.index ? 'selected' : ''}`}
                onClick={() => setSelectedIndex(account.index)}
              >
                <div className="account-radio">
                  {selectedIndex === account.index ? '🔘' : '⚪'}
                </div>
                <div className="account-info">
                  <div className="account-label">
                    Cuenta {account.index}
                  </div>
                  <div className="account-address">
                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                  </div>
                  <div className="account-address-full">
                    {account.address}
                  </div>
                </div>
                <div className="account-balance">
                  {loadingBalances ? (
                    <span className="balance-loading">⏳</span>
                  ) : (
                    <span className="balance-value">
                      {parseFloat(account.balance).toFixed(4)} ETH
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {accounts.length > 0 && (
          <div className="selected-account-detail">
            <div className="detail-label">Cuenta Seleccionada:</div>
            <div className="detail-value">
              {accounts[selectedIndex]?.address}
            </div>
          </div>
        )}
      </div>

      <div className="notification-actions">
        <button 
          className="btn-reject" 
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? '⏳' : '❌'} Cancelar
        </button>
        <button 
          className="btn-approve" 
          onClick={handleConnect}
          disabled={loading || accounts.length === 0}
        >
          {loading ? '⏳ Conectando...' : '✅ Conectar'}
        </button>
      </div>
    </div>
  )
}

export default Connect

