/*
Las bibliotecas o library nos permiten separar y reutilizar nuestro codigo 
mejorar los tipos de datos en los contratos inteligentes
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0<0.9.0;

//creamos una libreria
library Math{
    function max(uint _x, uint _y) internal pure returns(uint){
        return _x >= _y ? _x : _y;
    }
}

contract Test {
    function testMax(uint _x, uint _y) external pure returns(uint){
        return Math.max(_x, _y);
    }
}

//funcion que permita buscar la posicion de un numero que le pasemos
library ArrayLib{
    function find(uint[] storage arr, uint _number) internal view returns(uint){
        for (uint i = 0; i < arr.length; i++) 
        {
            if(arr[i] == _number){
                return i;
            }
        }

        revert("Not found");
    }
}

contract TestArray {
    uint [] public arr = [3,2,1];

    function testFind() external view returns(uint i){
        return ArrayLib.find(arr, 3);
    }
}