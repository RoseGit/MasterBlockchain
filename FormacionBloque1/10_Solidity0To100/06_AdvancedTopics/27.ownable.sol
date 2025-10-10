/*
OWNABLE PROPERTY

- Variables de estado
- variables globales
- Funciones
- funcion modifier
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestOwnable {
    address public propietario;

    constructor() {
        propietario = msg.sender;
    }

    //nos permite validar si el usuario que estamos llamando es igual al seteado en el constructor
    modifier soloPropietario(){
        require(msg.sender == propietario, "No eres el propietario");
        _;
    }

    //funcion que nos permite setear un nuevo propietario
    function setPropietario(address _newOwner) external soloPropietario{
        require(_newOwner != address(0), "Direccion onvalida");
        propietario = _newOwner;
    }

    function soloPropietarioPuedeLlamar() view external soloPropietario returns(string memory){
        return "funcion ejecutada por el propietario del contrato";
    }

    function cualquieraPuedeLlamar() pure external returns (string memory){
        return "Funcion ejecutada por cualquier usuario";
    }
}