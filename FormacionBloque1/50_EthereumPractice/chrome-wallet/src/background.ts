/// <reference types="chrome"/>
// Background service worker para manejar solicitudes RPC
// ⭐ IMPLEMENTA EIP-1559: Fee Market Change for ETH 1.0 Chain
// - Usa maxFeePerGas (máximo gas dispuesto a pagar)
// - Usa maxPriorityFeePerGas (propina para mineros)
// - Tipo de transacción 2 (EIP-1559) en lugar de legacy (tipo 0)
// ⭐ IMPLEMENTA PERSISTENCIA DE CONEXIONES:
// - Guarda qué sitios están autorizados (codecrypto_connected_sites)
// - Verifica permisos antes de compartir cuentas (eth_accounts)
// - Mantiene conexión aunque el service worker se duerma
import { ethers } from 'ethers';

// Interfaces para mensajes
interface RPCMessage {
  type: 'CODECRYPTO_RPC';
  method: string;
  params: unknown[];
}

interface ConnectResponseMessage {
  type: 'CONNECT_RESPONSE';
  requestId: number;
  success: boolean;
  account?: string;
  error?: string;
}

interface SignResponseMessage {
  type: 'SIGN_RESPONSE';
  approvalId: number;
  success: boolean;
  result?: string;
  error?: string;
}

interface AccountChangedMessage {
  type: 'ACCOUNT_CHANGED';
  accountIndex: number;
  account: string;
}

interface ChainChangedMessage {
  type: 'CHAIN_CHANGED';
  chainId: string;
}

type BackgroundMessage = RPCMessage | ConnectResponseMessage | SignResponseMessage | AccountChangedMessage | ChainChangedMessage;

console.log('🚀 CodeCrypto Background Service Worker iniciado');

// Manejar mensajes desde content scripts y popup
chrome.runtime.onMessage.addListener((message: unknown, sender: chrome.runtime.MessageSender, sendResponse: (response?: unknown) => void) => {
  const msg = message as BackgroundMessage;
  console.log('📨 Mensaje recibido:', msg);

  if (msg.type === 'CODECRYPTO_RPC') {
    const rpcMsg = msg as RPCMessage;
    const requestId = Date.now();
    console.log(`🔵 [${requestId}] RPC Request:`, rpcMsg.method);
    
    handleRPCRequest(rpcMsg.method, rpcMsg.params as string[], sender)
      .then(result => {
        console.log(`✅ [${requestId}] RPC Success (${rpcMsg.method}):`, result);
        sendResponse({ result: result, error: null });
      })
      .catch((error: Error) => {
        console.error(`❌ [${requestId}] RPC Error (${rpcMsg.method}):`, error.message);
        sendResponse({ result: null, error: error.message });
      });
    
    return true; // Mantener canal abierto para respuesta asíncrona
  }
  
  // Manejar respuesta de conexión desde connect.html
  if (msg.type === 'CONNECT_RESPONSE') {
    const connectMsg = msg as ConnectResponseMessage;
    console.log('📬 Respuesta de conexión recibida:', connectMsg);
    handleConnectResponse(connectMsg.requestId, connectMsg);
    sendResponse({ success: true });
    return true;
  }
  
  // Manejar respuesta de firma desde el popup (incluye resultado firmado)
  if (msg.type === 'SIGN_RESPONSE') {
    const signMsg = msg as SignResponseMessage;
    console.log('📬 Respuesta de firma recibida:', signMsg);
    handleSignResponse(signMsg.approvalId, signMsg);
    sendResponse({ success: true });
    return true;
  }
  
  // Manejar cambio de cuenta desde el popup
  if (msg.type === 'ACCOUNT_CHANGED') {
    const accountMsg = msg as AccountChangedMessage;
    console.log('🔄 Cambio de cuenta desde popup:', accountMsg);
    
    // Emitir evento accountsChanged a todas las pestañas
    chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
      tabs.forEach((tab: chrome.tabs.Tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'CODECRYPTO_EVENT',
            eventName: 'accountsChanged',
            data: [accountMsg.account]
          }).catch(() => {
            // Ignorar errores si la pestaña no tiene content script
          });
        }
      });
    });
    
    sendResponse({ success: true });
    return true;
  }
  
  // Manejar cambio de red desde el popup
  if (msg.type === 'CHAIN_CHANGED') {
    const chainMsg = msg as ChainChangedMessage;
    console.log('🌐 Cambio de red desde popup:', chainMsg);
    
    // Emitir evento chainChanged a todas las pestañas
    chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
      tabs.forEach((tab: chrome.tabs.Tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'CODECRYPTO_EVENT',
            eventName: 'chainChanged',
            data: chainMsg.chainId
          }).catch(() => {
            // Ignorar errores
          });
        }
      });
    });
    
    sendResponse({ success: true });
    return true;
  }
});

