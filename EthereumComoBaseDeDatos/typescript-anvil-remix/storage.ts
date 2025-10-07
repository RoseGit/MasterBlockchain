/*
Para ejecutar este ejemplo con nodejs 
  npx ts-node storage.ts
*/

import { ethers } from "ethers";

// 📌 Configuración: Direcciones y ABI del contrato
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const DEPLOYER_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const DEPLOYER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const RPC_URL = "http://localhost:8545";

// 📌 ABI del contrato (generado desde Remix)
const STORAGE_ABI = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 📌 Función principal
async function main() {
  // 1. Conectar al proveedor (Anvil)
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // 2. Crear un signer con la clave privada del deployer
  const signer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);
  console.log(`Conectado con la cuenta: ${signer.address}`);

  // 3. Crear una instancia del contrato
  const storageContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    STORAGE_ABI,
    signer
  );

  // 4. Leer el valor actual de `number`
  const currentValue = await storageContract.retrieve();
  console.log(`Valor actual en el contrato: ${currentValue.toString()}`);

  // 5. Almacenar un nuevo valor (ej: 123)
  const newValue = 123;
  console.log(`Almacenando nuevo valor: ${newValue}...`);
  const tx = await storageContract.store(newValue);
  await tx.wait(); // Esperar a que la transacción se mine
  console.log(`Transacción confirmada en el bloque: ${tx.blockNumber}`);

  // 6. Verificar el nuevo valor
  const updatedValue = await storageContract.retrieve();
  console.log(`Nuevo valor en el contrato: ${updatedValue.toString()}`);
}

// 📌 Ejecutar y manejar errores
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});