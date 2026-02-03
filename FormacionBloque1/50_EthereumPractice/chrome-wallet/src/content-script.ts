/// <reference types="chrome"/>
// Content script que inyecta el proveedor y maneja comunicación
(function() {
  console.log('🔧 CodeCrypto Content Script cargado');
  
  // Inyectar el script en el contexto de la página
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onload = () => {
    console.log('✅ inject.js cargado y ejecutado');
    script.remove();
  };
  (document.head || document.documentElement).appendChild(script);

  // Interfaces para mensajes
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

  // Manejar mensajes desde la página (inject.js)
  window.addEventListener('message', async (event: MessageEvent) => {
    // Solo procesar mensajes del mismo origen
    if (event.source !== window) return;
    if (!event.data || event.data.type !== 'CODECRYPTO_REQUEST') return;

    const { id, method, params } = event.data as CodeCryptoRequest;
    console.log('📨 Solicitud de página:', method, params);

    try {
      // Reenviar al popup/background para procesamiento
      const response = await chrome.runtime.sendMessage({
        type: 'CODECRYPTO_RPC',
        method: method,
        params: params
      }); 

      console.log('📬 Respuesta del popup:', response);

      // Enviar respuesta a la página
      window.postMessage({
        type: 'CODECRYPTO_RESPONSE',
        id: id,
        result: response.result,
        error: response.error
      } as CodeCryptoResponse, '*');

    } catch (error) {
      const err = error as Error;
      console.error('❌ Error en RPC:', err);
      
      // Enviar error a la página
      window.postMessage({
        type: 'CODECRYPTO_RESPONSE',
        id: id,
        error: err.message || 'Unknown error'
      } as CodeCryptoResponse, '*');
    }
  });

  // Escuchar eventos desde el popup (accountsChanged, chainChanged, etc.)
  chrome.runtime.onMessage.addListener((message: unknown, _sender: chrome.runtime.MessageSender, _sendResponse: (response?: unknown) => void) => {
    const msg = message as { type: string; eventName?: string; data?: unknown };
    
    if (msg.type === 'CODECRYPTO_EVENT') {
      console.log('📢 Evento desde popup:', msg.eventName, msg.data);
      
      // Reenviar evento a la página
      window.postMessage({
        type: 'CODECRYPTO_EVENT',
        eventName: msg.eventName,
        data: msg.data
      } as CodeCryptoEvent, '*');
    }
  });

  console.log('✅ CodeCrypto Content Script listo');
})();

