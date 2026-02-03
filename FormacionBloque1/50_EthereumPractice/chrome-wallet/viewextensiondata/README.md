# 🔍 Visor de Datos de Extensión Chrome

Scripts TypeScript para visualizar la base de datos LevelDB donde Chrome almacena los datos de `chrome.storage.local` de la extensión CodeCrypto Wallet.

---

## 🎯 ¿Para Qué Sirve?

Estos scripts te permiten:
- ✅ Ver todos los datos almacenados por la extensión
- ✅ Verificar que el mnemonic se guardó correctamente
- ✅ Ver las 5 cuentas derivadas
- ✅ Ver la cuenta activa
- ✅ Ver el chain ID actual
- ✅ Detectar solicitudes pendientes

---

## 📦 Instalación

```bash
cd viewextensiondata
npm install
```

---

## 🚀 Dos Versiones Disponibles

### Versión 1: Manual (Recomendada)

**Tú cierras Chrome manualmente:**

```bash
# 1. Cerrar Chrome (Cmd+Q)
# 2. Ejecutar
npm run dev
```

### Versión 2: Automática

**El script intenta cerrar Chrome por ti:**

```bash
# Ejecutar (cierra Chrome automáticamente)
npm run auto
```

⚠️  **Advertencia:** La versión automática cierra Chrome sin preguntar. Guarda tu trabajo antes.

---

## 🚀 Uso Detallado

### Opción A: Manual (npm run dev)

```bash
# Paso 1: Cerrar Chrome COMPLETAMENTE
Cmd+Q en Chrome

# Paso 2: Ejecutar
npm run dev
```

### Opción B: Automática (npm run auto)

```bash
# Ejecutar directamente
npm run auto

# El script:
# 1. Verifica si Chrome está corriendo
# 2. Lo cierra automáticamente si es necesario
# 3. Espera 3 segundos
# 4. Lee la base de datos
```

---

## 📊 Output Esperado

### Si la Wallet Está Configurada:

```
🔍 Visor de Datos de Extensión Chrome

Extension ID: olpjfcpnbgdhggbdgljefhgejjhfobal
Ruta DB: /Users/joseviejo/Library/Application Support/Google/Chrome/Default/Local Extension Settings/olpjfcpnbgdhggbdgljefhgejjhfobal

⚠️  IMPORTANTE: Cierra Chrome antes de ejecutar este script

Abriendo base de datos...

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
   Valor: 0x7a69 (Hardhat Local (31337))

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

### Si la Wallet NO Está Configurada:

```
🔍 Visor de Datos de Extensión Chrome

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

## 🛠️ Troubleshooting

### Error: "La ruta de la base de datos no existe"

**Solución:**
1. Verificar que la extensión está instalada en Chrome
2. Ir a `chrome://extensions/` → Details → copiar el ID real
3. Actualizar `EXTENSION_ID` en `src/index.ts`

---

### Error: "IO error: lock"

**Solución:**
Chrome está abierto. Cierra Chrome COMPLETAMENTE:

```bash
# Mac:
Cmd+Q en Chrome

# O forzar cierre:
killall "Google Chrome"

# Esperar 5 segundos y reintentar
```

---

### Error: "Permission denied"

**Solución:**
El script necesita permisos para leer la carpeta de Chrome:

```bash
# Ejecutar con sudo (no recomendado)
sudo npm run dev

# O dar permisos a la terminal en:
System Preferences → Privacy → Full Disk Access
```

---

## 📝 Modificar para Tu Extensión

Si quieres ver datos de otra extensión:

1. Abre `src/index.ts`
2. Cambia el `EXTENSION_ID`:
   ```typescript
   const EXTENSION_ID = 'tu-extension-id-aqui'
   ```
3. Ejecuta: `npm run dev`

---

## 🔧 Estructura del Proyecto

```
viewextensiondata/
├── src/
│   └── index.ts          # Script principal
├── dist/                 # Compilado (generado)
│   └── index.js
├── package.json          # Dependencias
├── tsconfig.json         # Config TypeScript
└── README.md             # Este archivo
```

---

## 📚 Dependencias

- **level**: Librería para leer LevelDB
- **chalk**: Colores en terminal
- **typescript**: Compilador TypeScript
- **@types/node**: Tipos de Node.js

---

## 🔐 Seguridad

⚠️  Este script lee datos sensibles (mnemonic, private keys).

**Recomendaciones:**
- Solo usar en tu máquina local
- No compartir el output si contiene datos reales
- Solo para debugging/desarrollo

---

## 💡 Casos de Uso

### 1. Verificar que la Wallet se Guardó Correctamente

```bash
# Configurar wallet en Chrome
# Cerrar Chrome
# Ejecutar script
npm run dev
# Ver que todos los datos están presentes
```

### 2. Debugging de Problemas

```bash
# Si la wallet da errores
# Ejecutar script
npm run dev
# Ver si falta algún dato o está corrupto
```

### 3. Ver Solicitudes Pendientes

```bash
# Si hay una transacción atascada
npm run dev
# Ver si hay codecrypto_pending_request
```

### 4. Limpiar Datos Manualmente

Aunque puedes usar `chrome.storage.local.clear()` en la consola del service worker, este script te permite ver exactamente qué se va a eliminar primero.

---

## 🎨 Colores de Output

- 🔵 **Azul:** Títulos y separadores
- 🟢 **Verde:** Valores y success
- 🟡 **Amarillo:** Advertencias y tipos
- 🔴 **Rojo:** Errores
- ⚪ **Gris:** Info secundaria

---

## ⚡ Quick Commands

```bash
# Ver datos
npm run dev

# Solo compilar
npm run build

# Ejecutar compilado
npm start
```

---

## 🎓 Aprendizaje

Este proyecto demuestra:

- ✅ Lectura de LevelDB con Node.js
- ✅ TypeScript para scripts de terminal
- ✅ Manejo de archivos del sistema
- ✅ Output formateado con colores
- ✅ Error handling robusto

---

**¡Cierra Chrome y ejecuta `npm run dev`!** 🚀

