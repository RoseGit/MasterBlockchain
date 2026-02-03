# 📝 Changelog - CodeCrypto Wallet

## [1.2.0] - Octubre 2025

### ✅ Agregado

#### Mejoras en test.html
- **Botón de Desconectar**: Permite desconectar la wallet sin recargar
- **Ignorar EIP-6963 cuando conectado**: Evita re-detección innecesaria
- **Mejor UX**: Cambiar entre wallets sin recargar página

#### Documentación de Recursos
- **RECURSOS_REFERENCIAS.md**: Archivo completo con links útiles
  - EIPs implementados con documentación
  - Chrome Extensions Manifest V3
  - Vite y build tools
  - Ethers.js v6
  - BIP standards (39, 32, 44)
  - Hardhat y testnets
  - React y TypeScript
  - Herramientas de desarrollo

---

## [1.1.0] - Octubre 2025

### ✅ Agregado

#### EIP-1559 Implementación Completa
- **Transacciones Tipo 2**: Todas las transacciones ahora usan EIP-1559
- **Gas Optimizado**: `maxFeePerGas` y `maxPriorityFeePerGas` calculados automáticamente
- **Logs Detallados**: Información de fee data en consola del service worker
- **Documentación**: `EIP1559_IMPLEMENTACION.md` con explicación completa

#### Sistema de Persistencia de Conexiones
- **Storage de Sitios**: `codecrypto_connected_sites` guarda qué sitios están autorizados
- **Permisos por Origen**: Cada sitio tiene su propia cuenta autorizada
- **Verificación en eth_accounts**: Solo sitios autorizados obtienen cuentas
- **Actualización Automática**: Cambio de cuenta sincroniza todos los sitios
- **Documentación**: `FIX_DESCONEXION_SITIOS.md` con explicación del problema y solución

#### Utilidades de Debugging
- **Script de Debugging**: `debug_connected_sites.js` con funciones útiles
- **Comandos Disponibles**:
  - `viewConnectedSites()` - Ver sitios conectados
  - `disconnectSite(url)` - Desconectar sitio específico
  - `disconnectAllSites()` - Desconectar todos
  - `checkSite(url)` - Verificar si sitio está autorizado
  - `viewFullConfig()` - Ver configuración completa
  - `exportConnectedSites()` - Backup de configuración
  - `importConnectedSites(json)` - Restaurar configuración

### 🔧 Cambiado

#### Arquitectura Mejorada
- **Notification.tsx**: Ahora solo aprueba/rechaza (no firma)
- **background.ts**: Centraliza toda la firma de transacciones con EIP-1559
- **Separación de Responsabilidades**: UI vs Lógica crypto bien diferenciadas

#### Seguridad Mejorada
- **Mnemonic solo en background**: Más seguro, no expuesto a UI
- **Permisos estrictos**: Solo sitios autorizados acceden a cuentas
- **Compatible con CSP**: Content Security Policy totalmente cumplida

### 🐛 Corregido

#### Problema de Desconexión
- **Antes**: Sitios se desconectaban cuando service worker dormía
- **Después**: Conexión persiste aunque service worker se reinicie
- **Causa**: Falta de persistencia en `chrome.storage.local`

#### eth_accounts Sin Verificación
- **Antes**: Devolvía cuentas a cualquier sitio
- **Después**: Verifica permisos, solo devuelve a sitios autorizados
- **Beneficio**: Cumple con EIP-1193 y mejora seguridad

### 📚 Documentación

#### Nuevos Archivos
1. **EIP1559_IMPLEMENTACION.md**
   - Explicación del estándar
   - Implementación en el proyecto
   - Guía de verificación
   - Comparación Legacy vs EIP-1559

2. **FIX_DESCONEXION_SITIOS.md**
   - Problema identificado
   - Causa raíz
   - Solución implementada
   - Tests de verificación
   - Comparación Antes vs Después

3. **debug_connected_sites.js**
   - Script de utilidades
   - Funciones de debugging
   - Gestión de sitios conectados

4. **RESUMEN_CAMBIOS.md**
   - Resumen de todos los cambios
   - Archivos modificados
   - Estructura de storage
   - Guía de pruebas

5. **GUIA_RAPIDA_TESTING.md**
   - Test rápido (5 min)
   - Debugging rápido
   - Checklist de verificación
   - Problemas comunes

6. **CHANGELOG.md** (este archivo)
   - Historial de cambios
   - Versiones

---

