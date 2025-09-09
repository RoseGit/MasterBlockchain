// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Billetera{
    address payable public owner;

    constructor() payable{
        owner = payable(msg.sender);
    }

    receive() external payable{}

    function retirar(uint cantidad) external{
        require(msg.sender == owner, "No eres el owner");
        payable(msg.sender).transfer(cantidad);
    }

    function convertirEnDuenio(address _owner) external {
        require(msg.sender == owner, "No eres el owner");
        owner = payable(_owner);
    }
    

}