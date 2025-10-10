/*
Las funciones pueden devolver valores de retorno al se ejecutadas.
function <nombre_funcion>(<tipo_parametros>)[public | private]
[returns (<return_valores>)]*{
    ...
    [return (<return_valores>)]*
}

NOTA: los valores retornados deben de ir en el mismo orden que los tipos retornados 
*/



// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; 

contract TestReturns {
    //funcion que devuelv un saludo 
    function saludo() public pure returns (string memory){
        return "Hola a todos";
    }

    // funcion que devuelva una multiplicacion 
    function multiplicacion(uint _a, uint _b) public pure returns (uint){
        uint resultado = _a * _b;
        return resultado;
    }

    // funcion que calcule si un numero es par o impar 
    function parImpar(uint _a) public pure returns(string memory){
        if(_a %2 == 0){
            return "Es par";
        }
        return "Es impar";
    }

    //funcion que devuelve varios valores
    function variosValores() public pure returns (uint, bool, string memory){
        return (52,true,"Hola desde varios valores retornados");
    }

    //funcion que asigna varios valores
    function todosLosValores() public pure returns(uint, bool, string memory){
        //declaramos las variables que recibiran los valores
        uint a;
        bool b;
        string memory c;

        //asignamos los valores devueltos por la funcion 
        (a,b,c) = variosValores();

        // devolver los valores 
        return (a,b,c);
    }

    //funcion que asigna un subconjunto de valores 
    function subConjuntoValores() public pure returns(uint, string memory) {
        // Declarar las variables que recibiran los valores 
        uint a;
        string memory c;
        
        // Asignamos valores
        (a, , c) = variosValores();
        return (a,c);
    }
}

