//para instalar librerias con foundry 
// 1er forma 
// forge install nombre_libreria ejemplo forge install rari-capital/solmate

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

//saber que librerias hemos instalado 
// forge remappings
import "solmate/tokens/ERC20.sol";
contract Token is ERC20("CoinTest", "CTE", 18){
    
}