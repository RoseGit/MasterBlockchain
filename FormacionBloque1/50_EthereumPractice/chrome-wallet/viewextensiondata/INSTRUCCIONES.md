# 📖 Instrucciones de Uso - Visor de Datos de Extensión

## ⚡ Inicio Rápido

```bash
# 1. Instalar
cd viewextensiondata
npm install

# 2. CERRAR CHROME COMPLETAMENTE
# Cmd+Q en Mac, o killall "Google Chrome"

# 3. Ejecutar
npm run dev
```

---

## 🎯 ¿Qué Hace Este Script?

Lee la base de datos **LevelDB** donde Chrome almacena los datos de `chrome.storage.local` para la extensión CodeCrypto Wallet.

**Datos que muestra:**
- 🔑 Mnemonic (frase de recuperación)
- 👛 Cuentas derivadas (5 direcciones)
- 🎯 Cuenta activa (índice 0-4)
- 🌐 Chain ID actual (0x7a69 o 0xaa36a7)
- ⏳ Solicitudes pendientes (si las hay)

---

## 📍 Ubicación de la Base de Datos

```
/Users/joseviejo/Library/Application Support/Google/Chrome/Default/Local Extension Settings/olpjfcpnbgdhggbdgljefhgejjhfobal
                                                                    └──────────────────┬──────────────────┘
                                                                                Extension ID
```

**Para encontrar tu Extension ID:**
1. `chrome://extensions/`
2. Click en "Details" de CodeCrypto Wallet
3. Copiar el ID de la URL

---

## 🔧 Personalización

Si cambia el Extension ID (ej. después de rebuild):

1. Abrir `src/index.ts`
2. Actualizar la constante:
   ```typescript
   const EXTENSION_ID = 'tu-nuevo-id-aqui'
   ```
3. Ejecutar de nuevo: `npm run dev`

---

## 📊 Ejemplos de Output

### Ejemplo 1: Wallet Configurada

```
🔑 Key: codecrypto_mnemonic
──────────────────────────────────────────────────────────────────
   Tipo: Mnemonic (Frase de Recuperación)
   Valor: test test test test test test test test test test test junk

🔑 Key: codecrypto_accounts
──────────────────────────────────────────────────────────────────
   Tipo: Array de Cuentas
   [0] 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   [1] 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   [2] 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
   [3] 0x90F79bf6EB2c4f870365E785982E1f101E93b906
   [4] 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65

🔑 Key: codecrypto_current_account
──────────────────────────────────────────────────────────────────
   Tipo: Índice de Cuenta Actual
   Valor: 0 (Cuenta 0)

🔑 Key: codecrypto_chain_id
──────────────────────────────────────────────────────────────────
   Tipo: Chain ID
   Valor: 0x7a69 (Hardhat Local (31337))

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

### Ejemplo 2: Wallet NO Configurada

```
✅ Base de datos leída exitosamente

📊 Total de entradas: 0

⚠️  La base de datos está vacía
   Esto puede significar que la wallet no ha sido configurada aún

📋 RESUMEN:
  Mnemonic guardado: ❌ No
  Cuentas derivadas: ❌ No
  Cuenta actual: ❌ No
  Chain ID: ❌ No
  Solicitud pendiente: ✅ No

❌ WALLET NO CONFIGURADA

   Para configurar:
   1. Abrir popup de la extensión
   2. Ingresar mnemonic
   3. Click "Cargar Wallet"
```

---

### Ejemplo 3: Solicitud Pendiente

```
🔑 Key: codecrypto_pending_request
──────────────────────────────────────────────────────────────────
   Tipo: Solicitud Pendiente
   Valor:
{
  "approvalId": 1,
  "method": "eth_sendTransaction",
  "params": [
    {
      "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "value": "0x16345785d8a0000",
      "data": "0x"
    }
  ],
  "chainId": "0x7a69"
}

📋 RESUMEN:
  ...
  Solicitud pendiente: ⚠️  Sí