## [1.0.0] - Versión Inicial

### ✅ Características Principales

- Wallet HD con BIP-39 (12 palabras)
- 5 cuentas derivadas (BIP-44)
- Provider EIP-1193 (`window.codecrypto`)
- Transacciones Ethereum
- Firma EIP-712
- Evento `accountsChanged` y `chainChanged`
- Persistencia en `chrome.storage.local`
- UI con React + TypeScript
- Compatible con Chrome/Edge (Manifest V3)

---

## 📊 Comparación de Versiones

| Característica | v1.0.0 | v1.1.0 |
|----------------|--------|--------|
| **EIP-1559** | ❌ Legacy gas | ✅ Type 2 + maxFee |
| **Persistencia Conexiones** | ❌ Se desconecta | ✅ Persiste |
| **eth_accounts** | ⚠️ Sin verificar | ✅ Con permisos |
| **Arquitectura Firma** | ⚠️ En UI | ✅ En background |
| **Seguridad** | ⚠️ Básica | ✅ Mejorada |
| **UX** | ⚠️ Pide autorización cada vez | ✅ Recuerda sitios |
| **Debugging** | ❌ Sin utilidades | ✅ Script completo |
| **Documentación** | ✅ Básica | ✅ Completa |

---

## 🎯 Especificaciones Cumplidas

### v1.0.0
- ✅ 1-16: Core wallet, operaciones blockchain, UX básica
- ✅ 18-19: EIP-6963, cambio de redes
- ✅ 20-36: UI avanzada, persistencia, Chrome extension

### v1.1.0
- ✅ 17: **EIP-1559 Gas** (ahora completamente implementado)
- ✅ Mejoras UX: Persistencia de conexiones
- ✅ Mejoras Seguridad: Permisos por sitio

---

## 🚀 Migración de v1.0.0 a v1.1.0

### Pasos

1. **Compilar nueva versión:**
   ```bash
   npm run build
   ```

2. **Recargar extensión:**
   - `chrome://extensions/` → Reload

3. **Verificar storage:**
   - Se agregará automáticamente `codecrypto_connected_sites: {}`
   - Configuración existente se mantiene

### Compatibilidad

- ✅ **Backward compatible**: Wallets existentes siguen funcionando
- ✅ **Storage compatible**: No requiere migración
- ✅ **dApps compatible**: Transparente para aplicaciones

### Notas

- Sitios previamente conectados **necesitarán reconectarse** la primera vez
- Esto es esperado y mejora la seguridad
- Después de reconectar, la conexión persistirá

---

## 📝 Notas de Desarrollo

### Versión 1.1.0

**Tiempo de desarrollo:** ~2 horas  
**Complejidad:** Media  
**Testing:** Completo  
**Documentación:** Extensiva  

**Archivos modificados:**
- `src/background.ts` (3 cambios principales)
- `src/Notification.tsx` (1 simplificación)

**Archivos nuevos:**
- 6 archivos de documentación
- 1 script de utilidades

**Líneas de código:**
- Agregadas: ~150 líneas
- Modificadas: ~50 líneas
- Documentación: ~1500 líneas

---

## 🔮 Próximas Versiones (Roadmap)

### v1.2.0 (Planeado)
- [ ] UI para gestionar sitios conectados en el popup
- [ ] Botón "Desconectar" por sitio
- [ ] Lista de sitios conectados visible
- [ ] Exportar/importar configuración desde UI

### v1.3.0 (Planeado)
- [ ] Soporte para múltiples redes custom
- [ ] Agregar red desde UI
- [ ] Permisos por red además de por sitio

### v2.0.0 (Futuro)
- [ ] Soporte ERC-20 tokens
- [ ] NFTs (ERC-721, ERC-1155)
- [ ] Historial de transacciones
- [ ] Address book

---

## 🐛 Issues Conocidos

### v1.1.0
- Ninguno reportado

### v1.0.0 (Resueltos en v1.1.0)
- ~~Sitios se desconectan~~ ✅ Resuelto
- ~~EIP-1559 no implementado~~ ✅ Resuelto
- ~~eth_accounts sin verificar permisos~~ ✅ Resuelto

---

## 🙏 Agradecimientos

- Comunidad Ethereum por los estándares EIP
- Equipo de ethers.js por la librería
- Chrome Extensions Team por Manifest V3

---

**Versión Actual:** 1.1.0  
**Última Actualización:** Octubre 2025  
**Mantenedor:** CodeCrypto Team

