// Script de inyección que crea window.codecrypto en el contexto de la página
(function() {
  'use strict';
  
  console.log('🔐 CodeCrypto Wallet: Inyectando proveedor...');
  
  // Verificar si ya existe
  if ((window as any).codecrypto) {
    console.log('⚠️ CodeCrypto Wallet ya está inyectado');
    return;
  }

  // Tipos para el proveedor
  interface RequestArguments {
    method: string;
    params?: unknown[];
  }

  interface CodeCryptoProvider {
    isCodeCrypto: boolean;
    isMetaMask: boolean;
    request: (args: RequestArguments) => Promise<unknown>;
    on: (eventName: string, callback: (data: unknown) => void) => void;
    removeListener: (eventName: string, callback: (data: unknown) => void) => void;
    removeAllListeners: (eventName?: string) => void;
  }

  interface CodeCryptoRequest {
    type: 'CODECRYPTO_REQUEST';
    id: number;
    method: string;
    params: unknown[];
  }

  interface CodeCryptoResponse {
    type: 'CODECRYPTO_RESPONSE';
    id: number;
    result?: unknown;
    error?: string;
  }

  interface CodeCryptoEvent {
    type: 'CODECRYPTO_EVENT';
    eventName: string;
    data: unknown;
  }
 
  // Crear el proveedor EIP-1193
  const eventListeners: { [key: string]: Array<(data: unknown) => void> } = {};
  let requestId = 0;

  const codecryptoProvider: CodeCryptoProvider = {
    isCodeCrypto: true,
    isMetaMask: false, // Para evitar conflictos con MetaMask
    
    // Método principal EIP-1193
    request: async function({ method, params }: RequestArguments): Promise<unknown> {
      console.log('🔵 CodeCrypto RPC:', method, params);
      
      return new Promise((resolve, reject) => {
        const id = ++requestId;
        
        // Enviar mensaje al content script
        window.postMessage({
          type: 'CODECRYPTO_REQUEST',
          id: id,
          method: method,
          params: params || []
        } as CodeCryptoRequest, '*');
        
        // Escuchar respuesta
        const responseHandler = (event: MessageEvent) => {
          if (event.source !== window) return;
          if (!event.data || event.data.type !== 'CODECRYPTO_RESPONSE') return;
          if (event.data.id !== id) return; 
          
          window.removeEventListener('message', responseHandler);
          
          const response = event.data as CodeCryptoResponse;
          
          if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response.result);
          }
        };
        
        window.addEventListener('message', responseHandler);
        
        // Timeout después de 30 segundos
        setTimeout(() => {
          window.removeEventListener('message', responseHandler);
          console.error('⏰ Timeout esperando respuesta para:', method);
          reject(new Error('Request timeout after 30s. Please check if the wallet is open.'));
        }, 30000);
      });
    },
    
    // Event emitter
    on: function(eventName: string, callback: (data: unknown) => void): void {
      if (!eventListeners[eventName]) {
        eventListeners[eventName] = [];
      }
      eventListeners[eventName].push(callback);
      console.log('👂 Listener registrado para:', eventName);
    },
    
    removeListener: function(eventName: string, callback: (data: unknown) => void): void {
      if (eventListeners[eventName]) {
        eventListeners[eventName] = eventListeners[eventName].filter(fn => fn !== callback);
      }
    },
    
    // Alias para compatibilidad
    removeAllListeners: function(eventName?: string): void {
      if (eventName) {
        eventListeners[eventName] = [];
      } else {
        Object.keys(eventListeners).forEach(key => {
          eventListeners[key] = [];
        });
      }
    }
  };

  // Escuchar eventos desde el content script
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.source !== window) return;
    if (!event.data || event.data.type !== 'CODECRYPTO_EVENT') return;
    
    const { eventName, data } = event.data as CodeCryptoEvent;
    console.log('📢 Evento CodeCrypto:', eventName, data);
    
    if (eventListeners[eventName]) {
      eventListeners[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error en listener:', error);
        }
      });
    }
  });

  // Inyectar en window
  Object.defineProperty(window, 'codecrypto', {
    value: codecryptoProvider,
    writable: false,
    configurable: false
  });

  console.log('✅ window.codecrypto inyectado');
  
  // Anunciar proveedor con EIP-6963
  const announceEvent = new CustomEvent('eip6963:announceProvider', {
    detail: {
      info: {
        uuid: crypto.randomUUID(),
        name: 'CodeCrypto Wallet',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="16" fill="%234CAF50"/></svg>',
        rdns: 'io.codecrypto.wallet'
      },
      provider: codecryptoProvider
    }
  });
  
  window.dispatchEvent(announceEvent);
  console.log('📢 EIP-6963: Proveedor anunciado');
  
  // Escuchar solicitudes de anuncio
  window.addEventListener('eip6963:requestProvider', () => {
    window.dispatchEvent(announceEvent);
  });
  
  console.log('✅ CodeCrypto Wallet listo');
})();

