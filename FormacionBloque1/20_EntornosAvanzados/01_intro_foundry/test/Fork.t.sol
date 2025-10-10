// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";

interface IWETH{
    function balanceOf(address ) external view returns(uint256);
    function deposit() external payable;
}

// forge test --fork-url [URL-ALCHEMY] --match-path test/Fork.t.sol -vvv
contract ForkTest is Test{
    IWETH public weth;
    function setUp() public{
        /*
        Si solo quieres hacer pruebas, no necesitas la dirección del contrato de WETH en la red principal de Ethereum. 
        Puedes usar la dirección de un contrato de WETH de una red de prueba (testnet) o, 
        mejor aún, usar la librería de prueba Foundry para simular la existencia del contrato. Esto te permite probar tu contrato sin usar ETH real.

        Opción 2: Usar Foundry (Forking)
        Si estás usando la librería de pruebas Foundry, 
        puedes simular la red principal de Ethereum localmente, lo que se conoce como "forking". 
        Esta es la mejor opción para la mayoría de los desarrolladores.

        Configura un nodo local: Usa una herramienta como Anvil (que viene con Foundry) para simular la blockchain.

        Indica la dirección del fork: 
        En tu código de prueba, puedes usar la dirección de WETH de la red principal de Ethereum (0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) 
        porque el fork actúa como si estuvieras en la red principal.

        No necesitas tokens de prueba reales. Foundry simulará todas las transacciones, incluyendo las de los contratos que uses.

        Este enfoque es más rápido y confiable, ya que no dependes de la disponibilidad de la red de prueba o de los faucets.

        REVISAR SITIO DE ALCHEMY para generar un nodo free en la block chain, ver video para mas informacion
        ej. 
        https://eth-mainnet.g.alchemy.com/v2/xxaGxUSUYSvm6zgTkKw6gKkydvutjWWn
        forge test --fork-url https://eth-mainnet.g.alchemy.com/v2/xxaGxUSUYSvm6zgTkKw6gKkydvutjWWn --match-path test/Fork.t.sol -vvv
        */
        weth = IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    }

    function testDeposit() public {
        uint256 balanceInicial = weth.balanceOf(address(this) );
        console.log("Balance Inicial", balanceInicial);

        weth.deposit{value: 500}();
        uint256 balanceFinal = weth.balanceOf(address(this) );
        console.log("Balance final", balanceFinal);

    }

    
}