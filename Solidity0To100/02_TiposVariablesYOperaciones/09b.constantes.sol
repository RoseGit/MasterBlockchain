/*
Al declarar una variable de estado constante, podemos ahorrar gas cuando se llame a una funcion que utilice esa variable de estado.

<tipo_dato> constant <nombre_variable>;
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestConstantes1 {
    //variable de estado
    uint256 constant public MAX_NUM = 100;


    function esMayor(uint256 _num) public pure returns (bool) {
        return _num > MAX_NUM;
    }
}


contract TestConstantes2 {
    //variable de estado
    uint256 constant public MAX_NUM = 100;


    function esMayor(uint256 _num) public pure returns (bool) {
        return _num > MAX_NUM;
    }
}
