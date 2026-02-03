import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'

// ⭐ ARQUITECTURA ACTUALIZADA:
// - Notification.tsx: Solo aprueba/rechaza (NO firma)
// - background.ts: Firma con ethers después de la aprobación (con EIP-1559)

interface NotificationData {
  approvalId: number
  method: string
  params: any[]
  chainId: string
}

function Notification() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<NotificationData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Obtener datos de la solicitud desde storage
    const loadRequest = async () => {
      try {
        const storage = (window as any).chrome?.storage?.local
        if (!storage) {
          throw new Error('Chrome storage no disponible')
        }

        const result: any = await new Promise((resolve) => {
          storage.get(['codecrypto_pending_request'], resolve)
        })

        if (!result.codecrypto_pending_request) {
          throw new Error('No hay solicitud pendiente')
        }

        setData(result.codecrypto_pending_request)
        setLoading(false)
      } catch (err: any) {
        console.error('Error cargando solicitud:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadRequest()
  }, [])

  const handleApprove = async () => {
    if (!data) return

    console.log('✅ Usuario aprobó la solicitud')
    console.log('📤 Enviando aprobación al background (sin firmar)...')

    // Solo enviar aprobación al background (NO firmar aquí)
    // El background.ts se encarga de firmar con ethers después de la aprobación
    const chromeRuntime = (window as any).chrome?.runtime
    if (chromeRuntime) {
      const response = {
        type: 'SIGN_RESPONSE',
        success: true,
        approvalId: data.approvalId
      }
      console.log('📤 Enviando aprobación al background:', response)
      
      chromeRuntime.sendMessage(response, () => {
        if ((window as any).chrome?.runtime?.lastError) {
          console.error('❌ Error enviando mensaje:', (window as any).chrome.runtime.lastError)
        } else {
          console.log('✅ Aprobación enviada correctamente al background')
          console.log('ℹ️ El background firmará la transacción con EIP-1559')
        }
        
        // Cerrar ventana después de enviar
        console.log('🪟 Cerrando ventana de confirmación...')
        setTimeout(() => window.close(), 500)
      })
    } else {
      console.error('❌ chrome.runtime no disponible')
      window.close()
    }
  }

  const handleReject = () => {
    if (!data) return

    console.log('❌ Usuario rechazó la solicitud')

    // Enviar rechazo al background
    const chromeRuntime = (window as any).chrome?.runtime
    if (chromeRuntime) {
      const rejectResponse = {
        type: 'SIGN_RESPONSE',
        success: false,
        error: 'User rejected',
        approvalId: data.approvalId
      }
      console.log('📤 Enviando rechazo al background:', rejectResponse)
      
      chromeRuntime.sendMessage(rejectResponse, () => {
        console.log('✅ Rechazo enviado al background')
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
          <h2>❌ No hay solicitud</h2>
          <button onClick={() => window.close()}>Cerrar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h1>🔐 CodeCrypto Wallet</h1>
        <p>Solicitud de Firma</p>
      </div>

      <div className="notification-content">
        {data.method === 'eth_sendTransaction' ? (
          <>
            <h2>💸 Confirmar Transacción</h2>
            <div className="tx-details">
              <div className="detail-item">
                <div className="detail-label">Para:</div>
                <div className="detail-value">{data.params[0].to}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Valor:</div>
                <div className="detail-value">
                  {ethers.formatEther(data.params[0].value || '0')} ETH
                </div>
              </div>
              {data.params[0].data && data.params[0].data !== '0x' && (
                <div className="detail-item">
                  <div className="detail-label">Data:</div>
                  <div className="detail-value code">{data.params[0].data.slice(0, 40)}...</div>
                </div>
              )}
              <div className="detail-item">
                <div className="detail-label">Red:</div>
                <div className="detail-value">
                  {data.chainId === '0x7a69' ? 'Hardhat Local (31337)' : 'Sepolia (11155111)'}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>✍️ Firmar Mensaje EIP-712</h2>
            <div className="tx-details">
              <div className="detail-item">
                <div className="detail-label">Dirección:</div>
                <div className="detail-value code">{data.params[0]}</div>
              </div>
              <div className="json-container">
                <div className="json-label">Datos del Mensaje:</div>
                <pre className="json-display">
                  {JSON.stringify(JSON.parse(data.params[1]), null, 2)}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="notification-actions">
        <button 
          className="btn-reject" 
          onClick={handleReject}
          disabled={loading}
        >
          {loading ? '⏳' : '❌'} Rechazar
        </button>
        <button 
          className="btn-approve" 
          onClick={handleApprove}
          disabled={loading}
        >
          {loading ? '⏳ Firmando...' : '✅ Aprobar'}
        </button>
      </div>
    </div>
  )
}

export default Notification