// Solicitudes pendientes de aprobación
const pendingApprovals = new Map();
let approvalIdCounter = 0;

// Solicitudes pendientes de conexión
const pendingConnections = new Map();
let connectionIdCounter = 0;

// Función para solicitar aprobación del usuario (el background firma después)
async function requestUserApprovalAndSign(method: string, params: unknown[], chainId: string) {
  return new Promise((resolve, reject) => {
    const approvalId = ++approvalIdCounter;
    console.log('🔔 Solicitando aprobación al usuario para:', method, 'ID:', approvalId);
    
    // Guardar en pendientes
    pendingApprovals.set(approvalId, { method, params, resolve, reject });
    
    // Mostrar badge
    chrome.action.setBadgeText({ text: pendingApprovals.size.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#FF9800' });
    console.log('🔔 Badge:', pendingApprovals.size);
    
    // Mostrar notificación
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'vite.svg',
      title: 'CodeCrypto Wallet',
      message: method === 'eth_sendTransaction' 
        ? '🔔 Solicitud de transacción - Abre la wallet para aprobar'
        : '🔔 Solicitud de firma EIP-712 - Abre la wallet para aprobar',
      priority: 2
    }).catch(() => {
      console.log('ℹ️ Notificaciones no disponibles');
    });
    
    // Guardar solicitud en storage para la página de notificación
    chrome.storage.local.set({
      codecrypto_pending_request: {
        approvalId: approvalId,
        method: method,
        params: params,
        chainId: chainId
      }
    }).then(() => {
      console.log('✅ Solicitud guardada en storage');
      
      // Abrir página de notificación independiente
      console.log('🪟 Abriendo página de confirmación...');
      chrome.windows.create({
        url: 'notification.html',
        type: 'popup',
        width: 400,
        height: 600,
        focused: true
      }).then((window: chrome.windows.Window | undefined) => {
        console.log('✅ Ventana de confirmación abierta:', window?.id);
        
        // Guardar el ID de la ventana
        const pending = pendingApprovals.get(approvalId);
        if (pending && window) {
          pending.windowId = window.id;
        }
      }).catch((err: Error) => {
        console.error('❌ No se pudo abrir ventana de confirmación:', err);
        // Limpiar solicitud pendiente
        chrome.storage.local.remove('codecrypto_pending_request');
        reject({ error: 'Failed to open confirmation window' });
      });
    }).catch((err: Error) => {
      console.error('❌ Error guardando solicitud:', err);
      reject({ error: 'Failed to save request' });
    });
    
    // La página de notificación obtiene los datos del storage directamente
    // No necesitamos enviar mensajes ni reintentar
    
    // Timeout de 120 segundos (2 minutos)
    setTimeout(() => {
      if (pendingApprovals.has(approvalId)) {
        console.error('⏰ Timeout para aprobación ID:', approvalId);
        const pending = pendingApprovals.get(approvalId);
        const windowId = pending?.windowId;
        pendingApprovals.delete(approvalId);
        
        // Cerrar ventana de confirmación
        if (windowId) {
          chrome.windows.remove(windowId).catch(() => {});
        }
        
        // Limpiar storage
        chrome.storage.local.remove('codecrypto_pending_request');
        
        // Actualizar badge
        const remaining = pendingApprovals.size;
        chrome.action.setBadgeText({ text: remaining > 0 ? remaining.toString() : '' });
        
        reject({ error: 'User approval timeout after 2 minutes' });
      }
    }, 120000);
  });
}

