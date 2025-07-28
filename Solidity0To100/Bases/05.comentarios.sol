/*
Los comentarios son una parte importante de cualquier contrato inteligente y proporcionan infomración sobre el contrato.
los comentarios no afectan el comportamiento del contrato y son ignorados durante la compilación.
*/

//En solidit existen los comentarios de una sola linea 

/*
Comentario de varias lineas 
o 
bloque de comentario
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Primos {
    //funcion publica que valida si un numero es primo
    function esPrimo(uint n) public pure returns(bool){
        require(n>1, 'El numero debe ser mayor que 1');

        // Si el numero es igual a 2, es primo
        if(n == 2){
            return true;
        }

        /*
            inicializa el divisor desde 3 
            hasta la raiz cuadrada de n con 
            incrementos de 2
        */
        for(uint i=3; i * i <= n; i += 2){
            if(n % i == 0){
                return false;
            }
        }

        //si no se encuentra ningun divisor, el numero es primo 
        return true;
    }
}