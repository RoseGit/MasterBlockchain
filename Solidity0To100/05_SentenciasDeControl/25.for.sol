/*
el bucle for ejecuta un bloque de codigo un numero determinado de veces 

for(<inicializador>;<condicion>;<incremento/decremento>){
    //codigo a utilizar en cada iteracion
}
*/
// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0 <0.9.0;

contract TestFor {
    //funcion 1 
    function suma100(uint _numero) public pure returns(uint) {
        uint suma = 0;
        for (uint i = _numero; i < (_numero +100); i++) 
        {
            suma += i;
        }
        return suma;
    }

    address[] private direcciones;

    function asociar() public{
        direcciones.push(msg.sender);
    }

    function comprobarAsociacion() public view returns(bool estado, address direccion){
        for (uint i = 0;i < direcciones.length; i++) 
        {
            if(msg.sender == direcciones[i]){
                return (true, direcciones[i]);
            }
        }

        return (false, address(0));
    }

    
}