# 📖 Cómo Usar el Visor de Datos

## ⚡ Inicio Rápido (3 pasos)

### Opción A: Manual (Más Segura)

```bash
# 1. Cerrar Chrome
Cmd+Q

# 2. Ir a la carpeta
cd viewextensiondata

# 3. Ejecutar
npm run dev
```

---

### Opción B: Automática (Más Rápida)

```bash
# 1. Ir a la carpeta
cd viewextensiondata

# 2. Ejecutar (cierra Chrome automáticamente)
npm run auto
```

---

## 🎯 ¿Qué Verás?

```
🔍 Visor de Datos de Extensión Chrome
══════════════════════════════════════════════════════════════════

Extension ID: olpjfcpnbgdhggbdgljefhgejjhfobal
Ruta DB: .../Local Extension Settings/olpjfcpnbgdhggbdgljefhgejjhfobal

✅ Base de datos leída exitosamente

📊 Total de entradas: 4

══════════════════════════════════════════════════════════════════
📦 DATOS DE LA EXTENSIÓN
══════════════════════════════════════════════════════════════════

🔑 Key: codecrypto_accounts
──────────────────────────────────────────────────────────────────
   Tipo: Array de Cuentas
   [0] 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   [1] 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   [2] 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
   [3] 0x90F79bf6EB2c4f870365E785982E1f101E93b906
   [4] 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65

🔑 Key: codecrypto_chain_id
──────────────────────────────────────────────────────────────────
   Tipo: Chain ID
   Valor: 0x7a69 Hardhat Local (31337)

🔑 Key: codecrypto_current_account
──────────────────────────────────────────────────────────────────
   Tipo: Índice de Cuenta Actual
   Valor: 0 (Cuenta 0)

🔑 Key: codecrypto_mnemonic
──────────────────────────────────────────────────────────────────
   Tipo: Mnemonic (Frase de Recuperación)
   Valor: test test test test test test test test test test test junk

══════════════════════════════════════════════════════════════════

📋 RESUMEN:

  Mnemonic guardado: ✅ Sí
  Cuentas derivadas: ✅ Sí
  Cuenta actual: ✅ Sí
  Chain ID: ✅ Sí
  Solicitud pendiente: ✅ No
  Número de cuentas: 5

✅ WALLET CONFIGURADA CORRECTAMENTE
```

---

## 🎨 Significado de los Colores

- 🔵 **Azul:** Títulos y separadores
- 🟢 **Verde:** Valores y confirmaciones (✅)
- 🟡 **Amarillo:** Advertencias y tipos de dato
- 🔴 **Rojo:** Errores (❌)
- ⚪ **Gris:** Información secundaria
- 🔷 **Cyan:** Keys y números

---

## 📋 Datos que Muestra

### 1. codecrypto_mnemonic
```
Tipo: Mnemonic (Frase de Recuperación)
Valor: test test test test test test test test test test test junk
```

**Qué es:** La frase de 12 palabras BIP-39 que genera todas las cuentas.

---

### 2. codecrypto_accounts
```
Tipo: Array de Cuentas
[0] 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
[1] 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
[2] 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
[3] 0x90F79bf6EB2c4f870365E785982E1f101E93b906
[4] 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
```