// Función para solicitar conexión del usuario (página connect.html)
async function requestUserConnection(origin: string, accounts: string[], currentAccountIndex: number) {
  return new Promise((resolve, reject) => {
    const requestId = ++connectionIdCounter;
    console.log('🌐 Solicitando conexión al usuario, ID:', requestId);
    console.log('🌐 Origen:', origin);
    
    // Guardar en pendientes
    pendingConnections.set(requestId, { origin, accounts, resolve, reject });
    
    // Guardar solicitud en storage
    chrome.storage.local.set({
      codecrypto_connect_request: {
        requestId: requestId,
        origin: origin,
        accounts: accounts,
        currentAccountIndex: currentAccountIndex
      }
    }).then(() => {
      console.log('✅ Solicitud de conexión guardada en storage');
      
      // Abrir ventana de conexión
      console.log('🪟 Abriendo ventana de conexión...');
      chrome.windows.create({
        url: 'connect.html',
        type: 'popup',
        width: 420, 
        height: 650,
        focused: true
      }).then((window: chrome.windows.Window | undefined) => {
        console.log('✅ Ventana de conexión abierta:', window?.id);
        
        // Guardar el ID de la ventana
        const pending = pendingConnections.get(requestId);
        if (pending && window) {
          pending.windowId = window.id;
        }
      }).catch((err: Error) => {
        console.error('❌ No se pudo abrir ventana de conexión:', err);
        chrome.storage.local.remove('codecrypto_connect_request');
        reject({ error: 'Failed to open connection window' });
      });
    }).catch((err: Error) => {
      console.error('❌ Error guardando solicitud de conexión:', err);
      reject({ error: 'Failed to save connection request' });
    });
    
    // Timeout de 60 segundos (1 minuto)
    setTimeout(() => {
      if (pendingConnections.has(requestId)) {
        console.error('⏰ Timeout para conexión ID:', requestId);
        const pending = pendingConnections.get(requestId);
        const windowId = pending?.windowId;
        pendingConnections.delete(requestId);
        
        // Cerrar ventana de conexión
        if (windowId) {
          chrome.windows.remove(windowId).catch(() => {});
        }
        
        // Limpiar storage
        chrome.storage.local.remove('codecrypto_connect_request');
        
        reject({ error: 'User connection timeout' });
      }
    }, 60000);
  });
}

// Manejar respuesta de conexión desde connect.html
async function handleConnectResponse(requestId: number, response: { success: boolean; account?: string; error?: string }) {
  console.log('📬 Procesando respuesta de conexión para ID:', requestId);
  console.log('📬 Respuesta:', response);
  
  if (!pendingConnections.has(requestId)) {
    console.warn('⚠️ Conexión ID no encontrada:', requestId);
    return;
  }
  
  const pending = pendingConnections.get(requestId);
  const origin = pending.origin;
  pendingConnections.delete(requestId);
  
  // Limpiar storage
  chrome.storage.local.remove('codecrypto_connect_request');
  
  if (response.success) {
    console.log('✅ Usuario conectó cuenta:', response.account);
    
    // ⭐ GUARDAR SITIO EN LISTA DE CONECTADOS
    const storage = await chrome.storage.local.get('codecrypto_connected_sites');
    const connectedSites = (storage.codecrypto_connected_sites as Record<string, string>) || {};
    
    // Guardar origen con la cuenta autorizada
    connectedSites[origin] = response.account!;
    
    await chrome.storage.local.set({ codecrypto_connected_sites: connectedSites });
    console.log('💾 Sitio guardado en conectados:', origin, '→', response.account);
    
    pending!.resolve({ account: response.account, error: null });
  } else {
    console.log('❌ Usuario canceló conexión');
    pending!.reject({ error: response.error || 'User rejected connection', account: null });
  }
}

// Manejar respuesta de aprobación del popup (sin datos de firma)
function handleSignResponse(approvalId: number, response: { success: boolean; result?: string; error?: string }) {
  console.log('📬 Procesando respuesta de aprobación para ID:', approvalId);
  console.log('📬 Respuesta completa:', JSON.stringify(response, null, 2));
  console.log('📬 response.success:', response.success);
  console.log('📬 response.error:', response.error);
  
  if (!pendingApprovals.has(approvalId)) {
    console.warn('⚠️ Aprobación ID no encontrada:', approvalId);
    console.warn('⚠️ Pendientes actuales:', Array.from(pendingApprovals.keys()));
    return;
  }
  
  const pending = pendingApprovals.get(approvalId);
  pendingApprovals.delete(approvalId);
  
  // Limpiar storage de solicitud pendiente
  chrome.storage.local.remove('codecrypto_pending_request');
  
  // Actualizar badge
  const remaining = pendingApprovals.size;
  chrome.action.setBadgeText({ text: remaining > 0 ? remaining.toString() : '' });
  
  if (response.success) {
    console.log('✅ Usuario aprobó la solicitud');
    // Solo resolver sin datos - el background se encarga de firmar
    pending!.resolve(true);
  } else {
    console.log('❌ Usuario rechazó la solicitud:', response.error);
    pending!.reject(new Error(response.error || 'User rejected'));
  }
  
  // La ventana de confirmación se cierra automáticamente desde Notification.tsx
  // No necesitamos cerrarla aquí
}

