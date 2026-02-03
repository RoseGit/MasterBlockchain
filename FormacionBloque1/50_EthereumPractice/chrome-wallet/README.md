# 🔐 CodeCrypto Wallet - Chrome Extension

Una extensión de wallet Ethereum completa con soporte para EIP-1193, EIP-712, EIP-1559 y EIP-6963.

---

## 🔥 ACTUALIZACIÓN - Todos los Errores Solucionados

### ❌ Errores Previos (Ya Corregidos):
- ✅ Service worker registration failed (Code 15)
- ✅ Cannot derive root path error
- ✅ No accounts available
- ✅ This operation requires user approval

### 🎯 Solución Implementada:
- **Background.js** NO usa ethers.js (evita errores de service worker)
- **Popup** maneja TODA la firma con ethers.js (que ya está en el bundle)
- **Sistema robusto** de queue y reintentos
- **Notificaciones** de Chrome para solicitudes

### 📖 Documentación:
- **`PASOS_AHORA.md`** ← **EMPIEZA AQUÍ** (5 minutos)
- **`SOLUCION_ERRORES.md`** - Detalles técnicos de las soluciones
- **`START_HERE.md`** - Inicio rápido alternativo
- **`SISTEMA_APROBACION_MEJORADO.md`** - Arquitectura del sistema

---

## ✨ Características

✅ **20 Especificaciones Implementadas:**

1. ✅ Frase de recuperación BIP-39 (12 palabras)
2. ✅ Carga directa sin contraseña
3. ✅ Proveedor `window.codecrypto` (EIP-1193)
4. ✅ Solo usa Ethers.js
5. ✅ Interfaz React + TypeScript
6. ✅ RPC localhost:8545 (Chain ID 31337) por defecto
7. ✅ Firmar y enviar transacciones (eth_sendTransaction)
8. ✅ Firmar mensajes EIP-712 (eth_signTypedData_v4)
9. ✅ Inyección en `window.codecrypto`
10. ✅ Evento `accountsChanged`
11. ✅ Polling de saldos cada 5 segundos
12. ✅ Compatible Chrome/Edge
13. ✅ Logs de llamadas al proveedor
14. ✅ Logs de eventos
15. ✅ Logs de errores con colores
16. ✅ Logs de transacciones y mensajes
17. ✅ Gestión de Gas EIP-1559
18. ✅ Anuncio EIP-6963
19. ✅ Cambio de redes (31337 ↔ 11155111)
20. ✅ Modal de bloqueo durante aprobaciones
21. ✅ Botón Reset para volver a la pantalla inicial
22. ✅ Hint clickeable con mnemonic de prueba
23. ✅ Historial de logs persistente entre resets
24. ✅ Transferencias entre cuentas de la wallet
25. ✅ Formulario de transferencia con validación
26. ✅ Persistencia en chrome.storage.local
27. ✅ Auto-carga al abrir (solo pide mnemonic la primera vez)
28. ✅ Restaura cuenta activa y chain ID
29. ✅ Modal de aprobación con comunicación background ↔ popup
30. ✅ Badge en ícono de extensión para solicitudes pendientes
31. ✅ Auto-apertura del popup para aprobaciones
32. ✅ Sistema completo de inyección window.codecrypto en todas las páginas
33. ✅ Evento accountsChanged emitido a todas las pestañas al cambiar cuenta
34. ✅ Evento chainChanged emitido a todas las pestañas al cambiar red

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Chrome Extension

```bash
npm run build
```

Los archivos de la extensión se generarán en `dist/`

## 📦 Cargar en Chrome

1. Ejecuta `npm run build`
2. Abre Chrome → `chrome://extensions/`
3. Activa "Modo de desarrollador"
4. Click en "Cargar extensión sin empaquetar"
5. Selecciona la carpeta `dist/`

## 🧪 Probar la Extensión

### Flujo de Prueba:

1. **Carga la wallet**: Abre http://localhost:5174/ e ingresa tu mnemonic
2. **Abre test.html**: En la MISMA pestaña, navega a http://localhost:5174/test.html
3. **✅ Detección automática**: CodeCrypto Wallet aparecerá como opción
4. **Conecta y prueba** todas las funcionalidades

### Funcionalidades de test.html:

