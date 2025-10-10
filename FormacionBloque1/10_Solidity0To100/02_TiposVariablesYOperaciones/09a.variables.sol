/*
Existen dos tipos de variables enteras en solidity con y sin signo (int / uint)
uint<x> <nombre_variable;
int<x> <nombre_variable>;

<x> varia de 8 a 256 en incrementos de 8 por ejemplo uint8, uint16, uint24....
si no espeificamos el numero de bits por defecto es uint256
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Enteros {
    // Variables enteras sin especificar un numero de bits
    uint uintVariable;
    int intVariable;

    //variables enteras sin signo
    uint8 uint8Variable;
    uint16 uint16Variable = 122;
    uint32 uint32Variable;

    //Variables enteras con signo 
    int8 int8Variable;
    int16 int16Variable = -122;
    int32 int32Variable;

    // Funcion para obtener el tipo y los bits
    function obtenerTipoYbits(uint _numero) public pure returns(string memory, uint ){
        if(_numero <= type(uint8).max){
            return ("uint8", 8);
        } else if(_numero <= type(uint16).max){
            return ("uint16", 16);
        }else if(_numero <= type(uint32).max){
            return ("uint32", 32);
        }else if(_numero <= type(uint64).max){
            return ("uint64", 64);
        }else if(_numero <= type(uint128).max){
            return ("uint128", 128);
        }else if(_numero <= type(uint256).max){
            return ("uint256", 256);
        }else{
            revert("Numero demasiado grande para representarlo por solidity");
        }
    }
}