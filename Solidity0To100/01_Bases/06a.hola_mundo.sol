// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract HolaMundo {
    // Variable de estado (se almacena en la Blockchain)
    string private mensaje;

    // constructor: se ejecuta una vez al desplegar el contrato
    constructor() {
        mensaje = "Hola mundo";
    }
    
    // Funcion para obtener el mensaje actual
    function getMensaje() public view returns(string memory) {
        return mensaje;
    }

    //funcion paara actualizar mensaje
    function updateMensaje(string memory nuevo_mensaje) public {
        mensaje = nuevo_mensaje;
    }
}