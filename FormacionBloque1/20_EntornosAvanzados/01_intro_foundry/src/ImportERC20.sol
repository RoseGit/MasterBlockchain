//para instalar librerias con foundry 
// 1er forma 
// forge install nombre_libreria ejemplo forge install rari-capital/solmate

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

//saber que librerias hemos instalado 
// forge remappings

//actualizar una libreria 
// forge update lib/solmate

//eliminar una libreria 
// forge remove solmate
/*
import "solmate/tokens/ERC20.sol";
contract Token is ERC20("CoinTest", "CTE", 18){
    
}*/


import "@openzeppelin/contracts/access/Ownable.sol";
contract TestOwnable is Ownable{
    constructor() Ownable(msg.sender){

    }
}