# 📚 Recursos y Referencias - CodeCrypto Wallet

## 🔗 Enlaces Útiles por Categoría

---

## 📜 EIPs (Ethereum Improvement Proposals)

### Sitio Oficial

**EIPs.ethereum.org** (Todos los EIPs)  
🔗 https://eips.ethereum.org/

**GitHub de EIPs** (Código fuente y discusiones)  
🔗 https://github.com/ethereum/EIPs

---

### EIPs Implementados en este Proyecto

#### EIP-155: Simple Replay Attack Protection
🔗 https://eips.ethereum.org/EIPS/eip-155  
📝 Protección contra ataques de replay en transacciones  
✅ Implementado: chainId en transacciones

#### EIP-1193: Ethereum Provider JavaScript API
🔗 https://eips.ethereum.org/EIPS/eip-1193  
📝 Estándar para proveedores Ethereum (window.ethereum)  
✅ Implementado: `window.codecrypto` con métodos `request()`, `on()`, etc.

**Recursos adicionales:**
- Guía completa: https://docs.metamask.io/wallet/concepts/provider-api/
- Tutorial: https://ethereum.org/en/developers/docs/apis/javascript/

#### EIP-712: Typed Structured Data Hashing and Signing
🔗 https://eips.ethereum.org/EIPS/eip-712  
📝 Firmas tipadas estructuradas (más seguras que firmas simples)  
✅ Implementado: `eth_signTypedData_v4`

**Recursos adicionales:**
- Playground interactivo: https://eip712-playground.com/
- Tutorial MetaMask: https://docs.metamask.io/wallet/how-to/sign-data/
- Ejemplos: https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js

#### EIP-1559: Fee Market Change for ETH 1.0 Chain
🔗 https://eips.ethereum.org/EIPS/eip-1559  
📝 Nuevo mecanismo de gas con base fee y priority fee  
✅ Implementado: `maxFeePerGas`, `maxPriorityFeePerGas`, tipo de transacción 2

**Recursos adicionales:**
- Guía visual: https://www.blocknative.com/blog/eip-1559-fees
- Calculator: https://etherscan.io/gastracker
- Explicación en video: https://www.youtube.com/watch?v=MGemhK9t44Q

#### EIP-6963: Multi Injected Provider Discovery
🔗 https://eips.ethereum.org/EIPS/eip-6963  
📝 Mecanismo para detectar múltiples wallets (MetaMask, Coinbase, etc.)  
✅ Implementado: Eventos `eip6963:announceProvider` y `eip6963:requestProvider`

**Recursos adicionales:**
- Guía de implementación: https://docs.metamask.io/wallet/concepts/wallet-interoperability/
- Ejemplos: https://github.com/WalletConnect/EIP6963

---

### Otros EIPs Relevantes (No implementados, pero útiles)

#### EIP-20: Token Standard (ERC-20)
🔗 https://eips.ethereum.org/EIPS/eip-20  
📝 Estándar para tokens fungibles

#### EIP-721: Non-Fungible Token Standard (NFT)
🔗 https://eips.ethereum.org/EIPS/eip-721  
📝 Estándar para NFTs

#### EIP-1155: Multi Token Standard
🔗 https://eips.ethereum.org/EIPS/eip-1155  
📝 Estándar para tokens multi-tipo

#### EIP-2612: Permit Extension for EIP-20
🔗 https://eips.ethereum.org/EIPS/eip-2612  
📝 Aprobaciones de tokens sin gas

#### EIP-4337: Account Abstraction
🔗 https://eips.ethereum.org/EIPS/eip-4337  
📝 Abstracción de cuentas (próxima generación de wallets)

---

## 🔧 Chrome Extensions (Manifest V3)

### Documentación Oficial

**Chrome Extensions Overview**  
🔗 https://developer.chrome.com/docs/extensions/

**Manifest V3 Migration Guide**  
🔗 https://developer.chrome.com/docs/extensions/migrating/

