/*
selfdestruct 
    Eliminar contrato 
    Forzar el envio de Ether a cualquier direccion 
    Eliminar un contrato de la cadena de blockchain 
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0<0.9.0;

contract Kill {
    constructor() payable {    }

    //permite eliminar el conttrato 
    function testKillContract() external{
        selfdestruct(payable (msg.sender));
    }

    //valida que el contrato antes de que lo eliminemos(que si este en la blockchain )
    //una vez eliminado no debe de funcionar 
    function testContract() external pure returns(string memory) {
        return "Estoy funcionando";
    }
}