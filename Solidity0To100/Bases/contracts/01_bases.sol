// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

contract MiPrimerContrato{

    address propietario;
    constructor(){
        //Obtiene el que hace el deploy con la variable global msg
        propietario = msg.sender;
    }

    function getPropietario() public view returns (address){
        return propietario;
    }

    
}