**Service Workers en Extensions**  
🔗 https://developer.chrome.com/docs/extensions/mv3/service-workers/

**Content Scripts**  
🔗 https://developer.chrome.com/docs/extensions/mv3/content_scripts/

**chrome.storage API**  
🔗 https://developer.chrome.com/docs/extensions/reference/storage/

**chrome.runtime API**  
🔗 https://developer.chrome.com/docs/extensions/reference/runtime/

**chrome.tabs API**  
🔗 https://developer.chrome.com/docs/extensions/reference/tabs/

---

### Guías y Tutoriales

**Getting Started Tutorial**  
🔗 https://developer.chrome.com/docs/extensions/mv3/getstarted/

**Extension Development Basics**  
🔗 https://developer.chrome.com/docs/extensions/mv3/overview/

**Debugging Extensions**  
🔗 https://developer.chrome.com/docs/extensions/mv3/devguide/debugging/

**Publishing to Chrome Web Store**  
🔗 https://developer.chrome.com/docs/webstore/publish/

---

### Herramientas y Recursos

**Extension Samples (GitHub)**  
🔗 https://github.com/GoogleChrome/chrome-extensions-samples

**Extension TypeScript Starter**  
🔗 https://github.com/chibat/chrome-extension-typescript-starter

**Chrome Extension CLI**  
🔗 https://github.com/dutiyesh/chrome-extension-cli

---

### Manifest V3 - APIs Clave

**chrome.action** (Popup y Badge)  
🔗 https://developer.chrome.com/docs/extensions/reference/action/

**chrome.windows** (Gestión de ventanas)  
🔗 https://developer.chrome.com/docs/extensions/reference/windows/

**chrome.notifications** (Notificaciones del sistema)  
🔗 https://developer.chrome.com/docs/extensions/reference/notifications/

**Message Passing** (Comunicación entre componentes)  
🔗 https://developer.chrome.com/docs/extensions/mv3/messaging/

**Content Security Policy**  
🔗 https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#content-security-policy

---

## ⚡ Vite

### Documentación Oficial

**Vite Homepage**  
🔗 https://vitejs.dev/

**Getting Started**  
🔗 https://vitejs.dev/guide/

**Configuración (vite.config)**  
🔗 https://vitejs.dev/config/

**Build Optimizations**  
🔗 https://vitejs.dev/guide/build.html

**Plugin API**  
🔗 https://vitejs.dev/guide/api-plugin.html

---

### Vite + React

**Vite + React Guide**  
🔗 https://vitejs.dev/guide/features.html#react

**@vitejs/plugin-react**  
🔗 https://github.com/vitejs/vite-plugin-react

---

### Vite + TypeScript

**TypeScript en Vite**  
🔗 https://vitejs.dev/guide/features.html#typescript

**tsconfig.json Reference**  
🔗 https://www.typescriptlang.org/tsconfig

---

### Vite Plugins Útiles

**vite-plugin-checker** (Type checking)  
🔗 https://github.com/fi3ework/vite-plugin-checker

**vite-plugin-compression** (Compresión gzip/brotli)  
🔗 https://github.com/vbenjs/vite-plugin-compression

**rollup-plugin-visualizer** (Análisis de bundle)  
🔗 https://github.com/btd/rollup-plugin-visualizer

---

### Build para Chrome Extensions

**vite-plugin-web-extension**  
🔗 https://github.com/aklinker1/vite-plugin-web-extension

**CRXJS Vite Plugin**  
🔗 https://crxjs.dev/vite-plugin/

**Manual: Building Extensions with Vite**  
🔗 https://dev.to/jacksteamdev/create-a-chrome-extension-with-vite-react-and-typescript-5f1h

---

## 📦 Ethers.js

### Documentación Oficial

**Ethers.js v6 Documentation**  
🔗 https://docs.ethers.org/v6/

**Getting Started**  
🔗 https://docs.ethers.org/v6/getting-started/

