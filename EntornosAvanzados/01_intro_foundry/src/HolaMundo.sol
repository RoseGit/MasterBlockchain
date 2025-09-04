// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

//para solo ejecutar las pruebas de un archivo en especifico 
//  forge test --match-path test/HolaMundo.t.sol -vvv

contract HolaMundo{
    string private mensaje;

    constructor(){
        mensaje = "Hola mundo desde foundry";
    }

    function obtenerMensaje() public view returns (string memory){
        return mensaje;
    }

    function actualizarMensaje(string memory _nuevoMensaje) public {
        mensaje = _nuevoMensaje;
    }    
}