// Manejar solicitudes RPC
async function handleRPCRequest(method: string, params: unknown[], sender: chrome.runtime.MessageSender) {
  console.log('🔵 Procesando RPC:', method, params);

  // Leer datos de storage
  const data = await chrome.storage.local.get([
    'codecrypto_mnemonic',
    'codecrypto_accounts',
    'codecrypto_current_account',
    'codecrypto_chain_id'
  ]);

  const mnemonic = data.codecrypto_mnemonic as string | undefined;
  const accounts = (data.codecrypto_accounts as string[]) || [];
  const currentAccountIndex = parseInt((data.codecrypto_current_account as string) || '0');
  const chainId = (data.codecrypto_chain_id as string) || '0x7a69';

  switch (method) {
    case 'wallet_deriveAccounts': {
      console.log('📝 wallet_deriveAccounts - Derivar cuentas desde mnemonic');
      const mnemonicPhrase = params[0] as string;
      const numAccounts = (params[1] as number) || 5;
      
      console.log('Mnemonic recibido (primeras 10 letras):', mnemonicPhrase.substring(0, 10) + '...');
      console.log('Número de cuentas a derivar:', numAccounts);
      
      // Validar mnemonic (ethers v6)
      const isValid = ethers.Mnemonic.isValidMnemonic(mnemonicPhrase);
      if (!isValid) {
        throw new Error('Invalid mnemonic phrase');
      }
      
      // Crear objeto Mnemonic
      const mnemonicObj = ethers.Mnemonic.fromPhrase(mnemonicPhrase);
      
      // Derivar cuentas usando HDNodeWallet (ethers v6)
      const derivedAccounts: string[] = [];
      for (let i = 0; i < numAccounts; i++) {
        const path = `m/44'/60'/0'/0/${i}`;
        const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicObj, path);
        derivedAccounts.push(wallet.address);
        console.log(`Cuenta ${i} (${path}): ${wallet.address}`);
      }
      
      console.log('✅ Cuentas derivadas exitosamente:', derivedAccounts);
      return derivedAccounts;
    }

    case 'eth_requestAccounts': {
      console.log('📝 eth_requestAccounts - Solicitud de conexión');
      console.log('📝 Cuentas disponibles:', accounts);
      console.log('📝 Cuenta actual:', currentAccountIndex);
      
      if (!Array.isArray(accounts) || accounts.length === 0) {
        console.error('❌ No hay cuentas en storage');
        throw new Error('No accounts available. Please open the wallet popup and load your mnemonic.');
      }
      
      if (currentAccountIndex >= accounts.length) {
        console.error('❌ Índice de cuenta fuera de rango:', currentAccountIndex, 'de', accounts.length);
        throw new Error('Invalid account index. Please reset your wallet.');
      }
      
      // Abrir página de conexión para que el usuario seleccione cuenta
      console.log('🌐 Abriendo página de conexión...');
      
      const origin = sender.tab?.url || sender.url || 'unknown';
      
      const connectResult = await requestUserConnection(origin, accounts, currentAccountIndex) as { account?: string; error?: string };
      
      if (connectResult.error) {
        throw new Error(connectResult.error);
      }
      
      console.log('✅ Usuario conectó cuenta:', connectResult.account);
      return [connectResult.account];
    }

    case 'eth_accounts': {
      console.log('📝 eth_accounts - Verificar permisos del sitio');
      
      // Obtener origen del sitio que solicita
      const origin = sender.tab?.url || sender.url || 'unknown';
      console.log('📝 Origen solicitante:', origin);
      
      // Verificar si el sitio está conectado
      const storage = await chrome.storage.local.get('codecrypto_connected_sites');
      const connectedSites = (storage.codecrypto_connected_sites as Record<string, string>) || {};
      
      console.log('📝 Sitios conectados:', connectedSites);
      
      // Extraer dominio base del origen
      let siteDomain = origin;
      try {
        const url = new URL(origin);
        siteDomain = url.origin;
      } catch {
        // Si falla el parse, usar origin completo
      }
      
      if (connectedSites[siteDomain]) {
        console.log('✅ Sitio autorizado:', siteDomain);
        // Devolver la cuenta que el usuario autorizó para este sitio
        return [connectedSites[siteDomain]];
      } else {
        console.log('⚠️ Sitio NO autorizado:', siteDomain);
        console.log('ℹ️ El sitio debe llamar eth_requestAccounts primero');
        // No devolver cuentas si el sitio no está autorizado
        return [];
      }
    }

    case 'eth_chainId':
      console.log('📝 eth_chainId');
      return chainId;

    case 'eth_getBalance': {
      console.log('📝 eth_getBalance');
      const address = (params[0] as string) || accounts[currentAccountIndex];
      console.log('📝 Balance para dirección:', address);
      
      try {
        // Usar ethers.JsonRpcProvider directamente
        const rpcUrl = chainId === '0x7a69' 
          ? 'http://localhost:8545' 
          : 'https://rpc.sepolia.org';
        
        console.log('📝 RPC URL:', rpcUrl);
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        
        // Obtener balance con ethers
        const balance = await provider.getBalance(address);
        const balanceHex = '0x' + balance.toString(16);
        
        console.log('✅ Balance obtenido:', balanceHex);
        return balanceHex;
      } catch (error) {
        const err = error as Error;
        console.error('❌ Error obteniendo balance:', err);
        throw new Error(`Cannot get balance: ${err.message}. Make sure Hardhat is running if using localhost.`);
      }
    }

    case 'eth_sendTransaction':
      console.log('📝 eth_sendTransaction - Solicitar aprobación y firmar');
      
      if (!mnemonic) {
        throw new Error('Wallet not configured. Please open the popup and setup your wallet.');
      }
      
      // 1. Solicitar aprobación al usuario
      console.log('🔔 Solicitando aprobación al usuario...');
      
      try {
        // Esperar aprobación del usuario (sin firma)
        await requestUserApprovalAndSign(method, params, chainId);
        console.log('✅ Usuario aprobó la transacción, firmando...');
        
        // 2. Firmar la transacción con ethers en el background
        const tx = params[0] as { to: string; value?: string; data?: string; from?: string };
        
        // Recrear wallet desde mnemonic
        const mnemonicObj = ethers.Mnemonic.fromPhrase(mnemonic);
        const path = `m/44'/60'/0'/0/${currentAccountIndex}`;
        const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicObj, path);
        
        // Conectar a provider
        const rpcUrl = chainId === '0x7a69' 
          ? 'http://localhost:8545' 
          : 'https://rpc.sepolia.org';
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const signer = wallet.connect(provider);
        
        // Obtener fee data para EIP-1559
        const feeData = await provider.getFeeData();
        console.log('📊 Fee Data (EIP-1559):', {
          maxFeePerGas: feeData.maxFeePerGas?.toString(),
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
          gasPrice: feeData.gasPrice?.toString()
        });
        
        // Construir transacción con EIP-1559 (Type 2)
        const txRequest = {
          to: tx.to,
          value: tx.value || '0x0',
          data: tx.data || '0x',
          // EIP-1559 fee parameters
          maxFeePerGas: feeData.maxFeePerGas,
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
          // No incluir gasPrice (legacy) cuando se usa EIP-1559
          type: 2, // Tipo 2 = EIP-1559
        };
        
        console.log('📝 Enviando transacción EIP-1559 (Type 2):', txRequest);
        const txResponse = await signer.sendTransaction(txRequest);
        console.log('✅ Transacción EIP-1559 enviada:', txResponse.hash);
        console.log('📊 TX Type:', txResponse.type, '(2 = EIP-1559)');
        
        return txResponse.hash;
      } catch (error) {
        const err = error as Error;
        console.error('❌ Error en transacción:', err);
        throw err;
      }

    case 'eth_signTypedData_v4':
      console.log('📝 eth_signTypedData_v4 - Solicitar aprobación y firmar EIP-712');
      
      if (!mnemonic) {
        throw new Error('Wallet not configured. Please open the popup and setup your wallet.');
      }
      
      // 1. Solicitar aprobación al usuario
      console.log('🔔 Solicitando aprobación al usuario...');
      
      try {
        // Esperar aprobación del usuario (sin firma)
        await requestUserApprovalAndSign(method, params, chainId);
        console.log('✅ Usuario aprobó la firma, firmando mensaje EIP-712...');
        
        // 2. Firmar el mensaje con ethers en el background
        const signerAddress = params[0] as string;
        const typedData = JSON.parse(params[1] as string);
        
        // Recrear wallet desde mnemonic
        const mnemonicObj = ethers.Mnemonic.fromPhrase(mnemonic);
        const path = `m/44'/60'/0'/0/${currentAccountIndex}`;
        const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicObj, path);
        
        // Verificar que la dirección coincide
        if (wallet.address.toLowerCase() !== signerAddress.toLowerCase()) {
          throw new Error('Signer address does not match current account');
        }
        
        // Firmar con EIP-712
        const domain = typedData.domain;
        const types = { ...typedData.types };
        delete types.EIP712Domain; // ethers v6 no necesita EIP712Domain en types
        const value = typedData.message;
        
        console.log('📝 Firmando mensaje EIP-712...');
        const signature = await wallet.signTypedData(domain, types, value);
        console.log('✅ Mensaje firmado:', signature);
        
        return signature;
      } catch (error) {
        const err = error as Error;
        console.error('❌ Error firmando mensaje:', err);
        throw err;
      }

    case 'wallet_switchEthereumChain': {
      console.log('📝 wallet_switchEthereumChain');
      const newChainId = (params[0] as { chainId?: string })?.chainId;
      if (newChainId) {
        await chrome.storage.local.set({ codecrypto_chain_id: newChainId });
        
        // Emitir evento chainChanged a todas las pestañas
        const tabs = await chrome.tabs.query({});
        tabs.forEach((tab: chrome.tabs.Tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              type: 'CODECRYPTO_EVENT',
              eventName: 'chainChanged',
              data: newChainId
            }).catch(() => {
              // Ignorar errores si la pestaña no tiene content script
            });
          }
        });
        
        return null;
      }
      throw new Error('Invalid chainId');
    }

    default:
      console.warn('⚠️ Método no implementado:', method);
      throw new Error(`Method not implemented: ${method}`);
  }
}

