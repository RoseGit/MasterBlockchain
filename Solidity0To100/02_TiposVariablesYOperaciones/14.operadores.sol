/*
matematicos
+
-
*
/
%
** Exponente

comparacion 
>
<
>=
<=
==
!=

logicos
! 
&& 
||
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Operadores {
    // Operadores matematicos
    uint256 public suma = 2 + 4;
    uint256 public resta = 4 - 3;
    uint256 public multiplicacion = 2 * 2;
    uint256 public division = 10 / 2;
    uint256 public modulo = 5 % 2;

    // Operadores comparacion
    bool public igualdad = 2 == 2;
    bool public distinto = 2 != 2;
    bool public mayorque = 2 > 2;
    bool public menorque = 2 < 3;

    bool public mayorOIgualQue = 2 >= 2;
    bool public menorOIgualQue = 2 <= 3;

    // Operadors logicos
    bool public and = true && true;
    bool public or = false || true;    
}