**Qué es:** Las 5 direcciones derivadas usando BIP-44 (m/44'/60'/0'/0/0 a /4).

---

### 3. codecrypto_current_account
```
Tipo: Índice de Cuenta Actual
Valor: 0 (Cuenta 0)
```

**Qué es:** Índice (0-4) de la cuenta que está activa en la wallet.

---

### 4. codecrypto_chain_id
```
Tipo: Chain ID
Valor: 0x7a69 Hardhat Local (31337)
```

**Qué es:** La red blockchain actual:
- `0x7a69` = Hardhat Local (31337)
- `0xaa36a7` = Sepolia Testnet (11155111)

---

### 5. codecrypto_pending_request (Si existe)
```
Tipo: Solicitud Pendiente
Detalles:
{
  "approvalId": 1,
  "method": "eth_sendTransaction",
  "params": [...]
}
```

**Qué es:** Una transacción esperando aprobación del usuario.

---

## 🔧 Troubleshooting

### Error: "IO error: lock"

**Causa:** Chrome está abierto.

**Solución:**
```bash
# Cerrar Chrome
Cmd+Q

# O forzar cierre
killall "Google Chrome"

# Esperar 5 segundos
sleep 5

# Reintentar
npm run dev
```

---

### Error: "La ruta no existe"

**Causa:** Extension ID incorrecto o extensión no instalada.

**Solución:**
```bash
# 1. Abrir Chrome
# 2. chrome://extensions/
# 3. CodeCrypto Wallet → Details
# 4. Copiar ID de la URL
# 5. Editar src/index.ts:
const EXTENSION_ID = 'tu-id-aqui'
# 6. Recompilar:
npm run build
```

---

### Chrome No Se Cierra (versión auto)

**Causa:** Puede haber procesos de Chrome en segundo plano.

**Solución:**
```bash
# Ver procesos de Chrome
pgrep -l Chrome

# Forzar cierre de todos
killall -9 "Google Chrome"
killall -9 "Google Chrome Helper"

# Esperar 10 segundos
sleep 10

# Reintentar
npm run auto
```

---

## 📊 Casos de Uso

### Caso 1: Verificar Configuración

```bash
# Después de configurar la wallet en Chrome
Cmd+Q  # Cerrar Chrome
npm run dev

# Ver que todo está ✅
```

---

### Caso 2: Debugging "No accounts available"

```bash
# Si la extensión da ese error
Cmd+Q
npm run dev

# Verificar:
# - ¿Existe codecrypto_accounts?
# - ¿Tiene 5 elementos?
# - ¿codecrypto_current_account es 0-4?
```

---

### Caso 3: Ver Qué Cuenta Está Activa

```bash
npm run dev

# Buscar:
codecrypto_current_account: 0  ← Cuenta activa
```

---

### Caso 4: Ver en Qué Red Estás

```bash
npm run dev

# Buscar:
codecrypto_chain_id: 0x7a69    ← Hardhat
codecrypto_chain_id: 0xaa36a7  ← Sepolia
```

---

### Caso 5: Detectar Transacciones Atascadas

```bash
# Si una TX no se completó
npm run dev

# Buscar:
codecrypto_pending_request
```

Si existe, significa que hay una solicitud pendiente que no se completó.

**Solución:**
```bash
# Desde service worker console (con Chrome abierto):
chrome.storage.local.remove('codecrypto_pending_request')
```

---

## 🎯 Comparación de Versiones

| Característica | Manual (dev) | Automática (auto) |
|----------------|--------------|-------------------|
| Cierra Chrome | ❌ Tú lo haces | ✅ Script lo hace |
| Seguridad | ✅ Más segura | ⚠️  Menos segura |
| Velocidad | ⏱️ Más lenta | ⚡ Más rápida |
| Requiere sudo | ❌ No | ❌ No |
| Guarda trabajo | ✅ Tú decides | ⚠️  Cierra inmediatamente |

**Recomendación:** Usar `npm run dev` (manual) salvo que estés haciendo pruebas rápidas.

---

## 📁 Archivos

```
viewextensiondata/
├── src/
│   ├── index.ts         ← Versión manual
│   └── view-auto.ts     ← Versión automática
├── dist/                ← Compilados
│   ├── index.js
│   └── view-auto.js
├── package.json
├── tsconfig.json
├── README.md            ← Este archivo
├── INSTRUCCIONES.md     ← Guía detallada
└── COMO_USAR.md         ← Este archivo
```

---

## 🔍 Entender el Output

### Sección 1: Info General

```
Extension ID: olpjfcpnbgdhggbdgljefhgejjhfobal
Ruta DB: .../Local Extension Settings/...
```

Información básica de la extensión.

---

### Sección 2: Datos

```
🔑 Key: codecrypto_mnemonic
──────────────────────────────────────────
   Tipo: Mnemonic
   Valor: test test test...
```

Cada clave (key) almacenada con su tipo y valor.

---

### Sección 3: Resumen

```
📋 RESUMEN:
  Mnemonic guardado: ✅ Sí
  Cuentas derivadas: ✅ Sí
  ...
```

Checklist rápido del estado de la wallet.

---

### Sección 4: Estado Final

```
✅ WALLET CONFIGURADA CORRECTAMENTE
```

O:

```
❌ WALLET NO CONFIGURADA
```

Diagnóstico general.

---

## 💡 Tips

### Tip 1: Alias de Terminal

```bash
# En ~/.zshrc:
alias viewdb='cd /path/to/viewextensiondata && npm run auto'

# Luego solo:
viewdb
```

---

### Tip 2: Ver Solo Resumen

Puedes modificar `src/index.ts` para mostrar solo el resumen:

```typescript
// Comentar la sección de "Mostrar datos formateados"
// Dejar solo la sección "Resumen"
```

---

### Tip 3: Exportar a JSON

Agregar al final de `src/index.ts`:

```typescript
import * as fs from 'fs'

// Exportar a archivo
fs.writeFileSync('./extension-data.json', JSON.stringify(data, null, 2))
console.log('✅ Exportado a extension-data.json')
```

---

## 🎓 Código de Interés

### Abrir LevelDB:

```typescript
import { Level } from 'level'

const db = new Level(DB_PATH, { valueEncoding: 'json' })

// Leer todas las entradas
for await (const [key, value] of db.iterator()) {
  console.log(key, value)
}

await db.close()
```

### Cerrar Chrome Programáticamente:

```typescript
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Verificar si está corriendo
const { stdout } = await execAsync('pgrep -x "Google Chrome"')

if (stdout.trim()) {
  // Cerrar
  await execAsync('killall "Google Chrome"')
  
  // Esperar
  await new Promise(resolve => setTimeout(resolve, 3000))
}
```

---

## ✅ Checklist

Antes de ejecutar:

- [ ] npm install ejecutado
- [ ] Chrome cerrado (si usas `npm run dev`)
- [ ] Extension ID correcto en src/index.ts

Al ejecutar:

- [ ] No hay errores
- [ ] Muestra entradas (si wallet está configurada)
- [ ] Resumen tiene todos los ✅

---

**¡El visor está listo para usar!** 🚀

**Recomendado:** `npm run dev` (manual) - Más seguro

