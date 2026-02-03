import { Level } from 'level'
import chalk from 'chalk'
import * as fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Ruta a la base de datos de la extensión
const EXTENSION_ID = 'olpjfcpnbgdhggbdgljefhgejjhfobal'
                      
const DB_PATH = `/Users/joseviejo/Library/Application Support/Google/Chrome/Default/Local Extension Settings/${EXTENSION_ID}`

interface ExtensionData {
  [key: string]: any
}

async function closeChromeIfRunning(): Promise<boolean> {
  try {
    console.log(chalk.yellow('🔍 Verificando si Chrome está corriendo...\n'))
    
    // Verificar si Chrome está corriendo
    const { stdout } = await execAsync('pgrep -x "Google Chrome"')
    
    if (stdout.trim()) {
      console.log(chalk.yellow('⚠️  Chrome está corriendo. Intentando cerrar...\n'))
      
      // Intentar cerrar Chrome
      await execAsync('killall "Google Chrome"')
      
      console.log(chalk.green('✅ Chrome cerrado\n'))
      console.log(chalk.gray('Esperando 3 segundos para que libere la base de datos...\n'))
      
      // Esperar 3 segundos
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      return true
    } else {
      console.log(chalk.green('✅ Chrome no está corriendo\n'))
      return false
    }
  } catch (error) {
    // Si pgrep no encuentra el proceso, lanza error (código 1)
    // Eso significa que Chrome no está corriendo
    console.log(chalk.green('✅ Chrome no está corriendo\n'))
    return false
  }
}

