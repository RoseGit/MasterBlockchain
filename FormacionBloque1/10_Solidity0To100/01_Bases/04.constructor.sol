/*
Un constructor es una funcion OPCIONAL donde se definen las propiedades del contrato que deben ser inicializadas.
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestConstructor {

    //creacion de variable 
    address propietario;

    //Inicializa nuestra variable propietario
    constructor() {
        //usando una variable global (direccion de la persona que hace el deploy del contrato)
        propietario = msg.sender;
    }

    //creacion de funciones 
    function getPropietario() public view returns (address){
        return propietario;
    }
}