```

**Esto indica que hay una transacción esperando aprobación.**

---

## 🎨 Colores del Output

El script usa colores para facilitar la lectura:

- **Azul (🔵):** Títulos, separadores
- **Verde (🟢):** Valores, éxitos
- **Amarillo (🟡):** Advertencias, tipos
- **Rojo (🔴):** Errores
- **Gris (⚪):** Información secundaria
- **Cyan (🔷):** Nombres de keys, IDs

---

## 🔍 Casos de Uso

### Caso 1: Verificar Configuración

```bash
# Después de configurar la wallet
1. Cerrar Chrome
2. npm run dev
3. Verificar que todos los datos están ✅
```

### Caso 2: Debugging de Errores

```bash
# Si la extensión da error "No accounts available"
1. Cerrar Chrome
2. npm run dev
3. Ver si codecrypto_accounts existe y tiene 5 elementos
```

### Caso 3: Ver Cuenta Activa

```bash
# Para saber qué cuenta está seleccionada
1. Cerrar Chrome
2. npm run dev
3. Ver codecrypto_current_account (debería ser 0-4)
```

### Caso 4: Verificar Chain ID

```bash
# Para ver en qué red estás
1. Cerrar Chrome
2. npm run dev
3. Ver codecrypto_chain_id:
   - 0x7a69 = Hardhat (31337)
   - 0xaa36a7 = Sepolia (11155111)
```

---

## 🧪 Testing del Script

### Test 1: Base de Datos Vacía

```bash
# 1. Limpiar storage desde Chrome
chrome://extensions/ → service worker → console
chrome.storage.local.clear()

# 2. Cerrar Chrome
# 3. Ejecutar script
npm run dev

# Resultado esperado:
📊 Total de entradas: 0
❌ WALLET NO CONFIGURADA
```

---

### Test 2: Wallet Configurada

```bash
# 1. Configurar wallet en Chrome
# 2. Cerrar Chrome
# 3. Ejecutar script
npm run dev

# Resultado esperado:
📊 Total de entradas: 4
✅ WALLET CONFIGURADA CORRECTAMENTE
Número de cuentas: 5
```

---

### Test 3: Con Solicitud Pendiente

```bash
# 1. En test.html, enviar TX pero NO aprobar
# 2. Esperar que se abra notification.html
# 3. NO aprobar, dejar pendiente
# 4. Cerrar Chrome
# 5. Ejecutar script
npm run dev

# Resultado esperado:
Solicitud pendiente: ⚠️  Sí
codecrypto_pending_request: { approvalId: 1, ... }
```

---

## 🛡️ Limitaciones

### 1. Chrome Debe Estar Cerrado

LevelDB solo permite un proceso a la vez. Si Chrome está abierto, LevelDB está bloqueado.

### 2. Solo Lectura

Este script solo LEE datos, no los modifica. Para modificar, usa:
- `chrome.storage.local.set()` desde la consola del service worker
- O la UI de la extensión

### 3. Extensión Específica

Lee datos de UNA extensión específica (EXTENSION_ID). Para ver datos de otra extensión, debes cambiar el ID.

---

## 📂 Ubicaciones Alternativas

### Chrome (Mac):
```
~/Library/Application Support/Google/Chrome/Default/Local Extension Settings/EXTENSION_ID
```

### Chrome (Windows):
```
C:\Users\USERNAME\AppData\Local\Google\Chrome\User Data\Default\Local Extension Settings\EXTENSION_ID
```

### Chrome (Linux):
```
~/.config/google-chrome/Default/Local Extension Settings/EXTENSION_ID
```

### Edge (Mac):
```
~/Library/Application Support/Microsoft Edge/Default/Local Extension Settings/EXTENSION_ID
```

---

## 🔄 Actualizar para Otro Sistema Operativo

Si estás en Windows o Linux:

1. Abrir `src/index.ts`
2. Actualizar `DB_PATH`:
   ```typescript
   // Windows
   const DB_PATH = `C:\\Users\\USERNAME\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Extension Settings\\${EXTENSION_ID}`
   
   // Linux
   const DB_PATH = `${process.env.HOME}/.config/google-chrome/Default/Local Extension Settings/${EXTENSION_ID}`
   ```

---

## 💡 Tips

### Tip 1: Alias de Terminal

```bash
# En ~/.zshrc o ~/.bashrc:
alias viewwallet='cd /path/to/viewextensiondata && npm run dev'

# Luego solo:
viewwallet
```

### Tip 2: Watch Mode

Para ver cambios en tiempo real:

```bash
# Terminal 1: Compilar en watch mode
npm run build -- --watch

# Terminal 2: Ejecutar cuando cambies código
npm start
```

### Tip 3: Export a JSON

Modificar `src/index.ts` para exportar:

```typescript
// Al final del script:
const outputPath = './extension-data.json'
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
console.log(`✅ Datos exportados a: ${outputPath}`)
```

---

**¡El visor de datos está listo para usar!** 🔍

**Recuerda: SIEMPRE cierra Chrome antes de ejecutarlo.** ⚠️