// Escuchar cambios en storage para sincronizar estado
chrome.storage.onChanged.addListener(async (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
  if (areaName !== 'local') return;

  console.log('💾 Storage cambió:', changes);

  // Si cambió la cuenta actual, emitir accountsChanged
  if (changes.codecrypto_current_account) {
    const storageData = await chrome.storage.local.get(['codecrypto_accounts', 'codecrypto_connected_sites']);
    const accountIndex = parseInt(changes.codecrypto_current_account.newValue || '0');
    const accountsList = (storageData.codecrypto_accounts as string[]) || [];
    const connectedSites = (storageData.codecrypto_connected_sites as Record<string, string>) || {};
    
    if (accountsList.length > accountIndex) {
      const newAccount = accountsList[accountIndex];
      
      // Actualizar la cuenta para todos los sitios conectados
      const updatedSites: Record<string, string> = {};
      Object.keys(connectedSites).forEach(site => {
        updatedSites[site] = newAccount;
      });
      
      // Guardar sitios actualizados
      if (Object.keys(updatedSites).length > 0) {
        await chrome.storage.local.set({ codecrypto_connected_sites: updatedSites });
        console.log('💾 Sitios conectados actualizados con nueva cuenta:', newAccount);
      }
      
      // Emitir a todas las pestañas
      const tabs = await chrome.tabs.query({});
      tabs.forEach((tab: chrome.tabs.Tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'CODECRYPTO_EVENT',
            eventName: 'accountsChanged',
            data: [newAccount]
          }).catch(() => {
            // Ignorar errores
          });
        }
      });
    }
  }

  // Si cambió el chain ID, emitir chainChanged
  if (changes.codecrypto_chain_id) {
    const newChainId = changes.codecrypto_chain_id.newValue;
    
    // Emitir a todas las pestañas
    const tabs = await chrome.tabs.query({});
    tabs.forEach((tab: chrome.tabs.Tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'CODECRYPTO_EVENT',
          eventName: 'chainChanged',
          data: newChainId
        }).catch(() => {
          // Ignorar errores
        });
      }
    });
  }
});

console.log('✅ Background service worker listo');