**Providers**  
🔗 https://docs.ethers.org/v6/api/providers/

**Signers y Wallets**  
🔗 https://docs.ethers.org/v6/api/wallet/

**HD Wallets (BIP-32/BIP-44)**  
🔗 https://docs.ethers.org/v6/api/wallet/#HDNodeWallet

**Transactions**  
🔗 https://docs.ethers.org/v6/api/transaction/

**Contract Interaction**  
🔗 https://docs.ethers.org/v6/api/contract/

---

### Tutoriales y Guías

**Ethers.js Cookbook**  
🔗 https://github.com/ethers-io/ethers.js/tree/main/docs

**Building a DApp with Ethers.js**  
🔗 https://ethereum.org/en/developers/tutorials/

**Migration Guide v5 → v6**  
🔗 https://docs.ethers.org/v6/migrating/

---

## 🔐 Criptografía y Wallets

### BIP Standards

**BIP-39: Mnemonic Code**  
🔗 https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki  
📝 Generación de frases de recuperación de 12/24 palabras

**BIP-32: Hierarchical Deterministic Wallets**  
🔗 https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki  
📝 Derivación de claves jerárquicas

**BIP-44: Multi-Account Hierarchy**  
🔗 https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki  
📝 Estructura de rutas: m/44'/60'/0'/0/0

**BIP-39 Wordlist (Español)**  
🔗 https://github.com/bitcoin/bips/blob/master/bip-0039/spanish.txt

---

### Herramientas de Testing

**Ian Coleman's BIP39 Tool**  
🔗 https://iancoleman.io/bip39/  
⚠️ Solo para testing, NUNCA usar con mnemonics reales

**Ethereum Unit Converter**  
🔗 https://eth-converter.com/

**Keccak-256 Online**  
🔗 https://emn178.github.io/online-tools/keccak_256.html

---

## 🧪 Testing y Desarrollo

### Hardhat

**Hardhat Documentation**  
🔗 https://hardhat.org/docs

**Hardhat Network**  
🔗 https://hardhat.org/hardhat-network/

**Hardhat Console**  
🔗 https://hardhat.org/hardhat-runner/docs/guides/hardhat-console

**Testing con Hardhat**  
🔗 https://hardhat.org/tutorial/testing-contracts

---

### Testnets

**Sepolia Testnet**  
🔗 https://sepolia.etherscan.io/

**Sepolia Faucet (Alchemy)**  
🔗 https://sepoliafaucet.com/

**Sepolia Faucet (Chainlink)**  
🔗 https://faucets.chain.link/sepolia

**Goerli Testnet** (deprecated pero aún usado)  
🔗 https://goerli.etherscan.io/

---

### RPC Providers

**Alchemy**  
🔗 https://www.alchemy.com/

**Infura**  
🔗 https://www.infura.io/

**QuickNode**  
🔗 https://www.quicknode.com/

**Ankr**  
🔗 https://www.ankr.com/rpc/

---

## 🎨 React y TypeScript

### React

**React Documentation (v19)**  
🔗 https://react.dev/

**React Hooks**  
🔗 https://react.dev/reference/react

**React TypeScript Cheatsheet**  
🔗 https://react-typescript-cheatsheet.netlify.app/

---

### TypeScript

**TypeScript Handbook**  
🔗 https://www.typescriptlang.org/docs/handbook/

**TypeScript Playground**  
🔗 https://www.typescriptlang.org/play

**Type Challenges** (Práctica)  
🔗 https://github.com/type-challenges/type-challenges

---

## 📖 Recursos de Aprendizaje

### Cursos y Tutoriales

**LearnWeb3 DAO**  
🔗 https://learnweb3.io/

**Alchemy University**  
🔗 https://university.alchemy.com/

**CryptoZombies** (Solidity interactivo)  
🔗 https://cryptozombies.io/

**Ethereum.org Developer Portal**  
🔗 https://ethereum.org/en/developers/

