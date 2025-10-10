/*
3 formas de enviar ETH

transfer -> 2300 gas, si la tranferencia falla, revierte
send -> 2300 gas, devuelve bool si la transferencia es exitosa o no 
call -> Todo el gas, devuelve bool(con resulado de la transaccion) y datos 
*/
// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0 <0.9.0;

contract TestSendEther{
    constructor() payable {        
    }

    receive() external payable { }

    function testTransfer(address payable _to) external payable{
        _to.transfer(123);
    }

    function testSend(address payable _to) external payable{
        bool send = _to.send(123);
        require(send, "Send fallo");
    }

    function testCall(address payable _to) external payable{
        (bool success,) = _to.call{value:123}("");
        require(success, "la llamada fallo");
    }
}

contract RecibirEther{
    event Log(uint amount, uint gas);

    receive() external payable { 
        //gasleft() nos devuelve el gas disponible 
        emit Log(msg.value, gasleft());
    }
}