1. ✅ Detecta `window.codecrypto` (como `window.ethereum`)
2. ✅ Detecta MetaMask y otras wallets
3. ✅ Selector multi-wallet si tienes varias instaladas
4. ✅ Conectar a la wallet seleccionada
5. ✅ Enviar transacciones
6. ✅ Firmar mensajes EIP-712
7. ✅ Cambiar de red
8. ✅ Ver balance (actualización cada 5s)
9. ✅ Historial de transacciones
10. ✅ Historial de mensajes firmados

### 📝 Notas Importantes:

> 🔑 **window.codecrypto vs window.ethereum**: 
> - test.html trata a CodeCrypto Wallet exactamente igual que MetaMask
> - Ambos son proveedores EIP-1193 estándar
> - Mismo código funciona para ambos

> 🔔 **Sistema de Aprobación (Como MetaMask)**:
> 
> Cuando una dApp solicita firmar:
> 1. 🔔 Badge naranja "1" aparece en el ícono de la extensión
> 2. 🔔 Popup se abre automáticamente (si estaba cerrado)
> 3. 🔔 Modal muestra detalles completos de la TX/mensaje
> 4. 👤 Usuario aprueba o rechaza
> 5. ✅ Se firma solo si aprueba
> 6. 📤 Resultado devuelto a la dApp
> 
> **Características:**
> - ✅ Modal visual con todos los detalles
> - ✅ Badge de notificación
> - ✅ Auto-apertura del popup
> - ✅ Timeout de 60 segundos
> - ✅ Logs detallados
> - ✅ Mismo comportamiento que MetaMask

> 📝 **Modos de Uso**:
> 
> **Desarrollo** (`npm run dev`):
> - Misma pestaña para wallet y dApp
> - Modal inline
> - Sin necesidad de extensión
> 
> **Extensión** (`npm run build`):
> - Inyecta en todas las páginas
> - Modal en popup de extensión
> - Como MetaMask real
> - Ver `MODAL_APROBACION.md` para detalles

## 🔑 Persistencia de Datos

La wallet guarda tu mnemonic de forma segura en:
- **Chrome Extension**: `chrome.storage.local` (storage de extensión)
- **Desarrollo**: `localStorage` (fallback)

### Primera Vez:
1. Ingresas tu mnemonic (12 palabras)
2. Se guarda automáticamente
3. ✅ Ya no necesitas ingresarlo de nuevo

### Siguientes Veces:
1. Abres la wallet
2. ✅ Se carga automáticamente desde storage
3. Restaura: cuentas, cuenta activa, chain ID

### Reset:
1. Click en "🔄 Reset Wallet"
2. Limpia completamente el storage
3. Vuelve a pedir mnemonic

## 🔑 Mnemonic de Prueba

Para desarrollo, usa:
```
test test test test test test test test test test test junk
```

**⚠️ NO uses mnemónicos reales con fondos reales.**

> 💡 **Nota**: Solo necesitas ingresarlo una vez. La próxima vez que abras la wallet, se cargará automáticamente.

## 🛠️ Stack Tecnológico

- **React 19** + TypeScript
- **Ethers.js v6** (única librería - incluye BIP-39, BIP-44, EIP-712)
- **Vite** (build tool)
- **EIP-1193** (Provider API)
- **EIP-712** (Typed Data Signing)
- **EIP-1559** (Gas Management)
- **EIP-6963** (Provider Discovery)
- **BIP-39** (Mnemonic phrases - incorporado en Ethers.js)
- **BIP-44** (HD Wallet derivation - incorporado en Ethers.js)

## 📚 Documentación

Ver `INSTRUCCIONES.md` para documentación completa.

## 🌐 RPC Networks

- **Localhost (Hardhat)**: http://localhost:8545 (Chain ID: 31337)
- **Sepolia**: https://rpc.sepolia.org (Chain ID: 11155111)

## 📝 API del Proveedor

```javascript
// Conectar
await window.codecrypto.request({ method: 'eth_requestAccounts' })

// Enviar transacción
await window.codecrypto.request({
  method: 'eth_sendTransaction',
  params: [{ from: '0x...', to: '0x...', value: '0x...' }]
})

// Firmar EIP-712
await window.codecrypto.request({
  method: 'eth_signTypedData_v4',
  params: [address, JSON.stringify(typedData)]
})

// Eventos
window.codecrypto.on('accountsChanged', callback)
window.codecrypto.on('chainChanged', callback)
```

## ⚠️ Advertencia de Seguridad

Esta es una wallet de **demostración/desarrollo**. NO usar en producción.

- No usa cifrado de claves
- No persiste datos
- Solo para fines educativos y de testing

## 📄 Licencia

MIT