---

### Libros (Online)

**Mastering Ethereum** (Andreas Antonopoulos)  
🔗 https://github.com/ethereumbook/ethereumbook

**The Hitchhiker's Guide to Ethereum**  
🔗 https://github.com/Cyfrin/foundry-full-course-f23

---

### Comunidades

**Ethereum Stack Exchange**  
🔗 https://ethereum.stackexchange.com/

**Reddit /r/ethdev**  
🔗 https://www.reddit.com/r/ethdev/

**BuildSpace**  
🔗 https://buildspace.so/

---

## 🛠️ Herramientas de Desarrollo

### IDEs y Editores

**VS Code Extensions para Web3**  
- Solidity (Juan Blanco)  
- Hardhat (NomicFoundation)  
- Prettier Solidity  

**Remix IDE** (Online Solidity IDE)  
🔗 https://remix.ethereum.org/

---

### Debugging y Análisis

**Tenderly** (Transaction debugging)  
🔗 https://tenderly.co/

**Etherscan** (Block explorer)  
🔗 https://etherscan.io/

**Gas Tracker**  
🔗 https://etherscan.io/gastracker

**Blockchain Explorer (múltiples chains)**  
🔗 https://blockscan.com/

---

### Security

**Consensys Security Best Practices**  
🔗 https://consensys.github.io/smart-contract-best-practices/

**OpenZeppelin Contracts**  
🔗 https://docs.openzeppelin.com/contracts/

**Slither** (Security analyzer)  
🔗 https://github.com/crytic/slither

---

## 📰 Mantente Actualizado

### Blogs y Newsletters

**Week in Ethereum News**  
🔗 https://weekinethereumnews.com/

**Ethresear.ch** (Investigación Ethereum)  
🔗 https://ethresear.ch/

**Vitalik's Blog**  
🔗 https://vitalik.ca/

**EthHub**  
🔗 https://docs.ethhub.io/

---

### Podcasts

**Bankless**  
🔗 https://www.bankless.com/

**The Daily Gwei**  
🔗 https://thedailygwei.substack.com/

---

## 🎯 Recursos Específicos del Proyecto

### Este Proyecto Usa:

| Tecnología | Versión | Documentación |
|------------|---------|---------------|
| React | 19.1.1 | https://react.dev/ |
| TypeScript | 5.9.3 | https://www.typescriptlang.org/ |
| Ethers.js | 6.15.0 | https://docs.ethers.org/v6/ |
| Vite | 7.1.7 | https://vitejs.dev/ |
| Chrome Extensions | Manifest V3 | https://developer.chrome.com/docs/extensions/ |

---

## 🔍 Búsqueda Rápida

### Por Tema

**Quiero aprender sobre...**

- **Wallets HD:** BIP-39 + BIP-44 + Ethers.js HD Wallet
- **Firmas:** EIP-712 + Ethers.js Signing
- **Gas:** EIP-1559 + Etherscan Gas Tracker
- **Chrome Extensions:** Manifest V3 + Service Workers
- **Provider API:** EIP-1193 + MetaMask Docs
- **Testing:** Hardhat + Testnets + Faucets
- **Build:** Vite + TypeScript

---

## 📌 Links Favoritos Marcados

```
Desarrollo Diario:
✅ https://docs.ethers.org/v6/
✅ https://developer.chrome.com/docs/extensions/
✅ https://vitejs.dev/config/
✅ https://eips.ethereum.org/

Testing:
✅ https://hardhat.org/docs
✅ https://sepoliafaucet.com/
✅ https://sepolia.etherscan.io/

Referencia Rápida:
✅ https://eth-converter.com/
✅ https://etherscan.io/gastracker
✅ https://www.typescriptlang.org/docs/
```

---

**Última Actualización:** Octubre 2025  
**Mantenido por:** CodeCrypto Team

💡 **Tip:** Guarda este archivo como referencia y marca los links más útiles en tu navegador.