async function viewExtensionData() {
  console.log(chalk.blue.bold('\n🔍 Visor Automático de Datos de Extensión Chrome\n'))
  console.log(chalk.blue('═'.repeat(70)))
  console.log('')

  // Cerrar Chrome automáticamente si está corriendo
  await closeChromeIfRunning()

  console.log(chalk.gray('Extension ID:'), chalk.cyan(EXTENSION_ID))
  console.log(chalk.gray('Ruta DB:'), chalk.cyan(DB_PATH))
  console.log('')

  // Verificar que existe el directorio
  if (!fs.existsSync(DB_PATH)) {
    console.error(chalk.red('❌ Error: La ruta de la base de datos no existe\n'))
    console.log(chalk.yellow('Verifica que:'))
    console.log('  1. La extensión está instalada')
    console.log('  2. El Extension ID es correcto')
    console.log('')
    console.log(chalk.gray('Para encontrar el ID:'))
    console.log(chalk.gray('  chrome://extensions/ → Details → Copiar ID de la URL'))
    console.log('')
    process.exit(1)
  }

  try {
    console.log(chalk.gray('Abriendo base de datos en modo lectura...\n'))

    // Abrir la base de datos LevelDB
    const db = new Level(DB_PATH, { 
      valueEncoding: 'json',
      createIfMissing: false
    })

    const data: ExtensionData = {}
    let count = 0

    // Crear el iterador
    const iterator = db.iterator()

    // Leer todas las entradas
    try {
      for await (const [key, value] of iterator) {
        data[key] = value
        count++
      }
    } catch (iterError: any) {
      // El iterador puede cerrarse automáticamente
      if (!iterError.message.includes('not open')) {
        console.log(chalk.yellow('⚠️  Advertencia al iterar:', iterError.message))
      }
    }

    // Cerrar la base de datos
    try {
      await db.close()
    } catch (closeError) {
      // Ignorar errores al cerrar
    }

    console.log(chalk.green(`✅ Base de datos leída exitosamente\n`))
    console.log(chalk.blue(`📊 Total de entradas: ${count}\n`))

    if (count === 0) {
      console.log(chalk.yellow('⚠️  La base de datos está vacía'))
      console.log(chalk.gray('   Esto significa que la wallet no ha sido configurada aún\n'))
      console.log(chalk.gray('   Para configurar:'))
      console.log(chalk.gray('   1. Abrir Chrome'))
      console.log(chalk.gray('   2. Click en ícono de CodeCrypto'))
      console.log(chalk.gray('   3. Ingresar mnemonic'))
      console.log(chalk.gray('   4. Click "Cargar Wallet"\n'))
      return
    }

    // Mostrar datos formateados
    console.log(chalk.blue('═'.repeat(70)))
    console.log(chalk.bold.white('📦 DATOS DE LA EXTENSIÓN'))
    console.log(chalk.blue('═'.repeat(70)))
    console.log('')

    // Ordenar keys
    const sortedKeys = Object.keys(data).sort()

    for (const key of sortedKeys) {
      const value = data[key]

      console.log(chalk.cyan('🔑 Key:'), chalk.bold.white(key))
      console.log(chalk.gray('─'.repeat(70)))

      // Formatear según el tipo
      if (key.includes('mnemonic')) {
        console.log(chalk.yellow('   Tipo:'), 'Mnemonic (Frase de Recuperación)')
        console.log(chalk.white('   Valor:'), chalk.green(value))
      } else if (key.includes('accounts')) {
        console.log(chalk.yellow('   Tipo:'), 'Array de Cuentas')
        if (Array.isArray(value)) {
          value.forEach((account, index) => {
            console.log(chalk.white(`   [${index}]`), chalk.green(account))
          })
        }
      } else if (key.includes('chain_id')) {
        console.log(chalk.yellow('   Tipo:'), 'Chain ID')
        const chainName = value === '0x7a69' 
          ? 'Hardhat Local (31337)' 
          : value === '0xaa36a7' 
            ? 'Sepolia (11155111)' 
            : 'Desconocida'
        console.log(chalk.white('   Valor:'), chalk.green(value), chalk.gray(chainName))
      } else if (key.includes('current_account')) {
        console.log(chalk.yellow('   Tipo:'), 'Índice de Cuenta Actual')
        console.log(chalk.white('   Valor:'), chalk.green(value), chalk.gray(`(Cuenta ${value})`))
      } else if (key.includes('pending_request')) {
        console.log(chalk.yellow('   Tipo:'), 'Solicitud Pendiente')
        console.log(chalk.white('   Detalles:'))
        console.log(chalk.gray(JSON.stringify(value, null, 2)))
      } else {
        console.log(chalk.yellow('   Tipo:'), 'Dato Genérico')
        if (typeof value === 'object') {
          console.log(chalk.white('   Valor:'))
          console.log(chalk.gray(JSON.stringify(value, null, 2)))
        } else {
          console.log(chalk.white('   Valor:'), chalk.green(String(value)))
        }
      }

      console.log('')
    }

    console.log(chalk.blue('═'.repeat(70)))
    console.log('')

    // Resumen
    console.log(chalk.bold.white('📋 RESUMEN:\n'))

    const hasMnemonic = sortedKeys.some(k => k.includes('mnemonic'))
    const hasAccounts = sortedKeys.some(k => k.includes('accounts'))
    const hasCurrentAccount = sortedKeys.some(k => k.includes('current_account'))
    const hasChainId = sortedKeys.some(k => k.includes('chain_id'))
    const hasPendingRequest = sortedKeys.some(k => k.includes('pending_request'))

    console.log(chalk.gray('  Mnemonic guardado:'), hasMnemonic ? chalk.green('✅ Sí') : chalk.red('❌ No'))
    console.log(chalk.gray('  Cuentas derivadas:'), hasAccounts ? chalk.green('✅ Sí') : chalk.red('❌ No'))
    console.log(chalk.gray('  Cuenta actual:'), hasCurrentAccount ? chalk.green('✅ Sí') : chalk.red('❌ No'))
    console.log(chalk.gray('  Chain ID:'), hasChainId ? chalk.green('✅ Sí') : chalk.red('❌ No'))
    console.log(chalk.gray('  Solicitud pendiente:'), hasPendingRequest ? chalk.yellow('⚠️  Sí') : chalk.green('✅ No'))

    if (hasAccounts) {
      const accountsKey = sortedKeys.find(k => k.includes('accounts'))
      if (accountsKey) {
        const accounts = data[accountsKey]
        if (Array.isArray(accounts)) {
          console.log(chalk.gray('  Número de cuentas:'), chalk.cyan(accounts.length))
        }
      }
    }

    console.log('')

    // Estado
    if (hasMnemonic && hasAccounts && hasCurrentAccount) {
      console.log(chalk.green.bold('✅ WALLET CONFIGURADA CORRECTAMENTE\n'))
    } else {
      console.log(chalk.red.bold('❌ WALLET NO CONFIGURADA\n'))
      console.log(chalk.gray('   Para configurar:'))
      console.log(chalk.gray('   1. Abrir Chrome'))
      console.log(chalk.gray('   2. Click en ícono de CodeCrypto'))
      console.log(chalk.gray('   3. Ingresar mnemonic'))
      console.log(chalk.gray('   4. Click "Cargar Wallet"\n'))
    }

  } catch (error: any) {
    console.error(chalk.red('\n❌ Error leyendo la base de datos:'))
    console.error(chalk.red(error.message))
    
    if (error.message.includes('IO error') || error.message.includes('lock')) {
      console.log(chalk.yellow('\n⚠️  La base de datos está bloqueada'))
      console.log(chalk.gray('   Chrome puede estar aún corriendo en segundo plano'))
      console.log(chalk.gray('   Espera 10 segundos y vuelve a intentar\n'))
    }
    
    console.log('')
    process.exit(1)
  }
}

// Ejecutar
viewExtensionData().catch((error) => {
  console.error(chalk.red('Error fatal:'), error)
  process.exit(1)
})

